import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import Preview from '../preview/Preview'
import { createExcel, excelDownload, uploadimages, uploadExcel, createCert, mintCertificate } from '../../services/ApiService'
import { useState } from 'react';
import fileSaver from 'file-saver';
import "./Certificates.css";
import Swal from "sweetalert2";
import Button from "@material-ui/core/Button";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function TabPanel(props) {
    const { children, value, index, ...other } = props;
    // const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function CertificateTemplate() {



    const [Name_of_the_university, setNameoftheuniversity] = useState("");
    const [City, setCity] = useState("");
    const [PIN_Code, setPINCode] = useState("");
    const [College_Code, setCollegeCode] = useState("");
    const [Issue_Date, setIssueDate] = useState("");
    const [State, setState] = useState("");
    const [Country, setCountry] = useState("");

    const [DirectorofEvalution, setDirectorofEvalution] = useState("");
    const [Registrar, setRegistrar] = useState("");
    const [ControllerofExamination, setControllerofExamination] = useState("");
    const [UniversityLogo, setUniversityLogo] = useState("");
    const [PreviewCertifivateData, setPreviewCertifivateData] = useState("")


    const [value, setValue] = React.useState(0);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: 250,
        height: 55,
    }));
    const handleChange = (event, newValue) => {
        console.log("value:::TAB", newValue)
        setValue(newValue);
    };

    const [checkedValue, setCheckedValue] = useState([]);
    var checkedValue_array = [];
    var finalCheckedData;
    const [MintcertificatedData, setMintcertificatedData] = useState([]);


    const handleCheck = (event) => {
        console.log("event", event.target.checked)
        if (event.target.checked) {
            checkedValue_array.push(event.target.value);
        } else {
            checkedValue_array.splice(checkedValue.indexOf(event.target.value), 1);
        }
        // setCheckedValue(checkedValue_array);
        // let obj = checkedValue_array.reduce((ac,a) => ({...ac,[a]:''}),{});
        let obj = Object.assign({}, ...checkedValue_array.map(key => ({ [key]: "" })));
        finalCheckedData = [obj];
        console.log("setVlue", finalCheckedData)
    }

    const creatExcel = () => {
        createExcel(finalCheckedData).then(response => {
            console.log(response)
            if (response.status['code'] === 'SUCCESS') {
                let excelName = response.data['name'];
                excelDownload(excelName).then(resp => {
                    var blob = new Blob([resp], { type: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
                    fileSaver.saveAs(blob, excelName);
                    console.log("excelDownload", resp)
                });
            }
        });
    }

    const onChangeFile = (e, imgtype) => {
        e.preventDefault()
        console.log("imgtype", e, imgtype);
        uploadimages(e.target.files[0]).then(resp => {
            console.log("111", resp);
            if (resp.status['code'] === 'SUCCESS') {
                if (imgtype == 'Director of Evalution') {
                    setDirectorofEvalution(resp['data'][0].newFileName);
                    console.log("setDirectorofEvalution", DirectorofEvalution)
                }
                else if (imgtype == 'Controller of Examination') {
                    setControllerofExamination(resp['data'][0].newFileName)
                }
                else if (imgtype == 'Registrar') {
                    setRegistrar(resp['data'].newFileName)
                }
                else if (imgtype == 'Logo') {
                    setUniversityLogo(resp['data'][0].newFileName)
                }
            }
        })
    }

    const uplodExcel = (e) => {
        e.preventDefault();
        uploadExcel(e.target.files[0]).then(resp => {
            console.log("111", resp);
            if (resp.status['code'] === 'SUCCESS') {
                let finalData = resp['data'].map(e => {
                    console.log("2222",resp['data'])
                    let data_obj = {
                        "universityName": Name_of_the_university,
                        "city": City,
                        "pincode": PIN_Code,
                        "collegeCode": College_Code,
                        "issueDate": Issue_Date,
                        "state": State,
                        "country": Country,
                        "studentFirstName": e['first name of the student'],
                        "studentSecondName": e['second name of the student'],
                        "gender": e['gender'],
                        "parentsName": e['father/mother’s name'],
                        "major": e['major'],
                        "studentEmail": e['studentemail'],
                        "degree": e['degree'],
                        "placedIn": e['placed in'],
                        "minor": e['minor'],
                        "examDate": e['examination held in date'],
                        "president": e['president'],
                        "secretary": e["secretary"],
                        "dean": e["dean"],
                        "universityLogo": UniversityLogo,
                        "doeSignature": DirectorofEvalution,
                        "registrarSignature": Registrar,
                        "coeSignature": ControllerofExamination,
                    }
                    console.log("data_obj", data_obj)
                    return data_obj;
                });
                if (finalData.length !== 0) {
                    createCertAPICall(finalData);
                }
            }
        })
    }

    const createCertAPICall = (finalData) => {
        createCert(finalData).then(resp => {
            if (resp.status['code'] === 'SUCCESS') {
                showAlert(resp.data);
            }
        })
    }

    const mintCertificates = () => {
        console.log("MintcertificatedData", MintcertificatedData);
        mintCertificate(MintcertificatedData).then(resp => {
            if (resp.status['code'] === 'SUCCESS') {
                showAlertcommon(resp.data);
            }
        })
    }


    const showAlertcommon = () => {
        Swal.fire({
            title: "Success",
            text: "Data Upload Successful",
            icon: "success",
            confirmButtonText: "OK",
        }).then((result) => {
            if (result.isConfirmed) {
                setValue(0);
            }
        });
    }


    const showAlert = (resp) => {
        Swal.fire({
            title: "Success",
            text: "Alert successful",
            icon: "success",
            confirmButtonText: "OK",
        }).then((result) => {
            if (result.isConfirmed) {
                setValue(1);
                setPreviewCertifivateData(resp);
                setMintcertificatedData(resp)
            }
        });
    }


    return (
        <main>
            <div className="main__container">
                <div className="main__title">
                    <h1>New Certificate Template</h1>
                </div>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} className="tabsStyle" TabIndicatorProps={{
                            style: {
                                backgroundColor: "#007AFF",
                            }
                        }} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Design" {...a11yProps(0)} />
                            <Tab label="Preview" {...a11yProps(1)} />
                            <Tab label="Received" {...a11yProps(2)} disabled />
                        </Tabs>
                    </Box>

                    {value === 0 ?
                        <div>
                            <a onClick={creatExcel} className="custom_file_upload">
                                Creat Excel
                             </a>
                            <label for="inputUpload" className="custom_file_upload"> Upload Excel</label>
                            <input id="inputUpload" type="file" style={{ display: 'none' }} onChange={uplodExcel} />
                        </div>

                        :

                        <div>
                            <a onClick={mintCertificates} className="custom_file_upload">
                                Mint All Certificated
                             </a>
                        </div>

                    }



                    <div className="main__cards">
                        <TabPanel value={value} index={0}>
                            <div className="templateContainer">
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div className="firstrow">
                                        <Grid container spacing={4}>
                                            <Grid item xs={3}>
                                                <TextField id="standard-name" fullWidth label="Name of the university/college" variant="standard"
                                                    value={Name_of_the_university}
                                                    onChange={(e) => setNameoftheuniversity(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <TextField id="standard-name" label="City" variant="standard"
                                                    value={City}
                                                    onChange={(e) => setCity(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <TextField id="standard-name" label="PIN/Zip Code" variant="standard"
                                                    value={PIN_Code}
                                                    onChange={(e) => setPINCode(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <TextField id="standard-name" label="College Code" variant="standard"
                                                    value={College_Code}
                                                    onChange={(e) => setCollegeCode(e.target.value)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className="secondrow" style={{ paddingTop: 20 }}>
                                        <Grid container spacing={4}>

                                            <Grid item xs={3}>
                                                <TextField id="standard-name" label="Issue Date" variant="standard"
                                                    value={Issue_Date}
                                                    onChange={(e) => setIssueDate(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <TextField id="standard-name" label="State" variant="standard"
                                                    value={State}
                                                    onChange={(e) => setState(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <TextField id="standard-name" label="Country" variant="standard"
                                                    value={Country}
                                                    onChange={(e) => setCountry(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={3} style={{ marginTop: "19px" }}>
                                                <Button variant="contained" component="label" color="primary"
                                                    onChange={e => onChangeFile(e, 'Logo')}>
                                                    Upload Logo
                                                    <input type="file" hidden />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div style={{ paddingTop: 18, fontSize: 12, color: '#828282' }}>
                                        <p>
                                            Select dynamic fields required for your certificate
                                        </p>
                                    </div>
                                    <div>
                                        <Grid container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            <Grid item>
                                                <Item>

                                                    <div style={{ padding: 7 }}>
                                                        <Checkbox
                                                            // icon={<CircleUnchecked />}
                                                            // checkedIcon={<CircleChecked />}
                                                            sx={{
                                                                "& .MuiSvgIcon-root": {
                                                                    fontSize: 70,
                                                                    borderRadius: 20
                                                                },
                                                                '&.Mui-checked': {
                                                                    color: green[600],
                                                                },
                                                            }}

                                                            {...label}
                                                            value={' First Name of the student'} onChange={handleCheck} />
                                                        First Name of the student
                                                    </div>
                                                </Item>
                                            </Grid>
                                            <Grid item>
                                                <Item>
                                                    <div style={{ padding: 7 }}>
                                                        <Checkbox {...label} sx={{
                                                            color: green[800],
                                                            '&.Mui-checked': {
                                                                color: green[600],
                                                            },
                                                        }}
                                                            value={'Second Name of the Student'} onChange={handleCheck} />
                                                        Second Name of the Student
                                                    </div>
                                                </Item>
                                            </Grid>
                                            <Grid item>
                                                <Item>
                                                    <div style={{ padding: 7 }}>
                                                        <Checkbox {...label} sx={{
                                                            color: green[800],
                                                            '&.Mui-checked': {
                                                                color: green[600],
                                                            },
                                                        }}
                                                            value={'Gender'} onChange={handleCheck} />
                                                        Gender
                                                    </div>
                                                </Item>
                                            </Grid>

                                        </Grid>
                                        <Grid container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            <Grid item>
                                                <Item>
                                                    <div style={{ padding: 7 }}>
                                                        <Checkbox {...label} sx={{
                                                            color: green[800],
                                                            '&.Mui-checked': {
                                                                color: green[600],
                                                            },
                                                        }}
                                                            value={'Father/Mother’s Name'} onChange={handleCheck}
                                                        />
                                                       Father/Mother’s Name
                                                    </div>
                                                </Item>
                                            </Grid>
                                            {/* <Grid item>
                                                <Item>
                                                    <div style={{ padding: 7 }}>
                                                        <Checkbox {...label} sx={{
                                                            color: green[800],
                                                            '&.Mui-checked': {
                                                                color: green[600],
                                                            },
                                                        }}
                                                            value={'Major'} onChange={handleCheck}
                                                        />
                                                        Major
                                                    </div>
                                                </Item>
                                            </Grid> */}
                                            <Grid item>
                                                <Item>
                                                    <div style={{ padding: 7 }}>
                                                        <Checkbox {...label} sx={{
                                                            color: green[800],
                                                            '&.Mui-checked': {
                                                                color: green[600],
                                                            },
                                                        }}
                                                            value={'studentEmail'} onChange={handleCheck}
                                                        />
                                                        Student Email
                                                    </div>
                                                </Item>
                                            </Grid>
                                            <Grid item>
                                                <Item>
                                                    <div style={{ padding: 7 }}>
                                                        <Checkbox {...label} sx={{
                                                            color: green[800],
                                                            '&.Mui-checked': {
                                                                color: green[600],
                                                            },
                                                        }}
                                                            value={'Degree'} onChange={handleCheck}
                                                        />
                                                        Degree
                                                    </div>
                                                </Item>
                                            </Grid>

                                        </Grid>
                                        <Grid container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            <Grid item>
                                                <Item>
                                                    <div style={{ padding: 7 }}>
                                                        <Checkbox {...label} sx={{
                                                            color: green[800],
                                                            '&.Mui-checked': {
                                                                color: green[600],
                                                            },
                                                        }}
                                                            value={'Placed in'} onChange={handleCheck}
                                                        />
                                                        Placed in
                                                    </div>
                                                </Item>
                                            </Grid>
                                            <Grid item>
                                                <Item>
                                                    <div style={{ padding: 7 }}>
                                                        <Checkbox {...label} sx={{
                                                            color: green[800],
                                                            '&.Mui-checked': {
                                                                color: green[600],
                                                            },
                                                        }}
                                                            value={'Minor'} onChange={handleCheck}
                                                        />
                                                        Minor
                                                    </div>
                                                </Item>
                                            </Grid>
                                            <Grid item>
                                                <Item>
                                                    <div style={{ padding: 7 }}>
                                                        <Checkbox {...label} sx={{
                                                            color: green[800],
                                                            '&.Mui-checked': {
                                                                color: green[600],
                                                            },
                                                        }}
                                                            value={'Examination held in Date'} onChange={handleCheck}
                                                        />
                                                        Examination held in Date
                                                    </div>
                                                </Item>
                                            </Grid>

                                        </Grid>
                                        <Grid container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            <Grid item >
                                                <Item style={{ height: 85 }}>
                                                    <div style={{ padding: 7 }}>
                                                        <Checkbox {...label} defaultChecked sx={{
                                                            color: green[800],
                                                            '&.Mui-checked': {
                                                                color: green[600],
                                                            },
                                                        }} />
                                                        Director of Evalution
                                                        <hr style={{
                                                            width: 150,
                                                            marginLeft: 79
                                                        }}></hr>
                                                        <input type="file" id="file" style={{ display: "none" }}
                                                            onChange={e => onChangeFile(e, 'Director of Evalution')}
                                                        />
                                                        <label htmlFor="file" >
                                                            <i for="file" className="fa-solid fa-arrow-up-from-bracket"></i>
                                                            <span for="file" style={{ fontSize: 10, marginLeft: 6 }}>Click to upload signature</span>
                                                        </label>
                                                    </div>
                                                </Item>
                                            </Grid>
                                            <Grid item>
                                                <Item style={{ height: 85 }}>
                                                    <div style={{ padding: 7 }}>
                                                        <Checkbox {...label} defaultChecked sx={{
                                                            color: green[800],
                                                            '&.Mui-checked': {
                                                                color: green[600],
                                                            },
                                                        }} />
                                                        Registrar
                                                        <hr style={{
                                                            width: 150,
                                                            marginLeft: 79
                                                        }}></hr>
                                                        <input type="file" id="file" style={{ display: "none" }}
                                                            onChange={e => onChangeFile(e, 'Registrar')}
                                                        />
                                                        <label htmlFor="file" >
                                                            <i for="file" className="fa-solid fa-arrow-up-from-bracket"></i>
                                                            <span for="file" style={{ fontSize: 10, marginLeft: 6 }}>Click to upload signature</span>
                                                        </label>

                                                    </div>
                                                </Item>
                                            </Grid>
                                            <Grid item>
                                                <Item style={{ height: 85 }}>
                                                    <div style={{ padding: 7 }}>
                                                        <Checkbox {...label} defaultChecked sx={{
                                                            color: green[800],
                                                            '&.Mui-checked': {
                                                                color: green[600],
                                                            },
                                                        }} />
                                                       Controller of Examination
                                                        <hr style={{
                                                            width: 150,
                                                            marginLeft: 79
                                                        }}></hr>
                                                        <input type="file" id="file" style={{ display: "none" }}
                                                            onChange={e => onChangeFile(e, 'Controller of Examination')}
                                                        />
                                                        <label htmlFor="file" >
                                                            <i for="file" className="fa-solid fa-arrow-up-from-bracket"></i>
                                                            <span for="file" style={{ fontSize: 10, marginLeft: 6 }}>Click to upload signature</span>
                                                        </label>
                                                    </div>
                                                </Item>
                                            </Grid>

                                        </Grid>
                                        <Grid container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            <Grid item>
                                                <Item>
                                                    <div style={{ padding: 7 }}>
                                                        <Checkbox {...label} sx={{
                                                            color: green[800],
                                                            '&.Mui-checked': {
                                                                color: green[600],
                                                            },
                                                        }}
                                                            value={'President'} onChange={handleCheck}
                                                        />
                                                        President
                                                    </div>
                                                </Item>
                                            </Grid>
                                            <Grid item>
                                                <Item>
                                                    <div style={{ padding: 7 }}>
                                                        <Checkbox {...label} sx={{
                                                            color: green[800],
                                                            '&.Mui-checked': {
                                                                color: green[600],
                                                            },
                                                        }}
                                                            value={'Secretary'} onChange={handleCheck}
                                                        />
                                                        Secretary
                                                    </div>
                                                </Item>
                                            </Grid>
                                            <Grid item>
                                                <Item>
                                                    <div style={{ padding: 7 }}>
                                                        <Checkbox {...label} sx={{
                                                            color: green[800],
                                                            '&.Mui-checked': {
                                                                color: green[600],
                                                            },
                                                        }}
                                                            value={'Dean'} onChange={handleCheck}
                                                        />
                                                        Dean
                                                    </div>
                                                </Item>
                                            </Grid>

                                        </Grid>
                                    </div>
                                </Box>
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Preview data={PreviewCertifivateData} />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Item Three
                    </TabPanel>
                    </div>
                </Box>
            </div>
        </main >
    );
}

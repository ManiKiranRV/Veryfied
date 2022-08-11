import React from 'react';
import { useState, useEffect } from 'react';
import { getCerts, getCertCollegeDetails, getCertUniversityDetails } from '../../services/ApiService'
import './Grid.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles({
    root: {
        marginTop: '-3% !important',
        width: "auto !important",
        height: "auto !important",
        textAlign: "center !important",
        padding: '20px 35px !important'
    },
    container: {
        maxHeight: 440,
        marginTop: '2%'
    },
    heading: {
        textAlign: "left",
        fontWeight: "500",
        fontSize: "25px",
        lineHeight: "42px"
    }
});

const Grid = () => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [data, setData] = useState([]);
    const [state, setState] = useState('University');
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);

    const [collegeName, setCollegeName] = React.useState("");
    const [name1, setName1] = React.useState("")
    let universityNameSelected;
    let affiliatedCollegeName;
    useEffect(() => {

        GetData();
        console.log(data);
    }, []);

    const GetData = () => {
        getCerts().then(response => {
            console.log(response)
            setData(response.data);
        })
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const setSelectedRowCollege = (rowClicked) => {
        setState('StudentList')
        let filter = {};
        setName1(rowClicked.affiliatedCollege);
        affiliatedCollegeName = rowClicked.affiliatedCollege;
        filter = { 'affiliatedCollege': rowClicked.affiliatedCollege, 'universityName': universityNameSelected }
        const GetStudentData = () => {
            getCertCollegeDetails(filter).then(response => {
                let dataArrayStudent = [];
                response.data.map(e => {
                    if (e.certificateLink !== null) {
                        dataArrayStudent.push(e)
                    }
                });
                setData2(dataArrayStudent);

            });
        };
        GetStudentData();
    }

    const backToUniversityList = () => {
        setState('University');
        setData([]);
        setData1([]);
        setData2([]);
        getCerts().then(response => {
            console.log(response)
            setData(response.data);
        })
    }

    const backToCollegeList = () => {
        setState('CollegeList');
        setData([]);
        setData2([]);
        setData1([]);
        universityNameSelected = collegeName
        let filter = {};
        let dataArray = [];
        filter['universityName'] = universityNameSelected
        getCertUniversityDetails(filter).then(response => {

            response.data.map(e => {
                if (e.affiliatedCollege !== null) {
                    dataArray.push(e)
                }
            });
            setData1(dataArray);
        });
    }

    const setSelectedRow = (rowClicked) => {
        setState('CollegeList')
        universityNameSelected = rowClicked.universityName;
        setCollegeName(rowClicked.universityName)
        GetCollegeData();
    }

    const GetCollegeData = () => {
        let filter = {};
        let dataArray = [];
        filter['universityName'] = universityNameSelected
        getCertUniversityDetails(filter).then(response => {

            response.data.map(e => {
                if (e.affiliatedCollege !== null) {
                    dataArray.push(e)
                }
            });
            setData1(dataArray);
        });
    };



    return (
        <div>
            {
                state === 'University' ?
                    (
                        < Paper className={classes.root} >
                            <h1 className={classes.heading}>
                                University List
                            </h1>
                            < TableContainer className={classes.container} >
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>University Name</TableCell>
                                            <TableCell>Total Affiliations</TableCell>
                                            <TableCell>Total Minted</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                            return (
                                                <TableRow onClick={() => setSelectedRow(row)}
                                                    key={row.universityName} style={{ cursor: "pointer" }}>
                                                    <TableCell align="">{row.universityName}</TableCell>
                                                    <TableCell align="">{row.totalAffiliations}</TableCell>
                                                    <TableCell align="">{row.totalMinted}</TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer >
                            < TablePagination
                                rowsPerPageOptions={[5, 10, 15]}
                                component="div"
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </Paper >)
                    : state === 'CollegeList' ?
                        (
                            < Paper className={classes.root} >
                                <h1 className={classes.heading}>
                                    Affiliates of <span style={{ fontSize: "20px" }}> - {collegeName} </span>
                                    <i className="fa fa-arrow-left" onClick={() => backToUniversityList()}> Back </i>
                                </h1>

                                < TableContainer className={classes.container} >
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>College Name</TableCell>
                                                <TableCell>Certificates Minted</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data1.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                                return (
                                                    <TableRow onClick={() => setSelectedRowCollege(row)}
                                                        style={{ cursor: "pointer" }}
                                                        key={row.affiliatedCollege}>
                                                        <TableCell align="">{row.affiliatedCollege}</TableCell>
                                                        <TableCell align="">{row.certificatesMinted}</TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer >
                                < TablePagination
                                    rowsPerPageOptions={[5, 10, 15]}
                                    component="div"
                                    count={data1.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </Paper >
                        )
                        :
                        (
                            < Paper className={classes.root} >
                                <h1 className={classes.heading}>
                                    Students of <span style={{ fontSize: "20px" }}> - {name1}</span>
                                    <i className="fa fa-arrow-left" onClick={() => backToCollegeList()}> Back </i>
                                </h1>

                                < TableContainer className={classes.container} >
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Student Name</TableCell>
                                                <TableCell>View Certificates</TableCell>
                                                <TableCell>Transaction Hash</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data2.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                                return (
                                                    <TableRow>
                                                        <TableCell align="">{row.studentName}</TableCell>
                                                        <TableCell align="" style={{ color: "#007aff", cursor: "pointer" }}
                                                            onClick={() =>
                                                                window.open(row.certificateLink)
                                                            } > {row.certificateLink}</TableCell>
                                                        <TableCell align="">{row.blockChainHash}</TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer >
                                < TablePagination
                                    rowsPerPageOptions={[5, 10, 15]}
                                    component="div"
                                    count={data2.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </Paper >
                        )
            }
        </div >

    );
}



export default Grid;
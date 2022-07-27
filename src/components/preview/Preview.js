import { Grid } from '@material-ui/core';
import { React } from 'react';
import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import './Preview.css';
import jntuLogo from "../../assets/jntu.jpeg"

const Preview = (props) => {
    const [users, setUsers] = useState([]);
    let propsData = props.data;

    useEffect(() => {
        fetchData()
    })
    const fetchData = () => {
        console.log("props.data", propsData);
        setUsers(propsData[0]);
        console.log("2222", users);
    }

    return (
        // {users.length > 0 && ()}
        <Box className="BOX__contianer">
            <div class="certificate-container">
                <div class="certificate">
                    <div class="water-mark-overlay"></div>
                    <div class="certificate-body">
                        <div class="certificate-heading">
                            <h1 class="certificate-title">
                                <strong class="capital">{users['universityName']}</strong></h1>
                            <p>
                                {users['city']} - {users['pincode']} , {users['state']} , {users['country']}
                            </p>
                            <br />
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    Hall Ticket No : <span class="heighlight"> 888888888</span>
                                </Grid>
                                <Grid item xs={4}>
                                    <div class="certificate-header"><img src={jntuLogo} class="logo" alt="" /></div>

                                </Grid>
                                <Grid item xs={4} class="pcNO">
                                    PC.No : <span class="heighlight"> {users['collegeCode']}</span>
                                </Grid>
                            </Grid>

                            <br />
                            <h3 class="">
                                <div class="">
                                    <span class="subheading">Provisonal Certificate</span>
                                </div>
                            </h3>
                        </div>


                        <br />
                        <br />

                        <div class="">
                            <div class="">
                                <p>
                                    This is to Certify That  <b className="underline"> {users['studentFirstName']} {users['studentSecondName']} </b>
                                     son/daughter of Shri.
                                    <b className="underline"> {users['parentsName']} </b>
                                    passed
                                    <b className="underline"> {users['degree']} <small> (CIVIL ENGINEERING) </small></b>
                                    degree examination of this university held in
                                    <b className="underline"> {users['examDate']} </b>
                                    and that he/she  was placed in
                                    <b className="underline">     ****     {users['placedIn']} With Distinction     ****     </b>
                                    He/She has satisfied all the requirements for the award of the B.Tech
                                    degree of the Jawaharlal Nehru Technological University.
                                </p>
                            </div>
                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <div class="certificate-footer text-muted">
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    --------------
                                    Controller of Examination
                                </Grid>
                                <Grid item xs={4}>
                                    --------------
                                    Director of Evaluation
                                </Grid>

                                <Grid item xs={4}>
                                    --------------
                                    Registrar
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    );
}

export default Preview;
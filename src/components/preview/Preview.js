import { Grid } from '@material-ui/core';
import { React } from 'react';
import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import './Preview.css';
import jntuLogo from "../../assets/jntu.jpeg"
import sig1 from "../../assets/ControllerofExamination.png"
import sig2 from "../../assets/V-icon.png"
import sig3 from "../../assets/V-icon.png"


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
        <div className="main">
            <div classNameName="mainContainer">

                <div className="row image">
                    <img src={jntuLogo} className="logo" alt="Logo" />
                </div>
                <div className="row">
                    <div className="universityName">
                        Jawaharlal Nehru Technological University
        </div>
                    <div className="address">
                        Kakinada - 533 003, Andhra Pradesh, India
        </div>
                    <div className="collageName">
                        College : PACE INSTITUTE OF TECHNOLOGY AND SCIENCES
        </div>
                </div>
                <div className="certificteHeading">
                    Provisonal Certificate
      </div>
                <div className="certificateSubHeading">
                    <div className="column">Hall Ticket No : <b>888888888</b>
                    </div>
                    <div className="column">
                        PC.No : <b>202112999</b>
                    </div>
                </div>


                <div className="certificateBody">

                    This is to Certify That <b className="underline"> XXXXXXXXXX </b>

        son/daughter of Shri. <b className="underline"> YYYYYYYYY </b>

        passed <b className="underline"> B.Tech <small> (CIVIL ENGINEERING) </small></b> degree

        examination of this university held in <b className="underline"> April 2013 </b> and that

        he/she was placed in <b className="underline"> **** First className With Distinction **** </b>

        He/She has satisfied all the requirements for the award of the B.Tech

        degree of the Jawaharlal Nehru Technological University.
      </div>

                <div className="certificatesubfooter">
                    <div className="columnFooter">
                        Date : 27/07/2019
        </div>
                </div>

                <div className="certificatesignatureFooter">
                    <div className="columnFooter">
                        <img src={sig1} className="signatureLogo" alt="Logo" />
                    </div>
                    <div className="columnFooter">
                        <img src={sig1} className="signatureLogo" alt="Logo" />
                    </div>
                    <div className="columnFooter">
                        <img src={sig1} className="signatureLogo" alt="Logo" />
                    </div>

                </div>


                <div className="certificateFooter">
                    <div className="columnFooter">
                        Controller of Examination
        </div>
                    <div className="columnFooter">
                        Director of Evaluation
        </div>
                    <div className="columnFooter">
                        Registrar
        </div>

                </div>
            </div>
        </div>
    );
}

export default Preview;
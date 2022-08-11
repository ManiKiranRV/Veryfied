import { React } from 'react';
import { useState, useEffect } from 'react';
import './Preview.css';

const Preview = (props) => {
    const [users, setUsers] = useState({});
    const [logoImage, setLogoImage] = useState("");
    const [registrarSignature, setregistrarSignature] = useState("");
    const [doeSignature, setdoeSignature] = useState("");
    const [coeSignature, setcoeSignature] = useState("");


    let propsData = props.data;

    useEffect(() => {
        console.log("props.data", propsData[0]);
        setUsers(propsData[0]);
        console.log("2222", users);
        imageApiCall();
    }, [])


    const imageApiCall = () => {
        console.log("images:::::", propsData[0]['universityLogo'], propsData[0]['coeSignature'], propsData[0]['doeSignature'], propsData[0]['registrarSignature'])
        const imageObjectURL = 'https://api.verified.realware.tech/veryfied/docs/' + propsData[0]['universityLogo'];
        setLogoImage(imageObjectURL)

        const imageObjectURL1 = 'https://api.verified.realware.tech/veryfied/docs/' + propsData[0]['coeSignature'];
        setcoeSignature(imageObjectURL1)

        const imageObjectURL2 = 'https://api.verified.realware.tech/veryfied/docs/' + propsData[0]['doeSignature'];
        setdoeSignature(imageObjectURL2)

        const imageObjectURL3 = 'https://api.verified.realware.tech/veryfied/docs/' + propsData[0]['registrarSignature'];
        setregistrarSignature(imageObjectURL3)
        // });
    }


    return (
        <div className="main">
            <div classNameName="mainContainer">

                <div className="row image">
                    <img src={logoImage} className="logo" alt="Logo" />
                </div>
                <div className="row">
                    <div className="universityName">
                        {users['universityName']}
                    </div>
                    <div className="address">
                        {users['city']} - {users['pincode']},{users['state']}, {users['country']}
                    </div>
                    <div className="collageName">
                        College : {users['affiliatedCollege']}
                    </div>
                </div>
                <div className="certificteHeading">
                    Provisonal Certificate
      </div>
                <div className="certificateSubHeading">
                    <div className="column">Hall Ticket No : <b>888888888</b>
                    </div>
                    <div className="column">
                        PC.No : <b>{users['collegeCode']}</b>
                    </div>
                </div>


                <div className="certificateBody">

                    This is to Certify That <b className="underline"> {users['studentFirstName']} {users['studentSecondName']} </b>

        son/daughter of Shri. <b className="underline">  {users['parentsName']}  </b>

        passed <b className="underline"> {users['degree']} <small> (  {users['branch']} ) </small></b> degree

        examination of this university held in <b className="underline"> {users['examDate']} </b> and that

        he/she was placed in <b className="underline">  **** {users['placedIn']} ****  </b>

        He/She has satisfied all the requirements for the award of the {users['degree']} degree of the {users['universityName']}.
      </div>

                <div className="certificatesubfooter">
                    <div className="columnFooter">
                        Date : {users['issueDate']}
                    </div>
                </div>

                <div className="certificatesignatureFooter">
                    <div className="columnFooter">
                        <img src={coeSignature} className="signatureLogo" alt="Logo" />
                    </div>
                    <div className="columnFooter">
                        <img src={doeSignature} className="signatureLogo" alt="Logo" />
                    </div>
                    <div className="columnFooter">
                        <img src={registrarSignature} className="signatureLogo" alt="Logo" />
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
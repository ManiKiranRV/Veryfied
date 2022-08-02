import "./Sidebar.css";
import logo from "../../assets/V-icon.png"
import { Link } from "react-router-dom";
import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const Sidebar = ({ sidebarOpen, closeSidebar }) => {

    const [active, setActive] = useState(0);

    // const toggleClass = () => {
    //     setActive(!active);
    // }

    return (
        <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
            <div className="sidebar__title">
                <div className="sidebar__img">
                    <img src={logo} alt="logo" /> 
                    <h1 className="projectTitle">
                        Veryfied
                    </h1>
                </div>
                <i className="fa fa-times"
                    id="sidebarIcon"
                    onClick={() => closeSidebar()}
                ></i>
            </div>

            <div className="sidebar__menu">
                <div onClick={() => setActive(0)} className={active === 0 ? "sidebar__link active_menu_link" : "sidebar__link"}>
                    <i className="fa fa-home"></i>
                    <Link to="/">Dashboard
                    <p>Get insights into the activities</p>
                    </Link>
                </div>
                <div className="sidebar__link" >
                    <i className="fa fa-university"></i>
                    <Link to="#">Universities
                    <p>Signed up clients</p>
                    </Link>
                </div>
                {/* <div className={active ? "sidebar__link active_menu_link" : "sidebar__link"} onClick={toggleClass}> */}
                <div onClick={() => setActive(2)} className={active === 2 ? "sidebar__link active_menu_link" : "sidebar__link"}>
                    <i className="fa fa-check"></i>
                    <Link to="/CertificateTemplate">Certificates
                    <p>View minted certificates</p>
                    </Link>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-wrench"></i>
                    <Link to="#">Complaints
                    <p>Service requests</p>
                    </Link>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-bar-chart"></i>
                    <Link to="#">Payments
                    <p>Get insights into the revenue</p>
                    </Link>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-file"></i>
                    <Link to="#">Templates
                    <p>Saved Certificate Templates</p>
                    </Link>
                </div>

                <div className="moreItems">
                    <div className="sidebar__link">
                        <i className="fa fa-cog"></i>
                        <Link to="#">Settings</Link>
                    </div>
                    <div className="sidebar__link">
                        <i className="fa fa-info-circle"></i>
                        <Link to="#">What’s new?</Link>
                    </div>
                    <div className="sidebar__link">
                        <i className="fa fa-question-circle"></i>
                        <Link to="#">Customers Support </Link>
                    </div>
                </div>



                <hr className="hrStyle"></hr>
                <Grid container spacing={1} className="GridButtons">
                    <Grid item>
                        <Button className="buttons__grid" size="small" variant="outlined">Status</Button>
                    </Grid>
                    <Grid item>
                        <Button className="buttons__grid" size="small" variant="outlined">Privacy</Button>
                    </Grid>
                    <Grid item>
                        <Button className="buttons__grid" size="small" variant="outlined">Terms</Button>
                    </Grid>
                </Grid>
            </div>
        </div >
    )
}

export default Sidebar;
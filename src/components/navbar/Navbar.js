import "./Navbar.css"
import avatar from "../../assets/avatar.png";
import hello from "../../assets/hello.jpg"



const Navbar = ({ sidebarOpen, openSidebar }) => {
    return (
        <nav className="navbar">
            <div className="nav_icon" onClick={() => openSidebar()}>
                <i className="fa fa-bars"></i>
            </div>
            <div className="navbar__left">
               
                  <div className="main__title">
                  
                    <img width="68" src={hello} alt="hello" />
                    <div className="main__greeting">
                        <h1>Hello</h1>
                        <p>Welcome admin</p>
                    </div>
                </div>
            </div>
            <div className="navbar__right">
                <a href="/">
                    <i className="fa fa-search"></i>
                </a>
                <a href="/">
                    <i className="fa fa-clock"></i>
                </a>
                <a href="/">
                    <img width="30" src={avatar} alt="avatar" />
                </a>
            </div>

        </nav>
    )
};

export default Navbar;
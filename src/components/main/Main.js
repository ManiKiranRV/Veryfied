import "./Main.css";
import Grid from "../grid/Grid"
const Main = () => {
    return (
        <main>
            <div className="main__container">
                <div className="main__title">
                    <h1>Dashboard</h1>
                </div>

                <div className="main__cards">
                    <div className="card">
                        {/* <i className="fa fa-users fa-2x text-lightblue"></i> */}
                        <p className="text-primary-p">Clients</p>
                        <div className="card_inner">
                            {/* <p className="text-primary-p">Clients</p> */}
                            <span className="font-bolder text-title" style={{ color: 'red' }}>1,254</span>
                        </div>
                    </div>
                    <div className="card">
                        {/* <i className="fa fa-certificate fa-2x text-red"></i> */}
                        <p className="text-primary-p">Minted Certificates</p>
                        <div className="card_inner">
                            <span className="font-bolder text-title" style={{ color: '#367BF5' }}>80209</span>
                        </div>
                    </div>
                    <div className="card">
                        {/* <i className="fa fa-usd fa-2x text-yellow"></i> */}
                        <p className="text-primary-p">Revenue</p>
                        <div className="card_inner">
                            <span className="font-bolder text-title" style={{ color: '#2FA84F' }}>$1.14m</span>
                        </div>
                    </div>
                    <div className="card">
                        {/* <i className="fa fa-window-close fa-2x text-green"></i> */}
                        <p className="text-primary-p">Complaints</p>
                        <div className="card_inner">
                            <span className="font-bolder text-title" style={{ color: "#F3AA18" }}>27</span>
                        </div>
                    </div>
                </div>

               
            </div>
            <Grid />
           
        </main>
    )
}

export default Main;
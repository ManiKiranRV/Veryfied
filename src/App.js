import { useState } from 'react';
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import Dashboard from "./components/main/Main";
import CertificateTemplate from "./components/certificates/Certificates";
import Login from './components/login/Login';
import useToken from './components/useToken';




const App = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }

  const openSidebar = () => {
    setSidebarOpen(true);
  }
  const closeSidebar = () => {
    setSidebarOpen(false);
  }
  return (
    <div className="container">
      <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} >
            {/* <Dashboard /> */}
          </Route>
          <Route path="/CertificateTemplate" element={<CertificateTemplate />} >
            {/* < CertificateTemplate /> */}
          </Route>
        </Routes>
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />

      </BrowserRouter>
    </div>
  );



}

export default App;

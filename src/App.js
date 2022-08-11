import { useState } from 'react';
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { Route, Routes } from 'react-router-dom'
import Dashboard from "./components/main/Main";
import CertificateTemplate from "./components/certificates/Certificates";
import Login from './components/login/Login';
function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

const App = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const token = getToken();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  const openSidebar = () => {
    setSidebarOpen(true);
  }
  const closeSidebar = () => {
    setSidebarOpen(false);
  }
  return (
    <div className="container">
      <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/CertificateTemplate" exact element={< CertificateTemplate />} />
      </Routes>
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );



}

export default App;

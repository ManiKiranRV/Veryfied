import React from 'react';
import './Login.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import logo from "../../assets/V-icon.png"
import Swal from "sweetalert2";



export default function Login({ setToken }) {
  const Token = { "token": "1232324" }
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = async e => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin@123') {
      console.log('1111')
      setToken(Token);
    }
    else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Invalid Username/Password',
        showConfirmButton: false,
        timer: 1500
      })
    }

  }

  return (
    // <div className="login-wrapper">
    //   <h1>Please Log In</h1>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       <p>Username</p>
    //       <input type="text" onChange={e => setUserName(e.target.value)} />
    //     </label>
    //     <label>
    //       <p>Password</p>
    //       <input type="password" onChange={e => setPassword(e.target.value)} />
    //     </label>
    //     <div>
    //       <button type="submit">Submit</button>
    //     </div>
    //   </form>
    // </div>
    <div class="box-form">
      <div class="left">
        <div class="overlay">
          <img class="image" src={logo} alt="logo" />
          <h1>Veryfied</h1>
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Curabitur et est sed felis aliquet sollicitudin</p> */}
          {/* <span>
            <p>login with social media</p>
            <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
            <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i> Login with Twitter</a>
          </span> */}
        </div>
      </div>
      <div class="right">
        <h5>Login</h5>
        {/* <p>Don't have an account? <a href="#">Creat Your Account</a> it takes less than a minute</p> */}
        <div class="inputs">
          <input type="text" placeholder="User Name" onChange={e => setUserName(e.target.value)} />
          <br />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        </div>
        <br /><br />
        <div class="remember-me--forget-password">

          {/* <label>
            <input type="checkbox" name="item" checked="" />
            <span class="text-checkbox">Remember me</span>
          </label>
          <p>forget password?</p> */}
        </div>
        <br />
        <button type="submit" onClick={handleSubmit}>Login</button>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
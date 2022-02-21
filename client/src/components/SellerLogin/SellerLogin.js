import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SellerLogin.css";

function SellerLogin() {

    const navigate = useNavigate()

const [data, setdata] = useState({
    userName : "" ,
    email : "" ,
    password : ""
})

const chnangeHandler = (id) => {
    const value = document.getElementById(id).value;
    if (id === "userName123") {
        setdata({userName : value , email : data.email , password : data.password})
    }
    if (id === "email123") {
        setdata({email : value , userName : data.userName , password : data.password})
    }
    if (id === "password123") {
        setdata({password : value , userName : data.userName , email : data.email})
    }  
}

const clickHandler = async () => {
    console.log(data.password)
    const response = await fetch('http://localhost:8000/api/v3/seller/register' , {
        method : "POST" , 
        headers : {"Content-Type" : "application/json"} ,
        body : JSON.stringify({
            name : data.userName ,
            email : data.email , 
            password : data.password
        })
    })
    const result = await response.json();
    if (result.success) {
        localStorage.removeItem('token')
        localStorage.setItem('token' , result.token)
        navigate('/')
    }
}
    
  return (
    <div className="sellerRegister">
      <div className="overlay123">
        <div className="SellerLoginPage">
          <div className="SellerLoginPageLeftSide">
            <div className="wrapper300">
              <div className="SellerLoginPageLeftSideTop">Resep.</div>
              <div className="SellerLoginPageLeftSideMid">
                Become a Part of Resep Here.
              </div>
            </div>
          </div>
          <div className="SellerLoginPageRightSide">
            <div className="formElements">
              <div class="input-group SellerSignUp">
                <input type="text" id="userName123" required onChange={() => {chnangeHandler("userName123")}}/>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label className="label">User Name</label>
              </div>
              <div class="input-group SellerSignUp">
                <input type="text" id="email123" required onChange={() => {chnangeHandler("email123")}}/>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label className="label">Email</label>
              </div>
              <div class="input-group SellerSignUp">
                <input type="password" id="password123" required onChange={() => {chnangeHandler("password123")}}/>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label className="label">Password</label>
              </div>
            </div>
            <div className="warning">
              By continuing, you agree to Resep's Terms and Conditions
            </div>
            <div className="buttonForSignUp">
              <a className="buttonForSignUprealOne" onClick = {() => {clickHandler()}}>Sign Up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerLogin;

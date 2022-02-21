import "./Login.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [ForgotPasswordNew, setForgotPasswordNew] = useState({
    Pass : "" ,
    cPass : ""
  });

  const [Login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [Forgot, setForgot] = useState({
    email: "",
  });

  const [SignUp, setSignUp] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [OTP, setOTP] = useState({
    OTP: "",
  });

  const otpChangeHandler = () => {
    const OTP = document.getElementById("OTP").value
    setOTP({
      OTP : OTP
    })
  }

  useEffect(() => {
    document.body.style.overflowY = "hidden";
  }, []);

  const cross = (
    <svg
      className="crosses"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#000000"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </svg>
  );

  const OTPToggle = () => {
    const divs = document.querySelectorAll(".ForgotPass");
    for (let i = 0; i < divs.length; i++) {
      divs[i].style.display = "none";
    }
    const divs2 = document.querySelectorAll(".OTPentry");
    for (let i = 0; i < divs2.length; i++) {
      divs2[i].style.display = "block";
    }
    document.querySelector('.errorLabel').style.display = "none"
  };

  const forgotPasswordHandler = async () => {
    var email = document.getElementById("email2").value;
    setForgot({
      email: email,
    });
  };

  const SignUpHandler = async () => {
    const response = await fetch("http://localhost:8000/api/v1/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: SignUp.userName,
        email: SignUp.email,
        password: SignUp.password,
      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      document.querySelector('.errorLabel').style.display = "none"
      window.location.href = "/";
    }
    else {
      document.querySelector('.errorLabel').innerHTML = result.message
      document.querySelector('.errorLabel').style.display = "block"
    }
  };

  const crossfunc = () => {
    navigate("/");
    document.body.style.overflowY = "scroll";
  };

  const toggleForgot = () => {
    const divs = document.querySelectorAll(".Login");
    for (let i = 0; i < divs.length; i++) {
      divs[i].style.display = "none";
    }
    const divs2 = document.querySelectorAll(".ForgotPass");
    for (let i = 0; i < divs2.length; i++) {
      divs2[i].style.display = "block";
    }
    document.querySelector('.errorLabel').style.display = "none"
  };

  const changeSignUp = () => {
    var username = document.getElementById("userName").value;
    var email = document.getElementById("email3").value;
    var password = document.getElementById("password2").value;
    setSignUp({
      userName: username,
      email: email,
      password: password,
    });
  };

  const changeLogin = () => {
    var email = document.getElementById("email1").value;
    var password = document.getElementById("password1").value;
    setLogin({
      email: email,
      password: password,
    });
  };

  const toggleSignUp = () => {
    var divs = document.querySelectorAll(".Login");
    for (let i = 0; i < divs.length; i++) {
      divs[i].style.display = "none";
    }
    var divs2 = document.querySelectorAll(".SignUp");
    for (let i = 0; i < divs2.length; i++) {
      divs2[i].style.display = "block";
    }
    document.querySelector('.errorLabel').style.display = "none"
  };

  const LoginHandler = async () => {
    const response = await fetch("http://localhost:8000/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: Login.email,
        password: Login.password,
      }),
    });
    const result = await response.json();
    if (result.success) {
      document.querySelector('.errorLabel').style.display = "none"
      localStorage.setItem('token' , result.token)
      window.location.href = "/";
    }
    else {
      document.querySelector('.errorLabel').innerHTML = result.message
      document.querySelector('.errorLabel').style.display = "block"
    }
  };

  const forgotHandler = async () => {
    const response = await fetch("http://localhost:8000/api/v1/user/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: Forgot.email,
      }),
    });
    const result = await response.json();
    if (result.success) {
      document.querySelector('.errorLabel').style.display = "none"
      OTPToggle()
    }
    else {
      document.querySelector('.errorLabel').innerHTML = result.message
      document.querySelector('.errorLabel').style.display = "block"
    }
  };

  const otpHandler = async () => {
    const response = await fetch("http://localhost:8000/api/v1/user/reset/OTP" , {
      method : "POST" ,
      headers : {"Content-Type": "application/json"} ,
      body : JSON.stringify({
        OTP : OTP.OTP
      })
    })
    const result = await response.json()
    if (result.success) {
      document.querySelector('.errorLabel').style.display = "none"
      confPassToggle()
    }
    else {
      document.querySelector('.errorLabel').innerHTML = result.message
      document.querySelector('.errorLabel').style.display = "block"
    }
  }

  const confPassToggle = () => {
    const divs = document.querySelectorAll(".OTPentry");
    for (let i = 0 ; i < divs.length ; i++ ){
      divs[i].style.display = "none"
    }
    const divs2 = document.querySelectorAll(".ConfPass");
    for (let i = 0 ; i < divs2.length ; i++ ){
      divs2[i].style.display = "block"
    }
    document.querySelector('.errorLabel').style.display = "none"
  }

  const ConfPassChangeHandler = () => {
    const pass = document.getElementById("password3").value
    const Cpass = document.getElementById("password4").value
    setForgotPasswordNew({
      Pass : pass ,
      cPass : Cpass
    })
  }

  const ConfPassSubmitHandler = async () => {
    const response = await fetch('http://localhost:8000/api/v1/user/reset/password' , {
      method : "POST" , 
      headers : {"Content-Type" : "application/json"} ,
      body : JSON.stringify({
        Pass : ForgotPasswordNew.Pass ,
        cPass : ForgotPasswordNew.cPass ,
        email : Forgot.email
      })
    })
    const result = await response.json();
    if (result.success) {
      document.querySelector('.errorLabel').style.display = "none"
      loginToggle()
    }
    else {
      document.querySelector('.errorLabel').innerHTML = result.message
      document.querySelector('.errorLabel').style.display = "block"
    }
  }

  const loginToggle = () => {
    const divs = document.querySelectorAll('.ConfPass');
    for (let i = 0 ; i < divs.length ; i++) {
      divs[i].style.display = 'none'
    }
    const divs2 = document.querySelectorAll('.Login');
    for (let i = 0 ; i < divs2.length ; i++) {
      divs2[i].style.display = 'block'
    }
    document.querySelector('.errorLabel').style.display = "none"
  }

  return (
    <div className="login">
      <div className="container7">
        <div className="overlay1">
          <div className="cross" onClick={() => crossfunc()}>
            {cross}
          </div>
          <div className="LoginSignUpForm">
            <div className="leftSide">
              <div className="leftSideWrapper">
                <div className="para21">Resep.</div>
                <div className="para22">
                  Get Access to Orders, WishList, and Recommendations.
                </div>
              </div>
            </div>
            <div className="RightSide">
              <div className="RightSideWrapper">
                <div class="input-group Login">
                  <input
                    type="text"
                    id="email1"
                    value={Login.email}
                    onChange={() => {
                      changeLogin();
                    }}
                    required
                  />
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label className="label">Email</label>
                </div>
                <div class="input-group OTPentry">
                  <input
                    type="text"
                    id="OTP"
                    value={OTP.OTP}
                    onChange={() => {
                      otpChangeHandler();
                    }}
                    required
                  />
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label className="label">Enter the OTP</label>
                </div>
                <div class="input-group ForgotPass">
                  <input
                    type="text"
                    id="email2"
                    value={Forgot.email}
                    onChange={() => {
                      forgotPasswordHandler();
                    }}
                    required
                  />
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label className="label">Email</label>
                </div>
                <div class="input-group SignUp">
                  <input
                    type="text"
                    id="userName"
                    value={SignUp.userName}
                    onChange={() => {
                      changeSignUp();
                    }}
                    required
                  />
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label className="label">User Name</label>
                </div>
                <div class="input-group SignUp">
                  <input
                    type="text"
                    id="email3"
                    value={SignUp.email}
                    onChange={() => {
                      changeSignUp();
                    }}
                    required
                  />
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label className="label">Email</label>
                </div>
                <div class="input-group Login">
                  <input
                    type="password"
                    id="password1"
                    value={Login.password}
                    onChange={() => {
                      changeLogin();
                    }}
                    required
                  />
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label className="label">Password</label>
                </div>
                <div class="input-group SignUp">
                  <input
                    type="password"
                    id="password2"
                    value={SignUp.password}
                    onChange={() => {
                      changeSignUp();
                    }}
                    required
                  />
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label className="label">Password</label>
                </div>
                <div class="input-group ConfPass">
                  <input
                    type="password"
                    id="password3"
                    value={ForgotPasswordNew.Pass}
                    onChange={() => {
                      ConfPassChangeHandler();
                    }}
                    required
                  />
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label className="label">Password</label>
                </div>
                <div class="input-group ConfPass">
                  <input
                    type="password"
                    id="password4"
                    value={ForgotPasswordNew.cPass}
                    onChange={() => {
                      ConfPassChangeHandler();
                    }}
                    required
                  />
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label className="label">Password</label>
                </div>
                <div className="policies Login">
                  By continuing, you agree to Resep's Terms of Use and Privacy
                  Policy.
                </div>
                <div className="errorLabel">
                  ERROR HERE
                </div>
                <div className="LoginButtonDiv Login">
                  <button
                    className="loginButton"
                    onClick={() => LoginHandler()}
                  >
                    Login
                  </button>
                </div>
                <div className="LoginButtonDiv ForgotPass">
                  <button
                    className="loginButton"
                    onClick={() => forgotHandler()}
                  >
                    Send OTP
                  </button>
                </div>
                <div className="LoginButtonDiv ConfPass">
                  <button
                    className="loginButton"
                    onClick={() => ConfPassSubmitHandler()}
                  >
                    Change Password
                  </button>
                </div>
                <div className="LoginButtonDiv OTPentry">
                  <button
                    className="loginButton"
                    onClick={() => otpHandler()}
                  >
                    Submit OTP
                  </button>
                </div>
                <div className="policies SignUp">
                  By continuing, you agree to Resep's Terms of Use and Privacy
                  Policy.
                </div>
                <div className="LoginButtonDiv SignUp">
                  <button
                    className="loginButton"
                    onClick={() => SignUpHandler()}
                  >
                    Register
                  </button>
                </div>

                <div className="forgotPassword Login">
                  <span
                    className="Forgot"
                    onClick={() => {
                      toggleForgot();
                    }}
                  >
                    Forgot Password?
                  </span>
                </div>

                <div className="newTo Login">
                  <span
                    className="SignUp1 Login"
                    onClick={() => {
                      toggleSignUp();
                    }}
                  >
                    New To Resep? SignUp
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

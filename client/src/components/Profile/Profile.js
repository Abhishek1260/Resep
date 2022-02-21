import React, { useEffect, useRef, useState } from "react";
import "./Profile.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import Heading from "../heading/Heading";
import CreditCard from "../credit_card/CreditCard";
import Cards4 from "../Cards4/Cards4";
import { motion } from "framer-motion";
import gsap from 'gsap'

function Profile() {
  const [width, setwidth] = useState(0);
  const navigate = useNavigate();

  const [data, setdata] = useState({})

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".Profile").style.height =
      window.innerHeight - 72 + "px";
  });

  useEffect(async () => {
    document.querySelector(".Profile").style.height =
      window.innerHeight - 72 + "px";
    const response = await fetch(`http://localhost:8000/api/v1/user/me/${localStorage.getItem('token')}` , {
      method : "PUT"
    })
    const result = await response.json()
    console.log(result)
    if (result.success) {
      setdata(result.user)
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggler = (string) => {
    const divs = document.querySelectorAll(".SelectAll");
    for (let i = 0; i < divs.length; i++) {
      divs[i].style.display = "none";
    }
    const divs2 = document.querySelectorAll(`.${string}`);
    console.log(divs2);
    for (let i = 0; i < divs2.length; i++) {
      divs2[i].style.display = "block";
    }
  };

  const toggle1 = () => {};

  const toggle2 = () => {};

  const toggle3 = () => {};

  const expand = (
    <svg
      className="expand"
      xmlns="http://www.w3.org/2000/svg"
      height="30px"
      viewBox="0 0 24 24"
      width="30px"
      fill="#000000"
    >
      <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
    </svg>
  );

  const cao = useRef();

  const findWidth = () => {
    setwidth(cao.current.scrollWidth - cao.current.offsetWidth);
    console.log(cao.current.scrollWidth);
    console.log(cao.current.offsetWidth);
  };

  return (
    <div className="Profile">
      <div className="profileLeftSide">
        <ul className="profileNav">
          <li
            className="profileNavLi"
            onClick={() => {
              toggler("profiles12");
            }}
          >
            Profile
          </li>
          <li
            className="profileNavLi"
            onClick={() => {
              toggler("payments12");
              findWidth();
            }}
          >
            Payments
          </li>
          <li className="profileNavLi">
            <Link to="/orders">My Orders</Link>
          </li>
          {data.role === "seller" && <li><Link to = "/order/received">Orders</Link></li>}
          {data.role === "seller" ? <li><Link to = "/MyProducts">My Products</Link></li> : null}
          <li className="profileNavLi"><Link to = "/wishlist">Wishlist</Link></li>
          <li className="profileNavLi">
            <a onClick={() => logout()}>Logout</a>
          </li>
        </ul>
      </div>
      <div className="profileRightSide">
        <div className="wrapper30 normalDetails">
          <div className="personaldetails profiles12 SelectAll">
            <div className="heading4">Personal Details</div>
            <div className="personalDetailsName">{data.name}</div>
          </div>
          <div className="email25 profiles12 SelectAll">
            <div className="heading4">Email</div>
            <div className="email26">{data.email}</div>
          </div>
          <div className="mobileNumber profiles12 SelectAll">
            <div className="heading4">Main Address</div>
            <div className="MobileNumber1">7982444610</div>
          </div>
          <div className="savedCards payments12 SelectAll">
            <div className="heading4" onClick={() => {toggle1()}}>Saved Cards {expand}</div>
            <motion.div className="container66" ref={cao}>
              <motion.div
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                className="container67"
              >
                <CreditCard />
                <CreditCard />
                <CreditCard />
                <CreditCard />
              </motion.div>
            </motion.div>
          </div>
          <div className="UPI payments12 SelectAll">
            <div className="heading4" onClick={() => {toggle2()}}>Saved UPI accounts {expand}</div>
          </div>
          <div className="Coupons payments12 SelectAll">
            <div className="heading4" onClick={() => {toggle3()}}>Coupons For You {expand}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

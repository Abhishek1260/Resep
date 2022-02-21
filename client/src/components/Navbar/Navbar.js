import React, { useEffect, useState } from "react";
import "./Navbar.css";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";

const expand = (
  <svg
    className="expand"
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="#000000"
  >
    <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
  </svg>
);

const search123 = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    width="24px"
    className="search"
    viewBox="0 0 24 24"
    fill="#000000"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const menu = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="#000000"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);
function Navbar(props) {
  const [data, setdata] = useState("");
  const [url, seturl] = useState("")

  useEffect(async () => {
    if (localStorage.getItem("token") !== undefined) {
      const response = await fetch(
        `http://localhost:8000/api/v1/user/me/${localStorage.getItem("token")}`,
        {
          method: "PUT",
        }
      );
      const result = await response.json();
      console.log(result)
      if (result.success) {
        if (result.user.role === "seller") {
          setdata("Add Product");
          seturl("/AddProduct")
        }
        if (result.user.role === "user") {
          setdata("My Orders");
          seturl("/orders")
        }
        if (result.user.role === "admin") {
          setdata("Dashboard");
          seturl("/dashboard")
        }
      }
    }
  }, []);

  const [state, setstate] = useState(false);

  const [search, setsearch] = useState({
    search: "",
  });

  const Navigate = useNavigate();

  const click = () => {
    if (!state) {
      gsap.fromTo(
        "#dropdown1",
        { y: -10, opacity: 0, display: "none" },
        { duration: 1, y: 0, opacity: 1, display: "block" }
      );
      setstate(true);
      gsap.fromTo(".expand", { rotateX: 0 }, { rotateX: 180, duration: 1 });
    } else {
      gsap.fromTo(
        "#dropdown1",
        { y: 0, opacity: 1, display: "block" },
        { duration: 1, y: -10, opacity: 0, display: "none" }
      );
      gsap.fromTo(".expand", { rotateX: 180 }, { rotateX: 0, duration: 1 });
      setstate(false);
    }
  };

  const changeHandler = () => {
    var input = document.getElementById("searchFinder").value;
    setsearch({
      search: input,
    });
  };

  const sendData = (data) => {
    localStorage.setItem("category", data);
    localStorage.setItem("search", "");
    Navigate("/products");
  };

  const [toggle, settoggle] = useState(false);

  const ToggleThis = () => {
    if (!toggle) {
      document.querySelector(".Navbar").style.opacity = 0;
      document.querySelector(".Navbar").style.display = "block";
      gsap.fromTo(
        ".Navbar",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
      settoggle(true);
    } else {
      gsap.fromTo(
        ".Navbar",
        { opacity: 1, y: 0 },
        { opacity: 0, y: -10, duration: 0.5 }
      );
      setTimeout(() => {
        document.querySelector(".Navbar").style.display = "none";
      }, 500);
      settoggle(false);
    }
  };

  const NavigatorProducts = () => {
    localStorage.setItem("search", search.search);
    localStorage.setItem("category", "all");
    Navigate("/products");
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Link className="logo" to="/">
          Resep.
        </Link>
      </div>
      <div className="searchBar">
        <input
          type="text"
          id="searchFinder"
          value={search.search}
          onChange={() => {
            changeHandler();
          }}
          placeholder="Find Product"
          className="searchbar"
        />
        <button
          className="btn1"
          onClick={() => {
            NavigatorProducts();
          }}
        >
          {search123}
        </button>
      </div>
      <div className="Navbar">
        <ul>
          <li onClick={() => click()}>
            <div>
              <div className="li_heading">Products {expand}</div>
              <div id="dropdown1" className="dropdown1_content">
                <div className="contents">
                  <a
                    onClick={() => {
                      sendData("Mobile Phone");
                    }}
                  >
                    Mobile
                  </a>
                  <a
                    onClick={() => {
                      sendData("furniture");
                    }}
                  >
                    Furniture
                  </a>
                  <a
                    onClick={() => {
                      sendData("Books");
                    }}
                  >
                    Books
                  </a>
                </div>
              </div>
            </div>
          </li>
          <li>
            {localStorage.getItem("token") ? (
              <Link to = {`${url}`}>{data}</Link>
            ) : (
              <Link to="/seller/login">Become a Seller</Link>
            )}
          </li>
          <li>
            {localStorage.getItem("token") ? (
              <Link to="/profile">Profile</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </div>
      <div className="menu" onClick={() => ToggleThis()}>
        {menu}
      </div>
    </div>
  );
}

export default Navbar;

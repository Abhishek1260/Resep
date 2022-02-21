import React, { useState } from "react";
import "./SendFormReview.css";
import { motion } from "framer-motion";

function ReviewSendForm(props) {

const [review, setreview] = useState({
    rating : 0 ,
    message : ""
})

  const colorChangeStar = (n) => {
    return;
  };

  const colorDefault = (n) => {
    for (let i = n + 1; i <= 4; i++) {
      document.querySelector(`.s${i}`).style.fill = "rgba(0 , 0 , 0 , 0.5)";
    }
    colorChangeStar(n);
  };

  const SetData = (n) => {
    for (let i = 0; i <= n; i++) {
      document.querySelector(`.s${i}`).style.fill = "gold";
    }
    setreview({
        message : review.message ,
        rating : n+1
    })
  };
  
const ChangeHandler = () => {
    const value = document.getElementById('textArea').value
    setreview({
        message : value ,
        rating : review.rating
    })
}

const addReview = async () => {
    console.log(review.message)
    console.log(review.rating)
    const response = await fetch(`http://localhost:8000/api/v2/product/review/add/${props.id}` , {
        method : "POST" , 
        headers : {"Content-Type" : "application/json"} ,
        body : JSON.stringify({
            rating : review.rating ,
            message : review.message ,
            token : localStorage.getItem('token')
        })
    })
    const result = await response.json();
    if (result.success) {
        displayContent()
    }
}

const displayContent = async () => {
    const response2  = await fetch(`http://localhost:8000/api/v2/product/review/get/${props.id}` , {
        method : "PUT"
      })
      const result2 = await response2.json()
      if (result2.success) {
        props.setOtherReview(result2.review)
      }
    const response1 = await fetch(`http://localhost:8000/api/v2/product/review/get/${props.id}` , {
      method : "POST" , 
      headers : {"Content-Type" : "application/json"} ,
      body : JSON.stringify({
        token : localStorage.getItem("token")
      })
    })
    const result1 = await response1.json()
    if (result1.success) {
    props.setMyReview({
        name : result1.review.name ,
        rating : result1.review.rating , 
        message : result1.review.message
      })
    }

}

  const star = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enable-background="new 0 0 24 24"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <g>
        <path d="M0,0h24v24H0V0z" fill="none" />
        <path d="M0,0h24v24H0V0z" fill="none" />
      </g>
      <g>
        <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
      </g>
    </svg>
  );

  return (
    <div className="SendFormReview">
      <div className="wrapper130">
        <div className="rating128">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              SetData(0);
            }}
            onMouseOver={() => {
              colorChangeStar(0);
            }}
            onMouseOut={() => {
              colorDefault(0);
            }}
            whileHover={{ scale: 1.2, transition: { duration: 0.5 } }}
            className="stars123 s0"
            enable-background="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <g>
              <path d="M0,0h24v24H0V0z" fill="none" />
              <path d="M0,0h24v24H0V0z" fill="none" />
            </g>
            <g>
              <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
            </g>
          </motion.svg>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              SetData(1);
            }}
            onMouseOver={() => {
              colorChangeStar(1);
            }}
            onMouseOut={() => {
              colorDefault(1);
            }}
            whileHover={{ scale: 1.2, transition: { duration: 0.5 } }}
            className="stars123 s1"
            enable-background="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <g>
              <path d="M0,0h24v24H0V0z" fill="none" />
              <path d="M0,0h24v24H0V0z" fill="none" />
            </g>
            <g>
              <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
            </g>
          </motion.svg>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              SetData(2);
            }}
            onMouseOver={() => {
              colorChangeStar(2);
            }}
            onMouseOut={() => {
              colorDefault(2);
            }}
            whileHover={{ scale: 1.2, transition: { duration: 0.5 } }}
            className="stars123 s2"
            enable-background="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <g>
              <path d="M0,0h24v24H0V0z" fill="none" />
              <path d="M0,0h24v24H0V0z" fill="none" />
            </g>
            <g>
              <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
            </g>
          </motion.svg>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              SetData(3);
            }}
            onMouseOver={() => {
              colorChangeStar(3);
            }}
            onMouseOut={() => {
              colorDefault(3);
            }}
            whileHover={{ scale: 1.2, transition: { duration: 0.5 } }}
            className="stars123 s3"
            enable-background="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <g>
              <path d="M0,0h24v24H0V0z" fill="none" />
              <path d="M0,0h24v24H0V0z" fill="none" />
            </g>
            <g>
              <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
            </g>
          </motion.svg>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              SetData(4);
            }}
            onMouseOver={() => {
              colorChangeStar(4);
            }}
            onMouseOut={() => {
              colorDefault(4);
            }}
            whileHover={{ scale: 1.2, transition: { duration: 0.5 } }}
            className="stars123 s4"
            enable-background="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <g>
              <path d="M0,0h24v24H0V0z" fill="none" />
              <path d="M0,0h24v24H0V0z" fill="none" />
            </g>
            <g>
              <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
            </g>
          </motion.svg>
        </div>
        <div className="heading128">Review This Product</div>
        <div className="description">
          <textarea id="textArea" onChange={() => {ChangeHandler()}} value = {review.message}></textarea>
        </div>
        <div className="submitButton"><a onClick = {() => {addReview()}} className="submitButtonForReview">Submit</a></div>
      </div>
    </div>
  );
}

export default ReviewSendForm;

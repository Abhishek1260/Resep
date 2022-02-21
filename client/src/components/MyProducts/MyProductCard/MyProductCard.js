import React from "react";
import "./MyProductCard.css";

function MyProductCard(props) {
  const Delete = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
    </svg>
  );

  const edit = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
    </svg>
  );

  const star = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enable-background="new 0 0 24 24"
      height="24px"
      className="MyProductStar"
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

    const deleteProduct = async () => {
      const response = await fetch(`http://localhost:8000/api/v3/seller/product/delete/${props.id}` , {
        method : "DELETE" , 
        headers : {
          "Content-Type" : "application/json"
        } ,
        body : JSON.stringify({
          token : localStorage.getItem('token')
        })
      })
      const result = await response.json();
      if (result.success) {
        const response1 = await fetch(
          `http://localhost:8000/api/v3/seller/product/get/${localStorage.getItem(
            "token"
          )}`,
          {
            method: "GET",
          }
        );
        const result2 = await response1.json();
        if (result2.success) {
          props.setData(result2.product)
        }
      }
    }

    const editProduct = async () => {
      console.log("edited")
    }

  return (
    <div className="MyProductCard">
      <div className="wrapper310">
        <div className="MyProductMainImage"></div>
        <div className="MyProductName">{props.name}</div>
        <div className="wrapper311">
          <div className="MyProductRating">{props.rating} {star}</div>
          <div className="MyProductReviews">({props.numOfReviews})</div>
        </div>
        <div className="MyProductConditiondiv"><span className="MyProductConditionspan">{props.quality}</span></div>
        <div className="MyProductPrice">{props.price}</div>
        <div className="wrapper312">
          <div className="MyProductEditICOdiv"><span className="MyProductEditICOspan" onClick = {() => {editProduct()}}>{edit}</span></div>
          <div className="MyProductDeleteICOdiv"><span className="MyProductDeleteICOspan" onClick = {() => {deleteProduct()}}>{Delete}</span></div>
        </div>
      </div>
    </div>
  );
}

export default MyProductCard;

import React from "react";
import "./Cards.css";
import {useNavigate} from 'react-router-dom'

function Cards(props) {

  const Navigator = useNavigate()

  const moveToProduct = async () => {
    const response = await fetch(`http://localhost:8000/api/v2/product/${props.id}` , {
      method : "PUT"
    })
    const result = await response.json()
    if (result.success) {
      props.changeData(result.product)
      Navigator('/products/view')
    }
  }

  console.log(props.photo)

  return (
    <div className="cards" onClick = {() => moveToProduct()}>
      <div className="cardsinner">
        <div className="wrapper2">
          <div className="image">
            <img src={props.img} className = "photo1" alt="" />
          </div>
          <div className="wrapper">
            <div className="name">{props.name}</div>
            <div className="rating">
              <div className="stars">{props.star}</div>
              <div className="reviews">({props.reviews})</div>
            </div>
            <div className="price123">&#8377; {props.price}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;

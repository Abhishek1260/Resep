import React, { useEffect, useState } from 'react';
import Heading2 from '../Heading2/Heading2';
import WishlistCard from './WhishlistCard/WishlistCard';
import './Wishlist.css'

function Wishlist(props) {

    const [data, setData] = useState([])

    useEffect( async () => {
        const response = await fetch(`http://localhost:8000/api/v1/user/wishlist/get/${localStorage.getItem("token")}` , {
            method : "PUT"
        })
        const result = await response.json()
        if (result.success) {
            setData(result.product)
            console.log(result.product)
        }
    }, [])
    
    const revise = async () => {
        const response = await fetch(`http://localhost:8000/api/v1/user/wishlist/get/${localStorage.getItem("token")}` , {
            method : "PUT"
        })
        const result = await response.json()
        if (result.success) {
            setData(result.product)
            console.log(result.product)
        }
    }

  return <div className = "orders22">
      <div className="wrapper30">
          <div className="Orders orders12 SelectAll wishlist">
            <Heading2 title = "Wishlist"/>
            <div className="cardsContainer22">
                {data.map((event) => {
                    return <WishlistCard name = {event.name} price = {event.price} status = {event.condition} id = {event.id} changeData = {props.changeData} revise = {revise}/>
                })}
            </div>
          </div>
        </div>
  </div>;
}

export default Wishlist;

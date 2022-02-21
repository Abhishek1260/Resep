import React, { useEffect, useState } from 'react'
import BottomPaymentBar from '../BottomPaymentBar/BottomPaymentBar'
import BuyNowCardsProducts from '../buyNowProductPage/BuyNowCardProducts/BuyNowCardsProducts'
import Heading2 from '../Heading2/Heading2'
import './Cart.css'
import CartCards from './CartCards/CartCards'

function Cart() {

    const [price, setPrice] = useState(0)
    const [data, setdata] = useState([])

    useEffect( async () => {
      const response = await fetch('http://localhost:8000/api/v1/user/cart/get' , {
          method : "POST" ,
          headers : {"Content-Type" : "application/json"} ,
          body : JSON.stringify({
              token : localStorage.getItem('token')
          })
      })
      const result = await response.json();
      console.log(result)
      if (result.success) {
        setdata(result.products)
        const response2 = await fetch(`http://localhost:8000/api/v1/user/cart/price/${localStorage.getItem('token')}` , {
            method : "POST"
        })
        const result2 = await response2.json()
        if (result2.success) {
            setPrice(result2.price)
        }
      }
    }, [])
    

  return (
    <div className='Cart'>
        <Heading2 title = "Cart"/>
        <div className="cartCards">
            {data.map((event) => {
                return <BuyNowCardsProducts photo = {event.mainPhoto} name = {event.name} price = {event.price} quantity = {event.quantity}/>
            })}
        </div>
        <BottomPaymentBar price = {price}/>
    </div>
  )
}

export default Cart
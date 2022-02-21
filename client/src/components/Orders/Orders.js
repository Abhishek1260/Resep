import React, { useEffect, useState } from 'react';
import Cards4 from '../Cards4/Cards4';
import Heading2 from '../Heading2/Heading2';
import './orders.css'

function Orders(props) {

  const [data, setdata] = useState([])

  useEffect( async () => {
    const response = await fetch(`http://localhost:8000/api/v1/user/order/get/${localStorage.getItem('token')}` , {
      method : "PUT"
    })
    const result = await response.json()
    if (result.success) {
      console.log(result)
      setdata(result.product)
    }
  }, [])
  

  return <div className = "orders22">
      <div className="wrapper30">
          <div className="Orders orders12 SelectAll">
            <Heading2 title = "My Orders"/>
            <div className="cardsContainer22">
              {data.map((event) => {
                console.log(event)
                return <Cards4 setID = {props.setId} id = {event.id} name = {event.name} price = {event.price} status = {event.status}/>
              })}
            </div>
          </div>
        </div>
  </div>;
}

export default Orders;

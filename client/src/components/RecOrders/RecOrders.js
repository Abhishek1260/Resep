import React, { useEffect, useState } from 'react'
import Heading2 from '../Heading2/Heading2'
import './RecOrders.css'
import RecOrdersCard from './RecOrdersCard/RecOrdersCard'
import ProductUpdate from '../ProductUpdate/ProductUpdate'

function RecOrders() {

    const [data, setdata] = useState([])
    const [id , setid] = useState("")
    const [paymentID, setpaymentID] = useState("")

    useEffect( async () => {
      const response = await fetch('http://localhost:8000/api/v6/order/get' , {
          method : "POST" , 
          headers : {"Content-Type" : "application/json"} ,
          body : JSON.stringify({
              token : localStorage.getItem('token')
          })
      })
      const result = await response.json()
      if (result.success) {
        setdata(result.product)
        console.log(result.product)
      }
    }, [])

    const [change, setchange] = useState(false)
    const [userID, setUserID] = useState("")

  return (
    <>
    {change ? (<ProductUpdate user = {userID} payment = {paymentID} id = {id}/>) : (<div className='RecOrders'>
        <Heading2 title = "Recieved Products"/>
        <div className="ReceivedProductCards">
        {data.map((event) => {
          return <RecOrdersCard payment = {setpaymentID} user = {event.user} userID = {setUserID} paymentid = {event.PaymentID} change = {setchange} name = {event.name} quantity = {event.quantity} price = {event.price} photo = {event.mainPhoto} status = {event.status} id = {event.id} setid = {setid}/>
        })}
        </div>
    </div>)}
    </>
  )
}

export default RecOrders
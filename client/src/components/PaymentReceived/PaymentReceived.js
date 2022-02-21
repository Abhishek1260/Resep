import React from 'react'
import { useNavigate } from 'react-router-dom'
import './PaymentReceived.css'

function PaymentReceived(props) {

  const navigate = useNavigate()

  const goToOrders = () => {
    navigate('/orders')
  }

  return (
    <div className = "PaymentReceived">
        <div className="Container156">
            <div className="wrapper360">
                Payment of rs {props.price} received for the order {props.name} and the order ID is {props.orderID}
            </div>
            <div className="buttonPaymentReceiveddiv">
                <a className='buttonPaymentReceiveda' onClick = {() => {goToOrders()}}>Go to Orders</a>
            </div>
        </div>
    </div>
  )
}

export default PaymentReceived
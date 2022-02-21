import React from 'react'
import './RecOrdersCard.css'

function RecOrdersCard(props) {

    const changeTheState = () => {
        props.setid(props.id)
        props.payment(props.paymentid)
        props.change(true)
        props.userID(props.user)
    }

  return (
    <div className='RecOrdersCard' onClick = {() => {changeTheState()}}>
        <div className="wrapper700">
            <div className="image700">
                <img src={props.photo} className = "photo1" alt="" />
            </div>
            <div className="wrapper701">
                <div className="productNameRecOrderscard">
                    {props.name}
                </div>
                <div className="quantityRecOrderscard">
                    Quantity : {props.quantity}
                </div>
                <div className="priceRecOrdersCard">
                    {props.price}
                </div>
                <div className="statusRecOrdersCard">
                    <span className='statusRecOrdersCardspan'>{props.status}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RecOrdersCard
import React from 'react'
import { Link } from 'react-router-dom'
import './BottomPaymentBar.css'

function BottomPaymentBar(props) {
  return (
    <div className='BottomPaymentBar'>
        <div className="wrapper340">
            <div className="rightSideBottomPaymentBar">
                <div className="rightSideBottomPaymentBarTop">
                    Total Amount Payable
                </div>
                <div className="rightSideBottomPaymentBarBottom">
                    {props.price}
                </div>
            </div>
            <div className="leftSideBottomPaymentBar">
                <Link to="/cart/buy" className='leftSideBottomPaymentBarA'>Proceed To Pay</Link>
            </div>
        </div>
    </div>
  )
}

export default BottomPaymentBar
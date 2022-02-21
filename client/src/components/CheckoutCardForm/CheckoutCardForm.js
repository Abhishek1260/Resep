import React from "react";
import "./CheckoutCardForm.css";

function CheckoutCardForm() {
  return (
    <div className="CheckoutCardForm">
      <div className="wrapper316">
        <div className="wrapper318">
        <div className="inputTagForCardNumber CheckoutDetailsAdddiv">
          <input type="number" name="" id="" className = "CheckoutDetailsAdd" placeholder="Card Number"/>
        </div>
        <div className="wrapper317">
          <div className="MMYY CheckoutDetailsAdddiv">
            <input type="text" className = "CheckoutDetailsAdd MMYYINPUT" placeholder = "MM/YY" style={{width : "100px"}}/>
          </div>
          <div className="CVV CheckoutDetailsAdddiv">
            <input type="password" className = "CheckoutDetailsAdd" placeholder = "CVV" style={{width : "100px"}}/>
          </div>
        </div>
        <div className="NameOnCard CheckoutDetailsAdddiv">
            <input type="text" className = "CheckoutDetailsAdd" placeholder="Name on Card"/>
        </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCardForm;

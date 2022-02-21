import React from "react";
import "./CreditCard.css";

function CreditCard() {

    const card = (
        <svg xmlns="http://www.w3.org/2000/svg" className = "card" height="30px" viewBox="0 0 24 24" width="30px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
    );

        const style = (
            <svg xmlns="http://www.w3.org/2000/svg" className="style" height="30px" viewBox="0 0 24 24" width="30px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M2.53 19.65l1.34.56v-9.03l-2.43 5.86c-.41 1.02.08 2.19 1.09 2.61zm19.5-3.7L17.07 3.98c-.31-.75-1.04-1.21-1.81-1.23-.26 0-.53.04-.79.15L7.1 5.95c-.75.31-1.21 1.03-1.23 1.8-.01.27.04.54.15.8l4.96 11.97c.31.76 1.05 1.22 1.83 1.23.26 0 .52-.05.77-.15l7.36-3.05c1.02-.42 1.51-1.59 1.09-2.6zm-9.2 3.8L7.87 7.79l7.35-3.04h.01l4.95 11.95-7.35 3.05z"/><circle cx="11" cy="9" r="1"/><path d="M5.88 19.75c0 1.1.9 2 2 2h1.45l-3.45-8.34v6.34z"/></svg>
        );

  return (
    <div className="Credit">
      <div className="Container24">
        <div className="wrapper40">
        <div className="top_card">
            <div className="cardIco">
                {card}
            </div>
            <div className="cardName">
                Card Company Name
            </div>
          </div>
          <div className="middle_card">
            Card Number
          </div>
          <div className="bottom_card">
            <div className="monthCard">
                <div className="topItem">
                    MM/YY
                </div>
                <div className="bottomItem">
                    09/12
                </div>
            </div>
            <div className="sign">
                {style}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreditCard;

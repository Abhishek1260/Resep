import React, { useEffect, useState } from "react";
import CreditCard from "../credit_card/CreditCard";
import "./Checkout.css";
import { motion } from "framer-motion";
import gsap from "gsap";
import CheckoutCardForm from "../CheckoutCardForm/CheckoutCardForm";

function Checkout() {
  const [contraintWidth, setcontraintWidth] = useState(0);
  const [savedCard, setsavedCard] = useState(false);
  const [ShowForm, setShowForm] = useState(true)

  useEffect(() => {
    const width = document.querySelector(
      ".SavedCardsCheckoutCardsCards"
    ).clientWidth;
    const width2 = document.querySelector(".wrapper314").clientWidth;
    setcontraintWidth(width - width2);
  }, []);

  const showSavedCard = () => {
    if (savedCard) {
      gsap.to(".SavedCardsCheckoutCards", {
        opacity: 0,
        display: "none",
        duration: 1,
      });
      setsavedCard(false);
    } else {
      document.querySelector(".SavedCardsCheckoutCards").style.opacity = 0;
      document.querySelector(".SavedCardsCheckoutCards").style.display = "flex";
      const width = document.querySelector(
        ".SavedCardsCheckoutCardsCards"
      ).clientWidth;
      const width2 = document.querySelector(".wrapper314").clientWidth;
      setcontraintWidth(width - width2);
      gsap.to(".SavedCardsCheckoutCards", { duration: 1, opacity: 1 });
      setsavedCard(true);
    }
  };

  const showCheckoutCardForm = () => {
    if (ShowForm) {
      gsap.to('.CheckoutCardForm' , {opacity : 0 , display : "none" , duration : 1})
      setShowForm(false)
    }
    else {
      document.querySelector(".CheckoutCardForm").style.opacity = 0;
      document.querySelector(".CheckoutCardForm").style.display = "flex";
      gsap.to(".CheckoutCardForm", { duration: 1, opacity: 1 });
      setShowForm(true)
    }
  }

  return (
    <div className="Checkout">
      <div className="wrapper314">
        <div className="SavedCardsCheckout">
          <div
            className="SavedCardsCheckoutHeading"
            onClick={() => {
              showSavedCard();
            }}
          >
            Saved Cards
          </div>
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -contraintWidth }}
            className="SavedCardsCheckoutCards"
          >
            <div className="SavedCardsCheckoutCardsCards">
              <CreditCard />
              <CreditCard />
              <CreditCard />
              <CreditCard />
              <CreditCard />
            </div>
          </motion.div>
        </div>
        <div className="newCardCheckout">
          <div className="NewCardCheckoutHeading" onClick={() => {showCheckoutCardForm()}}>Other Card</div>
          <div className="NewCardCheckoutForm"><CheckoutCardForm /></div>
        </div>
      </div>

    </div>
  );
}

export default Checkout;

import React, { useState , useEffect , useRef} from "react";
import Cards2 from "../cards2/Cards2";
import "./Section2.css";
import gsap from 'gsap'
import { motion } from 'framer-motion'

function Section2() {

  const [whatisnext1, setwhatisnext1] = useState(false);
  const [whatisnext2, setwhatisnext2] = useState(true);

  window.addEventListener('DOMContentLoaded' , () => {
    const width  = document.querySelector('.cardContainer4').clientWidth;

    if (width > window.innerWidth) {
      document.querySelector('.cardContainer4').style.justifyContent = 'flex-start';
      const buttons = document.querySelectorAll('.card2Nav')
      buttons[1].style.display = "block"
      console.log(width , window.innerWidth);
    }
  })

  const mover = () => {

  }

  let slider = 0

  const toggler = (n) => {
    if (n === 1) {
      if (whatisnext2) {
        document.querySelector('.card2Navprev').style.opacity = "0"
        document.querySelector('.card2Navprev').style.display = "block"
        gsap.to('.card2Navprev' , {duration : 1 , opacity : 1})
        setwhatisnext2(false)
      }
      slider -= 100;
      gsap.to(".cardContainer4" , {duration : 1 , x : slider})
      const width = document.querySelector('.cardContainer4').clientWidth - window.innerWidth;
      if (slider < -width) {
        slider = -width;
        gsap.to('.cardContainer4' , {duration : 1 , x : slider , delay : 0.5})
        gsap.to('.card2Navnext' , {opacity : 0 , duration : 1})
        setTimeout(() => {
          document.querySelector('.card2Navnext').style.display = 'none'
        }, 1200);
        setwhatisnext1(true)
      }
    }
    else {
      if (whatisnext1) {
        document.querySelector('.card2Navnext').style.opacity = '0'
        document.querySelector('.card2Navnext').style.display = 'block'
        gsap.to('.card2Navnext' , {duration : 1 , opacity : 1})
        setwhatisnext1(false)
      }
      slider += 100;
      gsap.to(".cardContainer4" , {duration : 1 , x : slider})
      if (slider > 0) {
        slider = 0;
        gsap.to('.cardContainer4' , {duration : 1 , x : slider , delay : 0.5})
        gsap.to('.card2Navprev' , {opacity : 0 , duration : 1})
        setTimeout(() => {
          document.querySelector('.card2Navprev').style.display = 'none'
        }, 1200);
        setwhatisnext2(true)
      }
    }
  }

  return (
    <div className="section2">
      <div className="cardContainer3">
        <div className="cardContainer4">
          <Cards2 />
          <Cards2 />
          <Cards2 />
          <Cards2 />
          <Cards2 />
          <Cards2 />
          <Cards2 />
          <Cards2 />
          <Cards2 />
        </div>
        <div className="buttonNavigaton">
          <a className="prevNav NavButton card2Nav card2Navprev" onClick = {() => toggler(-1)}>&#10094;</a>
          <a className="nextNav NavButton card2Nav card2Navnext" onClick = {() => toggler(1)}>&#10095;</a>
        </div>
      </div>
    </div>
  );
}

export default Section2;

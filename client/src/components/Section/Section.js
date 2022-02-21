import React, { useEffect, useRef, useState } from "react";
import Cards from "../cards/Cards";
import "./Section.css";
import gsap from 'gsap'
import {motion} from 'framer-motion'

function Section(props) {

  const [products, setproducts] = useState([]);

  useEffect(async () => {
    const response = await fetch("http://localhost:8000/api/v2/product/trending" , {
      method : "GET"
    })
    const result = await response.json();
    
    setwidth(cao.current.scrollWidth - window.innerWidth)
    if (!result.success) {
      console.log("massive failure")
    }
    let max = 0;
    for (let i = 0 ; i < result.products.length ; i++) {
      if (result.products[i].productStarts > max) {
        max = result.products[i].productStarts
      }
    }
    const arr = [];
    while (max >= 0) {
      for (let i = 0 ; i < result.products.length ; i++) {
        if (result.products[i].productStarts === max) {
          arr.push(result.products[i])
        }
      }
      max -= 1;
    }
    setproducts(arr)
    if (cao.current.scrollWidth > window.innerWidth) {
      setwidth(cao.current.scrollWidth - window.innerWidth)
    }
    else {
      setwidth(0)
    }
  }, []);

  const [width, setwidth] = useState(0);

  const cao = useRef()

  return (
    <div className="section1">
      <motion.div className="container2" ref = {cao}>
        <motion.div drag = "x" dragConstraints = {{right : 0 , left : -width}} onMouseEnter = {() => {console.log(width)}} className="cardsContainer">
         {products.map((event) => {
           return <Cards name = {event.name} img = {event.mainPhoto} star = {event.productStarts} reviews = {event.numOfReviews} price = {event.price} id = {event._id} changeData = {props.changeData}/>
         })}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Section;

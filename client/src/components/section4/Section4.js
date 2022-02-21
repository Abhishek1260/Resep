import React, { useState , useEffect , useRef} from "react";
import Cards2 from "../cards2/Cards2";
import "./Section4.css";
import gsap from 'gsap'
import { motion } from 'framer-motion'

function Section4() {

  const [width, setwidth] = useState(0);

  const cao = useRef()
  
  useEffect(() => {
    setwidth(cao.current.scrollWidth - cao.current.offsetWidth)
  }, []);
  

  return (
    <div className="section2">
      <motion.div className="cardContainer3" ref = {cao}>
        <motion.div drag = "x" dragConstraints = {{right : 0 , left : -width}} className="cardContainer4">
          <Cards2 />
          <Cards2 />
          <Cards2 />
          <Cards2 />
          <Cards2 />
          <Cards2 />
          <Cards2 />
          <Cards2 />
          <Cards2 />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Section4;

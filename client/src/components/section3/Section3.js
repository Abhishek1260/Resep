import Cards from "../cards/Cards";
import "./Section3.css";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Section3 = (props) => {
  const [width, setwidth] = useState(0);
  const [data12, setdata12] = useState([]);

  useEffect(async () => {
    const response = await fetch(
      "http://localhost:8000/api/v2/product/find/furniture",
      {
        method: "PUT",
      }
    );
    const result = await response.json();
    if (result.success) {
      setdata12(result.products);
      setwidth(cao.current.scrollWidth - window.innerWidth);
    }
  }, []);

  const cao = useRef();

  return (
    <div className="Section3">
      <motion.div className="container6" ref={cao}>
        <motion.div
          className="container5"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
        >
          {data12.map((event) => {
            return (
              <Cards
                name={event.name}
                star={event.productStarts}
                reviews={event.numOfReviews}
                price={event.price}
                id={event._id}
                changeData={props.changeData}
                img = {event.mainPhoto}
              />
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Section3;

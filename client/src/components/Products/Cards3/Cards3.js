import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cards3.css'
import {motion} from 'framer-motion'

function Cards3(props) {

  const navigate = useNavigate()

  const navigateToMainProductPage = async () => {
    const response = await fetch(`http://localhost:8000/api/v2/product/${props.id}` , {
      method : "PUT"
    })
    const result = await response.json()
    if (result.success) {
      props.changeData(result.product)
      navigate('/products/view')
    }
  }

  return <motion.div className = "cards3" whileTap={{scale : 0.9 , transition : {duration : 0.5}}} whileHover={{scale : 1.1 , transition : {duration : 0.5}}} onClick={() => {navigateToMainProductPage()}}>
      <div className="wrapper5">
          <div className="image">
          </div>
          <div className="productName">
            {props.name}
          </div>
          <div className="wrapper6">
              <div className="stars">
                {props.stars}
              </div>
              <div className="reviews">
                ({props.reviews})
              </div>
          </div>
          <div className="price123">
              {props.price}
          </div>
          <div className="offer">
              {props.offer}
          </div>
      </div>

  </motion.div>;
}

export default Cards3;

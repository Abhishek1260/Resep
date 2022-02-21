import React from 'react';
import './Cards4.css'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';

function Cards4(props) {

  const navigate = useNavigate()

  const navigateToOrders = () => {
    props.setID(props.id)
    navigate('/order/fulfil')
  }

  return <motion.div onClick={() => {navigateToOrders()}} whileTap={{scale : 0.9 , transition : {duration : 0.5}}} whileHover={{scale : 1.05 , transition : {duration : 0.5}}} className='Cards4'>
    <div className="wrapper46">
      <div className="image46"></div>
      <div className="productName22">
        {props.name}
      </div>
      <div className="productsStatus">
        <span className='productStatus'>{props.status}</span>
      </div>
      <div className="price22">
        {props.price}
      </div>
    </div>
  </motion.div>;
}

export default Cards4;

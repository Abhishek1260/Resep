import React from 'react'
import './WishlistCard.css'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function WishlistCard(props) {

    const navigate = useNavigate()
    
    const wishlistAdder = async () => {
        const response = await fetch(`http://localhost:8000/api/v1/user/wishlist/delete/${props.id}` , {
            method : "DELETE" ,
            headers : {
                "Content-Type" : "application/json"
            } ,
            body : JSON.stringify({
                token : localStorage.getItem("token")
            })
        })
        const result = await response.json()
        if (result.success) {
            props.revise()
        }
    }

    const navigateToProductPage = async () => {
        const response = await fetch(`http://localhost:8000/api/v2/product/${props.id}` , {
            method : "PUT"
        })
        const result = await response.json()
        if (result.success) {
            props.changeData(result.product)
            navigate("/products/view")
        }
    }

    const heart = (<svg onClick={() => {wishlistAdder()}} xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" className = "heartForWishlist" width="30px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>); 
  return (
    <motion.div className = "WishlistCard" onClick={() => {navigateToProductPage()}} whileHover={{scale : 1.05 , transition : {duration : 0.5}}} whileTap = {{scale : 0.9 , transition : {duration : 0.5}}}>
        <div className="wrapper100">
            <div className="image100">

            </div>
            <div className="productName100">
                {props.name}
            </div>
            <div className="status100">
                <span className='status101'>
                    {props.status}
                </span>
            </div>
            <div className="wrapper101">
                <div className="price100">
                    {props.price}
                </div>
                <div className="heartForWishlist">
                    {heart}
                </div>
            </div>
        </div>
    </motion.div>
  )
}

export default WishlistCard
import React from 'react'
import './OwnReviewCard.css'
import {motion} from 'framer-motion'

function OwnReviewCard(props) {

    const star = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 24 24"
          className="starICO2"
          viewBox="0 0 24 24"
          fill="#000000"
        >
          <g>
            <path d="M0,0h24v24H0V0z" fill="none" />
            <path d="M0,0h24v24H0V0z" fill="none" />
          </g>
          <g>
            <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
          </g>
        </svg>
      );

  return (
    <motion.div className='OwnCard' whileHover={{scale : 1.04 , transition : {duration : 0.5}}}>
        <div className="wrapper125">
            <div className="wrapper126">
                <div className="name126">
                    {props.name}
                </div>
                <div className="rating126">
                    {star} {props.rating}
                </div>
            </div>
            <div className="sizedBox"></div>
            <div className="wrapper127">
                <div className="message127">
                    {props.message}
                </div>
            </div>
        </div>
    </motion.div>
  )
}

export default OwnReviewCard
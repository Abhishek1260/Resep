import React from 'react';
import Subheading from '../subheading/Subheading';
import './Heading.css'

function Heading(props) {

  return <div className = "Heading">
    <div className="heading">
      {props.title}
      {props.yes ? <Subheading title = {props.title2}></Subheading> : null}
    </div>
    <div className="buttonForHeading">
      {props.button === "true" ? <a className='AddReviewButton' onClick = {props.onClick}>Add</a> : null }
    </div>
  </div>;
}

export default Heading;

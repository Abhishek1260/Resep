import React from 'react';
import './Subheading.css';

function Subheading(props) {
  return <section className = 'SubHeading'>
      {props.title}
  </section>;
}

export default Subheading;

import React from 'react';
import './Carousel.css'

function Carousel() {
    var slideIndex = 1;

    window.onload = () => {
        showSlides(slideIndex);
    }

    const plusSlides = (n) => {
        slideIndex += n;
        console.log(slideIndex);
        showSlides(slideIndex)
    }

    function currentSlide(n) {
        showSlides(n);
    }

    const showSlides = async (n) => {
        var i;
        var slides = document.querySelectorAll(".fade")
        var dots = document.querySelectorAll('.dot')
        slideIndex = n;
        if (slides.length ===  0) {
            return;
        }
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        for (i = 0 ; i < slides.length ; i++) {
            slides[i].style.display = 'none';
        }
        for (i = 0 ; i < slides.length ; i++ ){
            dots[i].className = dots[i].className.replace('active' , "")
        }
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].style.className = 'active';
        
    }

    setInterval(() => plusSlides(1), 10000)


  return <div className = "caro"> 
    <div className = "slideshow-container">
        <div className="mySlides fade">
            <img src = "https://rukminim1.flixcart.com/flap/1688/280/image/1c509497b712a280.jpg?q=50" className = "CARO" alt="1" />
        </div>
        <div className="mySlides fade">
            <img src = "https://rukminim1.flixcart.com/flap/1688/280/image/17b0a55e35867de0.jpg?q=50"  className = "CARO"alt="1" />
        </div>
        <div className="mySlides fade">
            <img src= "https://rukminim1.flixcart.com/flap/1688/280/image/c4577f070c07351b.jpg?q=50"  className = "CARO"alt="1" />
        </div>
        <div className="mySlides fade">
            <img src= "https://rukminim1.flixcart.com/flap/1688/280/image/bcacdecf18f3d9e6.jpg?q=50"  className = "CARO"alt="1" />
        </div>
        <div className="mySlides fade">
            <img src="https://rukminim1.flixcart.com/flap/1688/280/image/2516201758433d02.jpeg?q=50"  className = "CARO"alt="1" />
        </div>
        <div className="mySlides fade">
            <img src="https://rukminim1.flixcart.com/flap/1688/280/image/3e80faa1c1eb0a4b.jpg?q=50"  className = "CARO"alt="1" />
        </div>
        <a className="prev" onClick={() => {plusSlides(-1)}}>&#10094;</a>
        <a className="next" onClick={() => {plusSlides(+1)}}>&#10095;</a>
    </div>
    <br />
    <div className="textAlign">
        <span className = "dot" onClick = {() => {currentSlide(1)}}></span>
        <span className = "dot" onClick = {() => {currentSlide(2)}}></span>
        <span className = "dot" onClick = {() => {currentSlide(3)}}></span>
        <span className = "dot" onClick = {() => {currentSlide(4)}}></span>
        <span className = "dot" onClick = {() => {currentSlide(5)}}></span>
        <span className = "dot" onClick = {() => {currentSlide(6)}}></span>
    </div>
  </div>
}

export default Carousel;

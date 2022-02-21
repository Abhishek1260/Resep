import React, { useEffect } from 'react';
import './Carousel1.css';

function Carousel1() {
    
    useEffect(() => {
        document.body.style.overflowX = "scroll"
    }, []);
    

    let slideIndex1 = 0;

    window.onload(() => {
        slidesChange(slideIndex1)
    })

    const slidesChange = (n) => {
        let slides = document.querySelectorAll('.leftSide1')
        let slidesText = document.querySelectorAll('.rightSide1')
        slideIndex1 = n
        if (slides.length === 0 || slidesText.length === 0) {
            return;
        }
        console.log(slidesText)
        for (let i = 0 ; i < slides.length; i++) {
            slides[i].classList.add("none")
            slidesText[i].classList.add('none')
        }
        if (n > slides.length - 1) {
            slideIndex1 = 0;
        }
        slides[slideIndex1].classList.remove("none")
        slidesText[slideIndex1].classList.remove("none")
    }

    setInterval(() => {
        slidesChange(slideIndex1 += 1)
    }, 5000);

  return <div className = "carosel1"> 
    <div className="caro1">
        <div className="leftSide1 0">
            <img className = "imageForCaro2" src= {require("../../series/sammy-service-support.png")} alt="" />
        </div>
        <div className="rightSide1 0">
            <div className="object1">
                <div className="para1">
                    Seller <span className = "highLights">Places</span> the Ad
                </div>
                <div className="para2Wrap">
                    <div className="para2">
                        Seller's from All over <span className="highLights">India</span> Places Ads for their products on Resep.
                    </div>
                </div>
            </div>
        </div>
        <div className="leftSide1 none 1">
        <img className = "imageForCaro2" src= {require("../../series/sammy-blockchain.png")} alt="" />
        </div>
        <div className="rightSide1 none 1">
            <div className="object1">
                <div className="para1">
                    Resep checks the products <span className = "highLights">Authenticity</span>.
                </div>
                <div className="para2Wrap">
                    <div className="para2">
                        The product is then <span className="highLights">Tested</span> so that the product that reaches you is perfectly working.
                    </div>
                </div>
            </div>
        </div>
        <div className="leftSide1 none 2">
        <img className = "imageForCaro2" src= {require("../../series/sammy-delivery-1.png")} alt="" />
        </div>
        <div className="rightSide1 none 2">
            <div className="object1">
                <div className="para1">
                    Delivery Guy <span className = "highLights">Receives</span> the Product.
                </div>
                <div className="para2Wrap">
                    <div className="para2">
                        The product is picked from the seller so it reaches you <span className="highLights">Safely</span>.
                    </div>
                </div>
            </div>
        </div>
        <div className="leftSide1 none 3">
        <img className = "imageForCaro2" src= {require("../../series/sammy-greentech.png")} alt="" />
        </div>
        <div className="rightSide1 none 3">
            <div className="object1">
                <div className="para1">
                    You enjoy the product with 6 months <span className = "highLights">Warranty</span>.
                </div>
                <div className="para2Wrap">
                    <div className="para2">
                        Yes, we will provide you 6 months <span className="highLights">Warranty</span> on your product.
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>;
}

export default Carousel1;

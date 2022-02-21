import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading2 from "../../Heading2/Heading2";
import Heading from "../../heading/Heading";
import OwnReviewCard from "../OwnReviewCard/OwnReviewCard";
import ReviewSendForm from "../../ReviewSendForm/ReviewSendForm";
import "./ProductPage.css";
import gsap from "gsap";
import { filterProps } from "framer-motion";

function ProductPage(props) {
  const [on, seton] = useState(false);
  

  const [MyReview, setMyReview] = useState({
    name: "",
    rating: "",
    message: "",
  });

  const [OtherReviews, setOtherReviews] = useState([]);

  const cart = (
    <svg
      className="shoppingSVG"
      xmlns="http://www.w3.org/2000/svg"
      height="20px"
      viewBox="0 0 24 24"
      width="20px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4l-3.87 7H8.53L4.27 2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2z" />
    </svg>
  );

  const bag = (
    <svg
      className="shoppingSVG buySVG"
      xmlns="http://www.w3.org/2000/svg"
      enable-background="new 0 0 24 24"
      height="20px"
      viewBox="0 0 24 24"
      width="20px"
      fill="#000000"
    >
      <g>
        <rect fill="none" height="24" width="24" />
        <path d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z" />
      </g>
    </svg>
  );

  const navigate = useNavigate();

  console.log(props.data.name);

  useEffect(async () => {
    console.log("props");
    if (props.data.name === undefined) {
      navigate("/");
    }
    const response2 = await fetch(
      `http://localhost:8000/api/v2/product/review/get/${props.data._id}`,
      {
        method: "PUT",
      }
    );
    const result2 = await response2.json();
    if (result2.success) {
      setOtherReviews(result2.review);
    }
    const response1 = await fetch(
      `http://localhost:8000/api/v2/product/review/get/${props.data._id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
        }),
      }
    );
    const result1 = await response1.json();
    console.log(result1)
    if (result1.success) {
      setMyReview({
        name: result1.review.name,
        rating: result1.review.rating,
        message: result1.review.message,
      });
    }
    const response = await fetch(
      `http://localhost:8000/api/v1/user/wishlist/check/${props.data._id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
        }),
      }
    );
    const result = await response.json();
    if (result.success) {
      setdata(true);
      document.querySelector(".heart").style.fill = "red";
    } else {
      setdata(false);
      document.querySelector(".heart").style.fill = "rgba(0 , 0 , 0 , 0.2)";
    }
  }, []);

  const NavigateToBuy = async () => {
    const response = await fetch(
      `http://localhost:8000/api/v1/user/buynow/add/${props.data._id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          quantity: 1,
        }),
      }
    );
    const result = await response.json();
    if (result.success) {
      console.log(result);
      navigate("/product/buy");
    }
  };

  const reveal = () => {
    if (!on) {
      document.querySelector(".SendFormReview").style.opacity = "0";
      document.querySelector(".SendFormReview").style.display = "flex";
      gsap.to(".SendFormReview", { opacity: 1, duration: 1 });
      seton(true);
    } else {
      document.querySelector(".SendFormReview").style.opacity = "1";
      gsap.to(".SendFormReview", { opacity: 0, duration: 1 });
      setTimeout(() => {
        document.querySelector(".SendFormReview").style.display = "none";
      }, 1000);
      seton(true);
    }
  };

  const [data, setdata] = useState(false);

  const wishlistAdder = async () => {
    if (data) {
    } else {
      const response = await fetch(
        `http://localhost:8000/api/v1/suser/wishlist/add/${props.data._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "sapplication/json" },
          body: JSON.stringify({
            token: localStorage.getItesm("token"),
          }),
        }
      );
      const result = await response.jsson();
      if (result.success) {
        setdata(true);
        document.querySelector(".hearts").style.fill = "red";
      }
    }
  };

  const heart = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      className="heart"
      fill="#000000"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );

  const star = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enable-background="new 0 0 24 24"
      className="starICO"
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

  const AddToCart = async () => {
    const response = await fetch(
      `http://localhost:8000/api/v1/user/cart/add/${props.data._id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
        }),
      }
    );
    const result = await response.json();
    console.log(result);
    if (result.success) {
      document.querySelector(".cart").innerHTML = "Added To Cart";
    }
  };

  const changeImage = (n) => {
    console.log("this is the page");
    for (let i = 0; i < 6; i++) {
      document
        .querySelector(`.photoImage${i}`)
        .classList.replace("active", "none");
    }
    document.querySelector(`.photoImage${n}`).classList.replace('none' , 'active')
    for (let i = 0 ; i < 6 ; i++) {
      document.querySelector(`.tag${i}`).style.backgroundColor = "rgba(0 , 0 , 0 , 0.2)"
    }
    document.querySelector(`.tag${n}`).style.backgroundColor = "rgba(0 , 0 , 0 , 0.7)"
  };

  return (
    <div className="ProductPage">
      <div className="top1">
        <div className="top2">
          <div className="image24">
            <img
              src={props.data.images ? props.data.images[0].url : ""}
              className="photo1 active photoImage0"
              alt=""
            />
            <img
              src={props.data.images ? props.data.images[1].url : ""}
              className="photo1 none photoImage1"
              alt=""
            />
            <img
              src={props.data.images ? props.data.images[2].url : ""}
              className="photo1 none photoImage2"
              alt=""
            />
            <img
              src={props.data.images ? props.data.images[3].url : ""}
              className="photo1 none photoImage3"
              alt=""
            />
            <img
              src={props.data.images ? props.data.images[4].url : ""}
              className="photo1 none photoImage4"
              alt=""
            />
            <img
              src={props.data.images ? props.data.images[5].url : ""}
              className="photo1 none photoImage5"
              alt=""
            />
            <div className="wishlistICO">{heart}</div>
            <div className="tags">
              <div
                className="circleTags tag0"
                onClick={() => {
                  changeImage(0);
                }}
              ></div>
              <div
                className="circleTags tag1"
                onClick={() => {
                  changeImage(1);
                }}
              ></div>
              <div
                className="circleTags tag2"
                onClick={() => {
                  changeImage(2);
                }}
              ></div>
              <div
                className="circleTags tag3"
                onClick={() => {
                  changeImage(3);
                }}
              ></div>
              <div
                className="circleTags tag4"
                onClick={() => {
                  changeImage(4);
                }}
              ></div>
              <div
                className="circleTags tag5"
                onClick={() => {
                  changeImage(5);
                }}
              ></div>
            </div>
          </div>
          <div className="wrapper8">
            <div className="productNameMain">{props.data.name}</div>
            <div className="wrapper9">
              <div className="reviewsMain">
                {star} {props.data.productStarts}
              </div>
              <div className="NoReviewsMain">
                {props.data.numOfReviews} Reviews
              </div>
            </div>
            <div className="condition">Just Unboxed</div>
            <div className="price">
              <span className="blue"></span>&#8377; {props.data.price}
            </div>
            <div className="image26">
              <button
                className="AddToCart"
                onClick={() => {
                  AddToCart();
                }}
              >
                <div className="cart">Add To Cart {cart}</div>
              </button>
              <div className="sizedBox"></div>
              <button
                className="BuyNow"
                onClick={() => {
                  NavigateToBuy();
                }}
              >
                <div className="cart buy">Buy Now {bag}</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="sizedBox"></div>
      <Heading2 title="Description" />
      <div className="sizedBox"></div>
      <div className="descri">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus
        harum tenetur, ullam odit praesentium, nisi maiores quis velit
        distinctio totam placeat modi iusto, dignissimos delectus temporibus
        eaque quos rerum ut. Vero exercitationem velit accusantium blanditiis
        molestias impedit ipsum, veniam, nesciunt doloremque consequatur
        corrupti non repellat delectus dicta aspernatur quidem laudantium eaque.
        Dicta officia provident nobis nemo beatae dolor fuga illum, eos
        accusantium. Corrupti, deserunt delectus facere velit temporibus
        laboriosam nemo obcaecati possimus a qui quos reiciendis quia voluptatum
        inventore at sunt molestias fugit magnam. Minus quo, optio magnam non
        debitis ipsum itaque nulla corrupti expedita ducimus quidem?
        Perspiciatis quaerat id illo? Eos, ipsum provident temporibus sunt ipsa
        iusto soluta repellendus ipsam recusandae obcaecati quod et! Quis
        aperiam voluptas expedita nam asperiores optio doloribus nihil? Nisi
        accusamus explicabo vel. Autem vel, officia asperiores placeat
        perferendis, animi sint blanditiis amet doloremque sapiente rerum
        nesciunt id saepe ducimus beatae! Neque nostrum consequuntur, ab
        suscipit impedit dignissimos obcaecati facilis sapiente, doloribus
        aliquid debitis libero quaerat velit minus! Corporis ea nostrum vitae,
        autem, expedita dolorem doloremque dignissimos amet totam consequuntur
        nemo aspernatur tempore cupiditate ullam itaque est suscipit sed
        sapiente esse dolores perferendis nulla. Quisquam, sequi? Beatae eius
        nulla minus voluptas, maiores fugiat quidem modi sit consequatur totam?
        Corporis expedita aliquam, fugit neque quod alias eaque recusandae eos
        delectus perferendis architecto, omnis ullam quibusdam quam sunt nobis
        laboriosam quia provident voluptatibus fuga sed? Delectus et, obcaecati
        harum sequi quo ex, at nisi pariatur explicabo perferendis, quibusdam
        excepturi. Totam, reiciendis? Illo incidunt explicabo totam velit harum
        corporis reiciendis voluptatibus placeat accusamus est quod repellat
        dolor molestiae aliquid facere, perspiciatis impedit eveniet? Magni
        voluptatibus sapiente dolores, harum aliquam porro repellendus at quidem
        illum perspiciatis voluptatem animi accusantium eius reprehenderit
        ducimus consequuntur sint delectus nemo saepe, nostrum voluptas dolorem
        ipsum! Minima, expedita. Tenetur consequuntur repudiandae ducimus
        maiores illo!
      </div>
      <div className="sizedBox"></div>
      <Heading2 title="Reviews" />
      <div className="sizedBox"></div>
      <div className="CardForOwnReview">
        {MyReview.message !== "" ? (
          <>
            <Heading title="Your Reviews" />
            <OwnReviewCard
              name={MyReview.name}
              rating={MyReview.rating}
              message={MyReview.message}
            />
          </>
        ) : (
          <>
            <Heading
              title="Add a Review "
              button={"true"}
              data="Add"
              onClick={reveal}
            />
            <ReviewSendForm
              id={props.data._id}
              setMyReview={setMyReview}
              setOtherReview={setOtherReviews}
            />
          </>
        )}
      </div>
      <div className="allreviews">
        {OtherReviews.length !== 0 ? (
          <Heading title="Other Reviews" />
        ) : (
          <Heading
            title="No Reviews To Show"
            onClick={() => {
              reveal();
            }}
          />
        )}
      </div>
      <div className="allreviewCard">
        {OtherReviews.length !== 0 &&
          OtherReviews.map((MyReview) => {
            return (
              <OwnReviewCard
                name={MyReview.name}
                rating={MyReview.rating}
                message={MyReview.message}
              />
            );
          })}
      </div>
    </div>
  );
}

export default ProductPage;

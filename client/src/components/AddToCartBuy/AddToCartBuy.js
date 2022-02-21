import React, { useEffect, useState } from "react";
import BuyNowAddressCard from "../buyNowProductPage/BuyNowCardAddress/BuyNowAddressCard";
import BuyNowCardsProducts from "../buyNowProductPage/BuyNowCardProducts/BuyNowCardsProducts";
import PaymentReceived from "../PaymentReceived/PaymentReceived";
import "./AddToCartBuy.css";

function AddToCartBuy() {
  const [data, setdata] = useState([]);
  const [price, setPrice] = useState(0);
  const [Dprice, setDprice] = useState(200);
  const [Tprice, setTprice] = useState(0);

  useEffect(async () => {
    syncPrice();
    syncProducts();
  }, []);

  const syncProducts = async () => {
    const response1 = await fetch(
      "http://localhost:8000/api/v1/user/cart/get",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
        }),
      }
    );
    const result1 = await response1.json();
    console.log(result1);
    if (result1.success) {
      setdata(result1.products);
    }
  };

  const syncPrice = async () => {
    const response2 = await fetch(
      `http://localhost:8000/api/v1/user/cartItems/price/${localStorage.getItem(
        "token"
      )}`,
      {
        method: "POST",
      }
    );
    const result2 = await response2.json();
    if (result2.success) {
      setPrice(result2.price);
      document.querySelector(".wrapper70").innerHTML = result2.price;
      document.querySelector(".wrapper72").innerHTML = 200;
      document.querySelector(".wrapper75").innerHTML = result2.price + 200;
    }
  };

  const loadScript = async (src) => {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

const [price11, setprice11] = useState(0)
const [data12, setdata12] = useState({})
const [change, setchange] = useState(false)

const displayRazorpay = async () => {
  const response = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
  if (!response) {
      alert("there is some error with razorpay")
      return;
  }
  const response2 = await fetch('http://localhost:8000/api/v4/checkout/payment/multiple' , {
      method : "POST" , 
      headers : {
          "Content-Type" : "application/json"
      } ,
      body : JSON.stringify({
          token : localStorage.getItem('token')
      })
  })
  const result2 = await response2.json()
  console.log(result2)
  if (!result2.success) {
      alert("theres some internal server error")
      return
  }
  const {order} = result2;
  setprice11(order.amount / 100)
  const response3 = await fetch('http://localhost:8000/api/v4/checkout/payment/getAPIkey' , {
      method : "POST"
  })
  const result3 = await response3.json()
  const {key} = result3
  const options = {
      key : key ,
      amount : order.amount.toString() ,
      currency : order.currency ,
      name : "Resep" ,
      description : `${data[0].name} payment` ,
      order_id : order.id ,
      handler : async (response) => {
          const data1 = {
              orderCreationId: order.id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
          };
          setdata12(data1)
          const response4 = await fetch('http://localhost:8000/api/v4/checkout/payment/check' , {
            method : "POST" , 
            headers : {"Content-Type" : "application/json"} ,
            body : JSON.stringify({
              orderCreationId : data1.orderCreationId,
              razorpayPaymentId : data1.razorpayPaymentId,
              razorpayOrderId : data1.razorpayOrderId,
              razorpaySignature : data1.razorpaySignature ,
              token : localStorage.getItem('token')
            })
          })
          const result4 = await response4.json()
          console.log(result4)
          if (result4.success) {
              const reponse5 = await fetch(`http://localhost:8000/api/v1/user/order/add` , {
                  method : "POST" , 
                  headers : {"Content-Type" : "application/json"} ,
                  body : JSON.stringify({
                      orderID : data1.razorpayOrderId ,
                      token : localStorage.getItem('token') ,
                      data : data
                  })
              })
              const result5 = await reponse5.json()
              console.log(result5)
              if (result5.success) {
                console.log('i am here')
                  const response6 = await fetch('http://localhost:8000/api/v6/orders/add' , {
                    method : "POST" ,
                    headers : {"Content-Type" : "application/json"} ,
                    body : JSON.stringify({
                      orderID : data1.razorpayOrderId , 
                      token : localStorage.getItem('token') ,
                      data : data
                    })
                  })
                  const result6 = await response6.json();
                  if (result6.success) {
                    setchange(true)
                  }
              }
          }
      },
  }
  const paymentObject = new window.Razorpay(options)
  paymentObject.open()
}


  return (
    <>
    {change ? (<PaymentReceived price = {price11} name = {"Cart"} orderID = {data12.razorpayOrderId}/>) : (
    <div className="AddToCartBuy">
      <div className="AddToCartBuyLeftSide">
        <div className="wrapper451">
          <BuyNowAddressCard />
          {data.map((event) => {
            return (
              <BuyNowCardsProducts
                syncPrice={syncPrice}
                buyNow={false}
                id={event._id}
                photo={event.mainPhoto}
                name={event.name}
                price={event.price}
                quantity={event.quantity}
                syncProducts={syncProducts}
              />
            );
          })}
        </div>
      </div>
      <div className="AddToCartBuyRightSide">
        <div className="wrapper450">
          <div className="BuyNowRightSideTop">
            <div className="wrapper67">Price List</div>
          </div>
          <div className="BuyNowRightSideMiddle">
            <div className="wrapper68">
              <div className="content1">
                <div className="wrapper69">Price:</div>
                <div className="wrapper70">0</div>
              </div>
              <div className="content2">
                <div className="wrapper71">Delivery Charge:</div>
                <div className="wrapper72">0</div>
              </div>
            </div>
          </div>
          <div className="BuyNowRightSideBottom">
            <div className="wrapper73">
              <div className="content1">
                <div className="wrapper74">Total Payable:</div>
                <div className="wrapper75">0</div>
              </div>
            </div>
          </div>
          <div className="ProceedToCheckoutdiv">
            <a className="ProceedToCheckoutdiva" onClick={() => {displayRazorpay()}}>Proceed to Checkout</a>
          </div>
        </div>
      </div>
    </div>)}
    </>
  );
}

export default AddToCartBuy;

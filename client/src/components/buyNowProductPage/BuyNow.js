import React, { useEffect, useState } from 'react'
import './BuyNow.css'
import { Link, useNavigate } from 'react-router-dom'
import BuyNowAddressCard from './BuyNowCardAddress/BuyNowAddressCard'
import BuyNowCardsProducts from './BuyNowCardProducts/BuyNowCardsProducts'
import PaymentReceived from '../PaymentReceived/PaymentReceived'

function BuyNow() {

    const navigate = useNavigate()

    const [data, setdata] = useState([])
    const [price, setprice] = useState(0)
    const [Dprice, setDprice] = useState(0)
    const [Tprice, setTprice] = useState(0)
    const [change, setchange] = useState(false)
    const [data12, setdata12] = useState({})
    const [price11 , setprice11] = useState(0)

    useEffect(async () => {
        const response = await fetch(`http://localhost:8000/api/v1/user/buynow/get/${localStorage.getItem("token")}` , {
            method : "PUT"
        })
        const result = await response.json()
        if (result.success) {
            setdata(result.product)
            var price1 = 0
            for (let i = 0 ; i < result.product.length ; i++) {
                setprice(price + result.product[i].price * result.product[i].quantity)
                price1 += result.product[i].price * result.product[i].quantity
            }
            setDprice(200)
            setTprice(price + Dprice)
            document.querySelector('.wrapper70').innerHTML = price1
            document.querySelector('.wrapper72').innerHTML = 200  
            document.querySelector('.wrapper75').innerHTML = price1 + 200  
        }
    }, [])

    const syncPrice = async () => {
        const response = await fetch(`http://localhost:8000/api/v1/user/buynow/get/${localStorage.getItem("token")}` , {
            method : "PUT"
        })
        const result = await response.json()
        if (result.success) {
            setdata(result.product)
            var price1 = 0
            for (let i = 0 ; i < result.product.length ; i++) {
                setprice(price + result.product[i].price * result.product[i].quantity)
                price1 += result.product[i].price * result.product[i].quantity
            }
            setDprice(200)
            setTprice(price + Dprice)
            document.querySelector('.wrapper70').innerHTML = price1
            document.querySelector('.wrapper72').innerHTML = 200  
            document.querySelector('.wrapper75').innerHTML = price1 + 200  
        }
    }

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

    const displayRazorpay = async () => {
        const response = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if (!response) {
            alert("there is some error with razorpay")
            return;
        }
        const response2 = await fetch('http://localhost:8000/api/v4/checkout/payment/process' , {
            method : "POST" , 
            headers : {
                "Content-Type" : "application/json"
            } ,
            body : JSON.stringify({
                itemID : data[0].id ,
                token : localStorage.getItem('token')
            })
        })
        const result2 = await response2.json()
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
                if (result4.success) {
                    const reponse5 = await fetch(`http://localhost:8000/api/v1/user/order/add/${data[0].id}` , {
                        method : "POST" , 
                        headers : {"Content-Type" : "application/json"} ,
                        body : JSON.stringify({
                            orderID : data1.razorpayOrderId ,
                            token : localStorage.getItem('token') ,
                            quantity : 1
                        })
                    })
                    const result5 = await reponse5.json()
                    if (result5.success) {
                        setchange(true)
                    }
                }
            },
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

  return (
    <>{change ? <PaymentReceived name = {data[0].name} price = {price11} orderID = {data12.razorpayOrderId} /> : (<div className = "buyNow">
    <div className="buyNowLeftSide">
        <div className="BuyNowLeftSideTop">
            <div className="wrapper78">
                <BuyNowAddressCard />
                {data.map((event) => {
                    return <BuyNowCardsProducts buyNow = {true} syncPrice = {syncPrice}id = {event._id} photo = {event.mainPhoto} name = {event.name} price = {event.price} quantity = {event.quantity}/>
                })}
            </div>
        </div>
    </div>
    <div className="BuyNowRightSide">
        <div className="wrapper66">
            <div className="BuyNowRightSideTop">
                <div className="wrapper67">
                    Price List
                </div>
            </div>
            <div className="BuyNowRightSideMiddle">
                <div className="wrapper68">
                    <div className="content1">
                        <div className="wrapper69">
                            Price:
                        </div>
                        <div className="wrapper70">
                            0
                        </div>
                    </div>
                    <div className="content2">
                        <div className="wrapper71">
                            Delivery Charge:
                        </div>
                        <div className="wrapper72">
                            0
                        </div>
                    </div>
                </div>
            </div>
            <div className="BuyNowRightSideBottom">
                <div className="wrapper73">
                    <div className="content1">
                        <div className="wrapper74">
                            Total Payable:
                        </div>
                        <div className="wrapper75">
                            0
                        </div>
                    </div>
                </div>
            </div>
            <div className="ProceedToCheckoutdiv">
                <a className='ProceedToCheckoutdiva' onClick = {() => {displayRazorpay()}}>Proceed to Checkout</a>
            </div>
        </div>
    </div>
</div>)}</>
  )
}

export default BuyNow
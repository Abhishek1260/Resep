import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './BuyNowCardsProducts.css'

function BuyNowCardsProducts(props) {

    const [svgChanger, setsvgChanger] = useState(false)
    const [value1, setvalue1] = useState(props.quantity)

    const edit = (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/></svg>)
    const del = (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>)
    const ticker = (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>)
    
    const navigate = useNavigate()

    const editHandlerForAddToCart = async (string) => {
        if (svgChanger) {
            setsvgChanger(false)
            const value = parseInt(document.querySelector(`.a${string}container`).textContent)
            setvalue1(value)
            console.log(props.id)
            const response = await fetch(`http://localhost:8000/api/v1/user/cart/update/${props.id}` , {
                method : "POST" , 
                headers : {"Content-Type" : "application/json"} ,
                body : JSON.stringify({
                    token : localStorage.getItem('token') ,
                    quantity : value
                })
            })
            const result = await response.json()
            console.log(result)
            if (result.success) {
                props.syncPrice()
                props.syncProducts()
                document.querySelector(`.a${string}selector`).style.display = 'none'
                document.querySelector(`.a${string}`).style.display = 'flex'
            }
        }
        else {
            setsvgChanger(true)
            document.querySelector(`.a${string}selector`).style.display = 'flex'
            document.querySelector(`.a${string}`).style.display = 'none'
        }
    }

    const deleteHandlerForAddToCart = async () => {
        const response = await fetch(`http://localhost:8000/api/v1/user/cart/remove/${props.id}` , {
            method : "POST" , 
            headers : {"Content-Type" : "application/json"} ,
            body : JSON.stringify({
                token : localStorage.getItem('token')
            })
        })
        const result = await response.json()
        if (result.success) {
            props.syncProducts()
            props.syncPrice()
        }
    }

    const editHandler = async () => {
        if (svgChanger) {
            setsvgChanger(false)
            const value = parseInt(document.querySelector('.containerElement2').textContent)
            setvalue1(value)
            const response = await fetch(`http://localhost:8000/api/v1/user/buynow/update/${props.id}` , {
                method : "POST" , 
                headers : {"Content-Type" : "application/json"} ,
                body : JSON.stringify({
                    quantity : value ,
                    token : localStorage.getItem('token')
                })
            })
            const result = await response.json();
            if (result.success) {
                props.syncPrice()
                document.querySelector('.quantityFirstSelector').style.display = 'none'
                document.querySelector('.quantityFirst').style.display = 'flex'
            }
        }
        else {
            setsvgChanger(true)
            document.querySelector('.quantityFirstSelector').style.display = 'flex'
            document.querySelector('.quantityFirst').style.display = 'none'
        }
    }

    const deleteHandler = async () => {
        const reponse = await fetch(`http://localhost:8000/api/v1/user/buynow/remove/${localStorage.getItem('token')}` , {
            method : "PUT"
        })
        const result = await reponse.json()
        if (result.success) {
            navigate('/')
        }
    }

    const changeQuantity = (n) => {
        if (props.buyNow) {
            let value = document.querySelector('.containerElement2').textContent
            value = parseInt(value)
            if (n === +1) {
                value += 1;
                console.log(value)
                document.querySelector('.containerElement2').innerHTML = value
            }
            else {
                value -= 1;
                if (value >= 1) {
                    document.querySelector('.containerElement2').innerHTML = value
                }
                else {
                    value = 1;
                }
            }
        }
        else {
            let value = document.querySelector(`.a${props.id}container`).textContent
            value = parseInt(value)
            if (n === +1) {
                value += 1;
                console.log(value)
                document.querySelector(`.a${props.id}container`).innerHTML = value
            }
            else {
                value -= 1;
                if (value >= 1) {
                    document.querySelector(`.a${props.id}container`).innerHTML = value
                }
                else {
                    value = 1;
                }
            }
        }
    }



  return (
    <div className='BuyNowCardsProducts'>
        <div className="wrapper79">
            <div className="image79">
                <img src= {props.photo} className = "photo1" alt="" />
            </div>
            <div className="wrapper80">
                <div className="productNameFirst">
                    {props.name}
                </div>
                <div className="priceFirst">
                    {props.price}
                </div>
                <div className = {`quantityFirst a${props.id}`}>
                    <span className="wrapper81">
                        Quantity : 
                    </span>
                    <span> </span>
                    <span className="wrapper82">
                        {value1}
                    </span>
                </div>
                <div className={`quantityFirstSelector a${props.id}selector`}>
                    <div className="containerElement1" onClick = {() => {changeQuantity(-1)}}>
                        -
                    </div>
                    <div className={`containerElement2 a${props.id}container`}>
                        1
                    </div>
                    <div className="containerElement3" onClick = {() => {changeQuantity(+1)}}>
                        +
                    </div>
                </div>
            </div>
            <div className="wrapper83">
                <div className="wrapper460">
                    <div className="editTheBuyNowProduct" onClick = {() => {props.buyNow ? editHandler() : editHandlerForAddToCart(props.id)}}>
                    {svgChanger ? ticker : edit}
                    </div>
                    <div className="deleteTheBuyNowProduct" onClick={() => {props.BuyNow ? deleteHandler() : deleteHandlerForAddToCart()}}>
                    {del}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BuyNowCardsProducts
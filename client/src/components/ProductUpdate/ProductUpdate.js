import React, { useEffect, useState } from "react";
import Heading2 from "../Heading2/Heading2";
import "./ProductUpdate.css";

function ProductUpdate(props) {
  const [data, setdata] = useState({});
    const [color1, setcolor1] = useState('rgb(127 , 127 , 127))')
    const [color2, setcolor2] = useState('rgb(127 , 127 , 127))')
    const [color3, setcolor3] = useState('rgb(127 , 127 , 127))')
    const [color4, setcolor4] = useState('rgb(127 , 127 , 127))')
    const [color5, setcolor5] = useState('rgb(127 , 127 , 127))')
    const [color6, setcolor6] = useState('rgb(127 , 127 , 127))')
  const [trueFalse, settrueFalse] = useState(false)
    const [buttonData, setbuttonData] = useState("")
    const [buttonState, setbuttonState] = useState(false)

    const changeState = () => {
        if (!buttonState) {
            setbuttonData("Shipped")
            document.querySelector('.wrapper808').style.color = 'white'
            document.querySelector('.wrapper808').style.backgroundColor = 'rgb(21, 58, 91)'
            setbuttonState(true)
        } else {
            setbuttonData("")
            document.querySelector('.wrapper808').style.color = 'black'
            document.querySelector('.wrapper808').style.backgroundColor = 'white'
            setbuttonState(false)
        }
    }

  useEffect(async () => {
    const response = await fetch(
      `http://localhost:8000/api/v6/order/get/${props.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          paymentID: props.payment
        }),
      }
    );
    const result = await response.json();
    console.log(result)
    if (result.success) {
      setdata(result.order);
      settrueFalse(true)
      console.log(result)
      if (result.order.status === 'Ordered') {
        setcolor1('limegreen')
        setcolor4('limegreen')
      }
      if (result.order.status === "Shipped") {
        setcolor1('limegreen')
        setcolor4('limegreen')
        setcolor2('limegreen')
        setcolor5('limegreen')
      }
      if (result.order.status === "Delivered") {
        setcolor1('limegreen')
        setcolor4('limegreen')
        setcolor2('limegreen')
        setcolor5('limegreen')
        setcolor3('limegreen')
        setcolor6('limegreen')
      }
    }
  }, []);

  const submitHandler = async () => {
       const response = await fetch(`http://localhost:8000/api/v6/order/update/shipped/${props.id}` , {
           method : "POST" , 
           headers : {
               "Content-Type" : "application/json"
           } ,
           body : JSON.stringify({
               token : localStorage.getItem('token') ,
               paymentID : data.PaymentID ,
               user1 : props.user
           })
       })
       const result = await response.json();
       console.log(result)
  }

  return (
    <div className="ProductUpdate">
      <Heading2 title={data.name} />
      <div className="container800">
        <div className="wrapper803">
          <div className="wrapper800">
            <div className="wrapper801">
              <div className="wrapper803">
                <div className="OrderIdProductUpdateHeading ProductUpdateHeading">
                  Order Id
                </div>
                <div className="OrderIdProductUpdateContent">
                  <div className="OrderIdProductUpdate AddressProductPageLines">
                    {data.PaymentID}
                  </div>
                </div>
              </div>
            </div>
            <div className="wrapper802">
              <div className="wrapper803">
                <div className="AddressProductUpdateHeading ProductUpdateHeading">
                  Address
                </div>
                <div className="AddressProductUpdate">
                  <div className="flatNumberProductUpdate AddressProductPageLines">
                    A 1102 11th floor supertech rameshwar orchid
                  </div>
                  <div className="streetProductUpdate AddressProductPageLines">
                    Kaushambi, Ghaziabad
                  </div>
                  <div className="LandMarkProductUpdate AddressProductPageLines">
                    Near Yashoda Hospital , 201010
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lowerCardOrdersPage newProdcutUpdateCard">
            <div className="wrapper601">
              <div className="wrapper602">
                <div className="image601">
                  <img src={data.mainPhoto} className="photo1" alt="" />
                </div>
              </div>
              <div className="wrapper603">
                <div className="productNameOrdersPage">
                  {trueFalse ? data.name : "loading"}
                </div>
                <div className="priceOrdersPage">
                  {trueFalse ? data.price : "loading"}
                </div>
                <div className="conditionOrderspage">
                  {trueFalse ? data.condition : "loading"}
                </div>
                <div className="quantityOrdersPage">
                  <span>
                    Quantity : {trueFalse ? data.quantity : "loading"}
                  </span>
                </div>
              </div>
              <div className="wrapper604">
                <div className="orderedOrdersPage">
                  <div
                    className="orderedOrdersPageText"
                    style={{ color: `${color4}` }}
                  >
                    Ordered
                  </div>
                  <div className="wrapper605">
                    <div
                      className="circle orderedOrdersPageCircle"
                      style={{ backgroundColor: `${color1}` }}
                    ></div>
                    <div
                      className="bar1 orderedOrdersPageBar"
                      style={{ backgroundColor: `${color1}` }}
                    ></div>
                  </div>
                </div>
                <div className="orderedOrdersPage">
                  <div
                    className="orderedOrdersPageText"
                    style={{ color: `${color5}` }}
                  >
                    Shipped
                  </div>
                  <div className="wrapper605">
                    <div
                      className="circle orderedOrdersPageCircle"
                      style={{ backgroundColor: `${color2}` }}
                    ></div>
                    <div
                      className="bar1 orderedOrdersPageBar"
                      style={{ backgroundColor: `${color2}` }}
                    ></div>
                  </div>
                </div>
                <div className="orderedOrdersPage">
                  <div
                    className="orderedOrdersPageText"
                    style={{ color: `${color6}` }}
                  >
                    Delivered
                  </div>
                  <div className="wrapper605">
                    <div
                      className="circle orderedOrdersPageCircle"
                      style={{ backgroundColor: `${color3}` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="FormForProductUpdate">
              <div className="wrapper806">
                  <div className="wrapper807">
                      Change the status of the product to :
                  </div>
                  <div className="wrapper808" onClick={() => {changeState()}}>
                      Shipped
                  </div>
              </div>
          </div>
          <div className="submitButtonProductUpdate">
            {buttonState ? <a className="activeProductUpdate" onClick = {() => {submitHandler()}}>Submit</a> : <a className="disabledProductUpdate">Submit</a>}
          </div>    
        </div>
      </div>
    </div>
  );
}

export default ProductUpdate;

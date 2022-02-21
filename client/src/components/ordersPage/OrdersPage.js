import React, { useEffect, useState } from "react";
import "./OrdersPage.css";

function OrdersPage(props) {

    const [color1, setcolor1] = useState('rgba(127 , 127 , 127)')
    const [color2, setcolor2] = useState('rgba(127 , 127 , 127)')
    const [color3, setcolor3] = useState('rgba(127 , 127 , 127)')
    const [color4, setcolor4] = useState('rgba(127 , 127 , 127)')
    const [color5, setcolor5] = useState('rgba(127 , 127 , 127)')
    const [color6, setcolor6] = useState('rgba(127 , 127 , 127)')
    
    const getData = async () => {
        const response = await fetch(`http://localhost:8000/api/v1/user/order/get/${props.id}` , {
            method : "POST" ,
            headers : {"Content-Type" : "application/json"} ,
            body : JSON.stringify({
                token : localStorage.getItem('token')
            })
        })
        const result = await response.json()
        if (result.success) {
            setdata(result.product)
            settrueFalse(true)
            if (result.product.status === "Ordered") {
                setcolor1('limegreen')
                setcolor4('limegreen')
            }
            if (result.product.status === "Shipped") {
              setcolor1('limegreen')
              setcolor4('limegreen')
              setcolor2('limegreen')
              setcolor5('limegreen')
            }
            if (result.product.status === "Delivered") {
              setcolor1('limegreen')
              setcolor4('limegreen')
              setcolor2('limegreen')
              setcolor5('limegreen')
              setcolor3('limegreen')
              setcolor6('limegreen')
            }
        }
    }
    
    const [data, setdata] = useState([])
    const [trueFalse, settrueFalse] = useState(false)
    
    useEffect(() => {
        console.log("this is good")
        getData()
    }, [])
    

  return (
    <div className="OrdersPage">
      <div className="wrapper600">
        <div className="upperCardOrdersPage">
          <div className="upperCardOrdersPageHeading">Delivery Address</div>
          <br></br>
          <div className="upperCardOrdersPageAddressTop">Abhishek Bansal</div>
          <br />
          <div className="upperCardOrdersPageAddressBottom">
            <div className="upperCardOrdersPageAddressBottomFlatLine">
              A 1102 Supertech Rameswar Orchid ,
            </div>
            <div className="upperCardOrdersPageAddressBottomStreet">
              Kaushambi, Ghaziabad,
            </div>
            <div className="upperCardOrdersPageAddressBottomLandmark">
              Near Yashoda Hospital, 201010
            </div>
          </div>
        </div>
        <div className="lowerCardOrdersPage">
          <div className="wrapper601">
            <div className="wrapper602">
              <div className="image601">
                  <img src={data.mainPhoto} className = "photo1" alt="" />
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
                    <span>Quantity : {trueFalse ? data.quantity : "loading"}</span>
                </div>
            </div>
            <div className="wrapper604">
                <div className="orderedOrdersPage">
                    <div className="orderedOrdersPageText"  style = {{color : `${color4}`}}>
                        Ordered
                    </div>
                    <div className="wrapper605">
                        <div className="circle orderedOrdersPageCircle" style = {{backgroundColor : `${color1}`}}>
                
                        </div>
                        <div className="bar1 orderedOrdersPageBar" style = {{backgroundColor : `${color1}`}}>

                        </div>
                    </div>
                </div>
                <div className="orderedOrdersPage">
                    <div className="orderedOrdersPageText" style = {{color : `${color5}`}}>
                        Shipped
                    </div>
                    <div className="wrapper605">
                        <div className="circle orderedOrdersPageCircle" style = {{backgroundColor : `${color2}`}}>

                        </div>
                        <div className="bar1 orderedOrdersPageBar" style = {{backgroundColor : `${color2}`}}>

                        </div>
                    </div>
                </div>
                <div className="orderedOrdersPage">
                    <div className="orderedOrdersPageText" style = {{color : `${color6}`}}>
                        Delivered
                    </div>
                    <div className="wrapper605">
                        <div className="circle orderedOrdersPageCircle" style = {{backgroundColor : `${color3}`}}>

                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;

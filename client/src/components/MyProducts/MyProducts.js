import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading2 from "../Heading2/Heading2";
import MyProductCard from "./MyProductCard/MyProductCard";
import "./MyProducts.css";

function MyProducts() {
  const [data, setdata] = useState([]);

  const navigate = useNavigate();

  useEffect(async () => {
    const response = await fetch(
      `http://localhost:8000/api/v1/user/me/${localStorage.getItem("token")}`,
      {
        method: "PUT",
      }
    );
    const result = await response.json();
    if (result.user.role === "seller") {
      const response1 = await fetch(
        `http://localhost:8000/api/v3/seller/product/get/${localStorage.getItem(
          "token"
        )}`,
        {
          method: "GET",
        }
      );
      const result2 = await response1.json();
      if (result2.success) {
        setdata(result2.product);
        console.log(result2.product);
      }
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="MyProducts">
      <Heading2 title="My Products" />
      <div className="wrapper313">
        {data.map((event) => {
          return (
            <MyProductCard
              name={event.name}
              price={event.price}
              quality={event.quality}
              rating={event.rating}
              quality={event.quality}
              numOfReviews={event.numOfReviews}
              id={event._id} 
            setData = {setdata}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MyProducts;

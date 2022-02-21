import React, { useEffect, useState } from "react";
import Cards3 from "./Cards3/Cards3";
import "./Products.css";

function Products(props) {
  const [data, setdata] = useState([]);

  useEffect(async () => {
    if (localStorage.getItem("search") !== "") {
      console.log("1");
      console.log(localStorage.getItem("search"));
      const response = await fetch(
        `http://localhost:8000/api/v2/product/get?keyword=${localStorage.getItem(
          "search"
        )}`,
        {
          method: "GET",
        }
      );
      const result = await response.json();
      if (result.success) {
        setdata(result.products);
      }
    } else if (localStorage.getItem("category") === "all") {
      console.log("2");
      const response = await fetch("http://localhost:8000/api/v2/product/get", {
        method: "GET",
      });
      const result = await response.json();
      if (result.success) {
        setdata(result.products);
      }
    } else {
      const response = await fetch(
        `http://localhost:8000/api/v2/product/find/${localStorage.getItem(
          "category"
        )}`,
        {
          method: "PUT",
        }
      );
      const result = await response.json();
      if (result.success) {
        setdata(result.products);
      }
    }
  }, []);

  return (
    <div className="Products">
      {data.map((event) => {
        return (
          <Cards3
          changeData = {props.changeData}
            id={event._id}
            name={event.name}
            price={event.price}
            stars={event.productStarts}
            reviews={event.numOfReviews}
          />
        );
      })}
    </div>
  );
}

export default Products;

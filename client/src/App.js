import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import gsap from "gsap";
import Heading from "./components/heading/Heading";
import Section from "./components/Section/Section";
import Section2 from "./components/section2/Section2";
import Heading2 from "./components/Heading2/Heading2";
import Carousel from "./components/carousel/Carousel";
import Carousel1 from "./components/carousel1/Carousel1";
import Section3 from "./components/section3/Section3";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Products from "./components/Products/products";
import ProductPage from "./components/ProductPage/ProductPageRedesigned/ProductPage";
import Profile from "./components/Profile/Profile";
import Orders from "./components/Orders/Orders";
import Section4 from "./components/section4/Section4";
import BuyNow from "./components/buyNowProductPage/BuyNow";
import Wishlist from "./components/wishlist/Wishlist";
import SellerLogin from "./components/SellerLogin/SellerLogin";
import MyProducts from "./components/MyProducts/MyProducts";
import AddProduct from "./components/AddProduct/AddProduct";
import Checkout from "./components/Checkout/Checkout";
import BottomPaymentBar from "./components/BottomPaymentBar/BottomPaymentBar";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CartWidget from "./components/CartWidget/CartWidget";
import Cart from "./components/Cart/Cart";
import AddToCartBuy from "./components/AddToCartBuy/AddToCartBuy";
import OrdersPage from "./components/ordersPage/OrdersPage";
import RecOrders from "./components/RecOrders/RecOrders";

function App() {
  const [APIKEY, setAPIKEY] = useState("");

  useEffect(async () => {
    const response = await fetch(
      "http://localhost:8000/api/v4/checkout/payment/getAPI",
      { method: "POST" }
    );
    const result = await response.json();
    if (result.success) {
      setAPIKEY(result.APIKEY);
    }
  }, []);

  gsap.registerPlugin("scrollTrigger");

  gsap.fromTo(".Heading", { opacity: 0 }, { duration: 0, opacity: 0 });

  gsap.to(".Heading", {
    scrollTrigger: {
      trigger: ".Heading",
      start: "top 80%",
      markers: true,
    },
    duration: 1,
    opacity: 1,
  });

  const [finder, setfinder] = useState("");
  const [products, setproducts] = useState("all");
  const [data, setdata] = useState({});
  const [id, setid] = useState("");

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar setData={setproducts} finder={setfinder} />
                <Carousel />
                <Heading title="Trending Products" yes={false} />
                <Section changeData={setdata} />
                <Heading
                  title="Mobiles"
                  yes={true}
                  title2="suggested for you"
                />
                <Section4 />
                <Heading
                  title="Furniture"
                  yes={true}
                  title2="suggested for you"
                />
                {/* <Section /> */}
                <Section3 changeData={setdata} />
                <Heading2 title="Who we are" />
                <Carousel1 />
                <CartWidget />
              </>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <>
                <Login />
                <Navbar />
                <Carousel />
                <Heading title="Trending Products" yes={false} />
                <Section />
                <Heading
                  title="Mobiles"
                  yes={true}
                  title2="suggested for you"
                />
                <Section2 />
                <Heading
                  title="Furniture"
                  yes={true}
                  title2="suggested for you"
                />
                {/* <Section /> */}
                <Section3 />
                <Heading2 title="Who we are" />
              </>
            }
          />
          <Route
            path="/products"
            element={
              <>
                <Navbar setData={setproducts} finder={setfinder} />
                <Products
                  product={products}
                  finder={finder}
                  changeData={setdata}
                />
                <CartWidget />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Navbar setData={setproducts} finder={setfinder} />
                <Profile />
                <CartWidget />
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <Navbar setData={setproducts} finder={setfinder} />
                <Orders setId = {setid}/>
              </>
            }
          />
          <Route
            path="/wishlist"
            element={
              <>
                <Navbar />
                <Wishlist changeData={setdata} />
              </>
            }
          />
          <Route
            path="/products/view"
            element={
              <>
                <Navbar setData={setproducts} finder={setfinder} />
                <ProductPage data={data} />
                <CartWidget />
              </>
            }
          />
          <Route
            path="product/buy"
            element={
              <>
                <Navbar />
                <BuyNow />
              </>
            }
          />
          <Route
            path="/seller/login"
            element={
              <>
                <SellerLogin />
                <Navbar />
                <Carousel />
                <Heading title="Trending Products" yes={false} />
                <Section />
                <Heading
                  title="Mobiles"
                  yes={true}
                  title2="suggested for you"
                />
                <Section2 />
                <Heading
                  title="Furniture"
                  yes={true}
                  title2="suggested for you"
                />
                {/* <Section /> */}
                <Section3 />
                <Heading2 title="Who we are" />
              </>
            }
          />
          <Route
            path="/MyProducts"
            element={
              <>
                <Navbar />
                <MyProducts />
                <CartWidget />
              </>
            }
          />
          <Route
            path="/AddProduct"
            element={
              <>
                <Navbar />
                <AddProduct />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Navbar />
                <Checkout />
                <BottomPaymentBar />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <Navbar />
                <Cart />
              </>
            }
          />
          <Route
            path="/cart/buy"
            element={
              <>
                <Navbar />
                <AddToCartBuy />
              </>
            }
          />
          <Route path = "/order/fulfil" element = {<><Navbar /><OrdersPage id = {id}/></>} />
          <Route path = '/order/received' element = {<><Navbar /><RecOrders /></>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

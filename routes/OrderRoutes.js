const express = require("express");
const JWT = require("jsonwebtoken");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config({ path: "../config/config.env" });
const Users = require("../models/userModel");
const Products = require("../models/productModel");
const Seller = require("../models/SellerModel");
const Order = require("../models/OrdersModel");
const OrdersModel = require("../models/OrdersModel");
const { findOne } = require("../models/OrdersModel");

//to add the product in the order model
router.post("/orders/add", async (req, res) => {
  try {
    const { token, data , orderID } = req.body;
    const id = JWT.decode(token, process.env.JWT_SECRET);
    const user = await Users.findById(id.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    const newArr = [];
    for (let i = 0; i < data.length; i++) {
      newArr.push({
        id: data[i].id,
        name: data[i].name,
        price: data[i].price,
        quantity: data[i].quantity,
        PaymentID: orderID,
        status: "Ordered",
        placedAt: Date.now(),
        mainPhoto: data[i].mainPhoto,
        condition: data[i].condition,
        user : id.id
      });
    }
    const order = await Order.insertMany(newArr)
    return res.status(200).json({success : true , message : "product updated"})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
});

//to update the status of the product from Ordered to shipper
router.post('/order/update/shipped/:id' , async (req , res) => {
    // try {
      console.log("i am here")
        const {token , paymentID , user1} = req.body
        const id = JWT.decode(token , process.env.JWT_SECRET)
        const user = await Users.findById(user1.toString())
        if (!user) {
            return res.status(404).json({success : false , message : "user not found"})
        }
        const order = await Order.findOne({id : req.params.id , PaymentID : paymentID})
        if (!order) {
            return res.status(404).json({success : false , message : "product not found"})
        }
        order.status = "Shipped"
        await order.save()
        const newArr = []
        console.log(user)
        console.log(newArr)
        console.log(user.orders.length)
        for (let i = 0 ; i < user.orders.length ; i++) {
          console.log(order.id.toString())
            if (order.id.toString() === user.orders[i].id.toString() && order.PaymentID === user.orders[i].PaymentID) {
              console.log("this is a good thing")  
              const newDict = {
                    condition : user.orders[i].condition ,
                    id : user.orders[i].id ,
                    name : user.orders[i].name ,
                    price : user.orders[i].price ,
                    quantity : user.orders[i].quantity ,
                    mainPhoto : user.orders[i].mainPhoto ,
                    status : "Shipped" ,
                    PaymentID : user.orders[i].PaymentID ,
                    placedAt : user.orders[i].placedAt
                }
                newArr.push(newDict)
            }
            else {
                newArr.push(user.orders[i])
            }
        }
        console.log(newArr + "this is a array")
        user.orders = newArr
        await user.save();
    // } catch (error) {
    //     return res.status(500).json({success : false , message : "internal server error"})
    // }
})

//to give the orders to the seller
router.post('/order/get' , async (req , res) => {
  try {
    const {token} = req.body
    const id = JWT.decode(token , process.env.JWT_SECRET)
    const user = await Users.findById(id.id)
    if (!user) {
      return res.status(404).json({success : false , message : "user not found"})
    }
    const seller = await Seller.findOne({email : user.email})
    if (!seller) {
      return res.status(404).json({success : false , message : "seller not found"})
    }
    const order = await Order.find()
    console.log(seller + "this is for seller")
    console.log(order + "this is for order")
    const newArr = []
    for (let i = 0 ; i < seller.products.length ; i++) {
      for (let j = 0 ; j < order.length ; j++) {
        if (seller.products[i].Productid.toString() === order[j].id.toString()) {
          newArr.push(order[j])
        }
      }

    }
    console.log(newArr)
    return res.status(200).json({success : true , product : newArr})
  } catch (error) {
    return res.status(500).json({success : false,  message : "internal server error"})
  }
})

//to get a particular order
router.post('/order/get/:id' , async (req , res) => {
  try {
    const {token , paymentID} = req.body
    const id = JWT.decode(token , process.env.JWT_SECRET)
    const user = await Users.findById(id.id)
    console.log(user + "this is for orders")
    if (!user) {
      return res.status(404).json({success : false , message : "user not found"})
    }
    const seller = await Seller.findOne({email : user.email})
    const order = await Order.findOne({id : req.params.id , PaymentID : paymentID})
    console.log(order + "this is for orders")
    if (!order) {
      return res.status(404).json({success : false , message : "order not found"})
    }
    return res.status(200).json({success : true , order : order})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

module.exports = router;

const express = require("express");
const Products = require("../models/productModel.js");
const ApiFeatures = require("../utils/APIFeatures");
const JWT = require("jsonwebtoken");
const router = express.Router();
const dotenv = require("dotenv");
const Users = require("../models/userModel");
const Seller = require('../models/SellerModel')
const { captureRejectionSymbol } = require("nodemailer/lib/xoauth2");
dotenv.config({ path: "../config/config.env" });

//route to create a new product -- admin required -- seller required
router.post("/product/create", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "you need to be authenticated" });
    }
    const id = await JWT.decode(token , process.env.JWT_SECRET);
    const users = await Users.findById(id.id);
    if (users.role === "user") {
      return res
        .status(401)
        .json({ success: false, message: "not authorized" });
    }
    const seller = await Seller.findOne({email : users.email})
    if (!seller) {
      return res.status(401).json({success : false , message : "seller not found"})
    }
    console.log(seller)
    const product = await Products.create({
      name: req.body.name,
      description: req.body.desc,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
      user : seller._id,
      productStarts : req.body.productStarts ,
      quality : req.body.quality
    });
    return res
      .status(200)
      .json({ success: true, message: "product created", product });
  } catch (error) {
      return res.status(401).json({success : false , message : "internal server error"})
  }
});

//route to get all Products
router.get("/product/get", async (req, res) => {
  const apiFeature = new ApiFeatures(Products.find(), req.query)
    .search()
    .filter()
    .pagination(req.query.results || 20);
  const products = await apiFeature.query;
  if (!products) {
    return res
      .status(404)
      .json({ success: false, message: "product not found" });
  }
  return res.status(200).json({ success: true, products });
});

//to get a specific product
router.put("/product/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }
    return res.status(200).json({ success: true, product });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "internal server error" });
  }
});

//to update a product -- admin -- seller
router.get("/product/update/:id", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "you need to be authenticated" });
    }
    const id = JWT.verify(token, process.env.JWT_SECRET);
    const user = await Users.findById(id.id);
    if (user.role === "user") {
      return res
        .status(401)
        .json({ success: false, message: "not authorized" });
    }
    let product = await Products.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    product = await Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res
      .status(200)
      .json({ success: true, message: "product updated", product });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
});

//to delete any product -- admin -- seller
router.delete("/product/delete/:id", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "you need to be authenticated" });
    }
    const id = JWT.verify(token, process.env.JWT_SECRET);
    const user = await Users.findById(id.id);
    if (user.role === "user") {
      return res
        .status(401)
        .json({ success: false, message: "not authorized" });
    }
    let product = await Products.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }
    product = await Products.findByIdAndDelete(req.params.id);
    return res
      .status(201)
      .json({ success: true, message: "product deleted", product });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
});

//route to get the trending products
router.get('/product/trending' , async (req , res) => {
  try {
    let products = await Products.find();
    return res.status(200).json({success : true , products})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

//to get the categorical product
router.put('/product/find/:keyword' , async (req , res) => {
  try {
    const products = await Products.find({category : req.params.keyword.toString()})
    return res.status(200).json({success : true , products})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

//route to add the review
router.post("/product/review/add/:id" , async (req , res) => {
  // try {
    const {rating , message , token} = req.body
    console.log(rating , message , token)
    const product = await Products.findById(req.params.id)
    if (!product) {
      return res.status(404).json({success : false , message : "product not found"})
    }
    const id = JWT.decode(token , process.env.JWT_SECRET)
    const user = await Users.findById(id.id)
    if (!user) {
      return res.status(404).json({success : false , message : "user not found"})
    }
    for (let i = 0 ; i < product.reviews.length ; i++ ) {
      if (product.reviews[i].id.toString() === id.id.toString()) {
        return res.status(200).json({success : true , message : "review found for the user" , review : product.reviews[i]})
      }
    }
    const review = {
      name : user.name ,
      rating : rating , 
      message : message , 
      id : user._id
    }
    product.reviews.push(review)
    product.numOfReviews = product.numOfReviews + 1
    await product.save();
    const product1 = await Products.findById(req.params.id)
    let sum = 0;
    for (let i = 0 ; i <  product1.reviews.length ; i++) {
      sum += product1.reviews[i].rating
    }  
    product1.rating = sum / product1.reviews.length
    product1.productStarts = sum / product1.reviews.length
    await product1.save()
    return res.status(200).json({success : true , message : "the review is added"})
  // } catch (error) {
  //   return res.status(500).json({success : false , message : "internal server error"})
  // }
})

//to check if the user already have review if have then return the review
router.post("/product/review/get/:id" , async ( req , res ) => {
  try {
    const {token} = req.body
    const id = JWT.decode(token , process.env.JWT_SECRET)
    const user = await Users.findById(id.id)
    if (!user) {
      return res.status(404).json({success : false , message : "user not found"})
    }
    const product = await Products.findById(req.params.id)
    if (!product) {
      return res.status(404).json({success : false , message : "product not found"})
    }
    for (let i = 0 ; i < product.reviews.length ; i++ ) {
      if (product.reviews[i].id.toString() === id.id.toString()) {
        return res.status(200).json({success : true , message : "review found for the user" , review : product.reviews[i]})
      }
    }
    return res.status(404).json({success : false , message : "no review found"})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

//route to get all the reviews except the user one
router.put("/product/review/get/:id" , async ( req , res ) => {
  try {
    const product = await Products.findById(req.params.id)
    if (!product) {
      return res.status(404).json({success : false , message : "product not found"})
    }
    return res.status(200).json({success : true , review : product.reviews})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

module.exports = router;

const express = require("express");
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWTToken = require("jsonwebtoken");
const router = express.Router();
const dotenv = require("dotenv");
const crypto = require("crypto");
const sendEmail = require('../utils/sendEmail')
const Products = require('../models/productModel');

dotenv.config({ path: "../config/config.env" });

//to register the user
router.post("/user/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user1 = await Users.findOne({email})
    if (user1) {
      return res.status(400).json({success : false , message : "user already exists"})
    }
    const user = await Users.create({
      name,
      email,
      password: hashedPassword,
      avatar: {
        publicID: "this is sample id",
        url: "this is a sample url",
      },
    });
    const token = JWTToken.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
    const options = {
      httpOnly : true
    }
    return res.status(201).cookie('token' , token , options).json({
      success: true,
      message: "the user is created successfully",
      token,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not a valid email",
    });
  }
});

//to login the user;
router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({
      success: false,
      message: "please enter your email and password",
    });
  }
  const user = await Users.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    return res
      .status(404)
      .json({ success: false, message: "user not found :P" });
  }
  const token = JWTToken.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  const options = {
    httpOnly : true
  }
  return res
    .status(201).cookie('token', token , options)
    .json({ success: true, message: "login success", token});
});

//to logout user
router.get("/user/logoff", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "User not logged off" });
    }
    return res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({ success: true, message: "logoff success" });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "internal server error" });
  }
});

//to generate a forgot password token
router.post("/user/reset", async (req, res) => {
  try {
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not foundF" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000)
    user.OTP = otp
    // user.resetPasswordToken = resetPasswordHash;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; //
    user.save();
    const restPasswordToken = `${req.protocol}://${req.get('host')}/api/v1/user/reset/${resetToken}`
    // const message = `your reset password link is :- \n\n\ ${restPasswordToken} \n\n\ if haven't requested kindly ignore`
    const message = `your reset password OTP is :- \n\n\ ${otp} \n\n\ if haven't requested kindly ignore`
    try {

      await sendEmail({
        email : user.email,
        subject : 'shopping password recovery',
        message : message,
      })

      return res.status(200).json({success : true , message : `email sent to ${user.email} successfully`})
      
    } catch (error) {
      // user.resetPasswordToken = undefined;
      user.OTP = undefined;
      user.resetPasswordExpire = undefined;
      user.save()
      return res.status(500).json({success : false , message : "kindly try again later"})
    }
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "internal server error" });
  }
});

//to change the password for the token
router.put('/user/reset/:token' , async (req , res) => {
  try {
    
  const resetPasswordHash = crypto.createHash("sha256").update(req.params.token).digest("hex");
  const user = await Users.findOne({ resetPasswordToken : resetPasswordHash , resetPasswordExpire : {$gt : Date.now()}})
  if (!user) {
    return res.status(404).json({success : false , message : "reset password token is invalid or expired"});
  }
  if (req.body.pass !== req.body.confirmPass) {
    return res.status(400).json({success : false , message : "passwords doesn't match"})
  }
  user.password = await bcrypt.hash(req.body.pass , 10);
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined
  await user.save()
  return res.status(201).json({success : true , message : "password changed"})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
});

//route for the OTP authentication
router.post('/user/reset/OTP' , async (req , res) => {
  try {
  const user = await Users.findOne({ OTP : req.body.OTP , resetPasswordExpire : {$gt : Date.now()}})
  if (!user) {
    return res.status(404).json({success : false , message : "reset password token is invalid or expired"});
  }
  user.OTP = undefined
  user.resetPasswordExpire = undefined
  await user.save()
  return res.status(201).json({success : true , message : "OTP verified"})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
});

//to check set the password
router.post('/user/reset/password' , async (req , res) => {
  try {
    const {Pass , cPass , email} = req.body
    const user = await Users.findOne({email})
    if (!(Pass === cPass)) {
      return res.status(404).json({success : false , message : "confirm password doesnt match"})
    }
    user.password = await bcrypt.hash(Pass , 10)
    await user.save()
    return res.status(200).json({success : true , message : "the passwords changed"})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

//to get user details
router.put("/user/me/:token" , async (req , res) => {
  try {
    if (!req.params.token) {
      return res.status(404).json({success : false , message: "kindly login first"})
    }
    const id = JWTToken.decode(req.params.token , process.env.JWT_SECRET);
    const user = await Users.findById(id.id)
    return res.status(200).json({success : true , message : "user found" ,user })
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

//to add the products in the buy now cart
router.post("/user/buynow/add/:id" , async (req , res) => { 
  try {
    const product = await Products.findById(req.params.id)
    if (!product) {
      return res.status(404).json({success : false , message : "product not found"})
    }
    const {quantity , token} = req.body
    const id = JWTToken.decode(token , process.env.JWT_SECRET)
    const user = await Users.findById(id.id)
    if (!user) {
      return res.status(404).json({success : false , message : "user not found"})
    }
    const cart = {name : product.name , price : product.price , id : req.params.id , quantity : quantity , mainPhoto : product.mainPhoto}
    const user1 = await Users.findByIdAndUpdate(id.id , {buyNowCart : cart})
    const user2 = await Users.findById(id.id)
    return res.status(200).json({success : true , message : "product updated" , user2})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

//to get the buynow products
router.put("/user/buynow/get/:token" , async (req , res) => {
  try {
    const id = JWTToken.decode(req.params.token , process.env.JWT_SECRET);
    const user = await Users.findById(id.id);
    if (!user) {
      return res.status(404).json({success : false , message : "user not found"})
    }
    if (user.buyNowCart.name === undefined) {
      return res.status(404).json({success : false , message : "product in the cart not found"})
    }
    return res.status(200).json({success : true , product : [user.buyNowCart]})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

//to make the buy now cart content undefined

router.put("/user/buynow/remove/:token" , async (req , res) => {
  try {
    const id = JWTToken.decode(req.params.token , process.env.JWT_SECRET)
    const user = await Users.findById(id.id);
    if (!user) {
      return res.status(404).json({success : false , message : "user not found"})
    }
    const cart = {name : undefined , price : undefined , id : undefined , quantity : undefined}
    const user1 = await Users.findByIdAndUpdate(id.id , {buyNowCart : cart})
    return res.status(200).json({success : true , message : "The product was removed from the cart"})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

//to add the products to the wishlist
router.post("/user/wishlist/add/:id" , async (req , res) => {
  try {
    const {token} = req.body
    const id = JWTToken.decode(token , process.env.JWT_SECRET)
    const user = await Users.findById(id.id)
    if (!user) {
      return res.status(404).json({success : false , message : "user not found"})
    }
    const product = await Products.findById(req.params.id)
    if (!product) {
      return res.status(404).json({success : false , message : "product not found"})
    }
    const product1 = {
      name : product.name ,
      price : product.price ,
      id : req.params.id ,
      condition : product.quality
    }
    user.wishlist.push(product1)
    await user.save()
    return res.status(200).json({success : true , message : "Product Added to the wishlist"})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

//to check if the product is in the wishlist of the user
router.post("/user/wishlist/check/:id" , async (req ,res) => {
  try {
    const {token} = req.body
    const id = JWTToken.decode(token , process.env.JWT_SECRET)
    const user = await Users.findById(id.id);
    if (!user) {
      return res.status(404).json({success : false , message : "user not found"})
    }
    for (let i = 0 ; i < user.wishlist.length ; i++) {
      if (user.wishlist[i].id.toString() === req.params.id.toString()) {
        return res.status(200).json({success : true , message : "product in wishlist"})
      }
    }
    return res.status(404).json({success : false , message : "product Not in wishlist"})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

//to get the products from the wishlist
router.put("/user/wishlist/get/:token" , async (req , res) => {
  try {
    const id = JWTToken.decode(req.params.token , process.env.JWT_SECRET)
    const user = await Users.findById(id.id)
    if (!user) {
      return res.status(404).json({success : false , message : "user not found"})
    }
    return res.status(200).json({success : true , product : user.wishlist})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

//to remove the product from the wishlist
router.delete("/user/wishlist/delete/:id" , async (req , res) => {
  try {
    const {token} = req.body
    const id = JWTToken.decode(token , process.env.JWT_SECRET)
    const user = await Users.findById(id.id)
    if (!user) {
      return res.status(404).json({success : false , message : "user not found"})
    }
    const newWishlist = user.wishlist.filter((product) => {
      if (product.id.toString() !== req.params.id.toString()) {
        return product;
      }
    })
    user.wishlist = newWishlist;
    await user.save()
    const user1 = await Users.findById(id.id)
    return res.status(200).json({success : true , message : "the product was removed" , user1})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

//to add the orders in the list of orders
router.post("/user/order/add/:id" , async ( req , res ) => {
  try {
    const { orderID , token , quantity } = req.body
    const product = await Products.findById(req.params.id)
    if (!product) {
      return res.status(404).json({success : false , message : "product not found"})
    }
    const id = JWTToken.decode(token , process.env.JWT_SECRET)
    const user = await Users.findById(id.id)
    if (!user) {
      return res.status(404).json({success : false , message : "user not found"})
    }
    const newOrder = {
      id : product._id ,
      name : product.name ,
      price : product.price , 
      quantity : quantity ,
      PaymentID :  orderID ,
      status : "Ordered" ,
      placedAt : Date.now() ,
      mainPhoto : product.mainPhoto ,
      condition : product.quality
    } 
    user.orders.push(newOrder);
    await user.save()
    return res.status(200).json({success : true , message : "order placed successfully"})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

//to get all the orders placed by someone
router.put('/user/order/get/:token' , async (req ,res) => {
  try {
    const id = JWTToken.decode(req.params.token , process.env.JWT_SECRET)
    const user = await Users.findById(id.id)
    if (!user) {
      return res.status(404).json({success : false , message : "user not found"})
    }
    return res.status(200).json({success : true , product : user.orders})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

//to add products in cart
router.post('/user/cart/get' , async (req ,res) => {
  try {
    const  {token} = req.body
    const id = JWTToken.decode(token , process.env.JWT_SECRET)
    const user = await Users.findById(id.id)
    if (!user) {
      return res.status(404).json({success : false , message : "user not found"})
    }
    console.log(user.cart)
    return res.status(200).json({success : true , products : user.cart})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

//to add product to cart
router.post('/user/cart/add/:id' , async (req , res) => {
  try {
    const {token} = req.body
    const id = JWTToken.decode(token , process.env.JWT_SECRET)
    const user = await Users.findById(id.id)
    if (!user){
      return res.status(404).json({success : false , message : "user not found"})
    }
    for (let i = 0 ; i < user.cart.length ; i++ ) {
      if (user.cart[i].id.toString() === req.params.id.toString())  {
        return res.status(201).json({success : false , message : "product already in the cart"})
      }
    }
    const product = await Products.findById(req.params.id)
    const newProduct = {
      name : product.name ,
      price : product.price ,
      id : req.params.id.toString() ,
      quantity : 1, 
      mainPhoto : product.mainPhoto ,
      condition : product.quality
    }
    user.cart.push(newProduct)
    await user.save()
    return res.status(200).json({success : true , message : "product added to cart"})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

//to get the total price of the products
router.post('/user/cart/price/:token' , async (req , res) => {
  try {
    const id = JWTToken.decode(req.params.token , process.env.JWT_SECRET)
    const user = await Users.findById(id.id)
    if (!user){
      return res.status(404).json({success : false , message : "user not found"})
    }
    let price = 0;
    for (let i = 0 ; i < user.cart.length ; i++) {
      price += user.cart[i].price 
    }
    return res.status(200).json({success : true , message : "price is calculated" , price : price})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

//to update quantity of the buynow
router.post('/user/buynow/update/:id' , async (req , res) => {
  try {
    const {quantity , token} = req.body
    const id = JWTToken.decode(token , process.env.JWT_SECRET);
    const user = await Users.findById(id.id)
    if (!user) {
      return res.status(404).json({success : false , message : "user not found"})
    }
    user.buyNowCart.quantity = quantity
    await user.save()
    return res.status(200).json({success : true , nessage : "product updated successfully"})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

//to update the add to cart quantity
router.post('/user/cart/update/:id' , async (req , res) => {
  try {
    const {quantity , token} = req.body
    const id = JWTToken.decode(token , process.env.JWT_SECRET)
    const user = await Users.findById(id.id)
    if (!user) {
      return res.status(404).json({success : false , message : "user not found"})
    }
    const newArr = []
    for (let i = 0 ; i < user.cart.length ; i++) {
      if (user.cart[i]._id.toString() === req.params.id.toString()) {
        newArr.push({
          name : user.cart[i].name ,
          mainPhoto : user.cart[i].mainPhoto ,
          price : user.cart[i].price ,
          id : user.cart[i].id ,
          quantity : quantity ,
          _id : user.cart[i]._id ,
          condition : user.cart[i].condition
        })
      }
      else {
        newArr.push(user.cart[i])
      }
    }
    user.cart = newArr;
    await user.save()
    return res.status(200).json({success : true , message : "product updated"})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

//to give the sum of items in the cart
router.post('/user/cartItems/price/:token' , async (req , res) => {
  try {
    const id = JWTToken.decode(req.params.token , process.env.JWT_SECRET)
    const user = await Users.findById(id.id)
    if (!user) {
      return res.status(404).json({success : false , message : "user not found"})
    }
    let amount = 0 ;
    for (let i = 0 ; i < user.cart.length ; i++) {
      console.log(amount)
      amount += user.cart[i].price * user.cart[i].quantity
    }
    return res.status(200).json({success : true , price : amount})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

//to remove a product from the cart
router.post('/user/cart/remove/:id' , async (req , res) => {
  try {
    const {token} =  req.body
    const id = JWTToken.decode(token , process.env.JWT_SECRET)
    const user = await Users.findById(id.id)
    if (!user) {
      return res.status(404).json({success : false , message : "user not found"})
    }
    const newArr = []
    for (let i = 0 ; i < user.cart.length ; i++) {
      if (user.cart[i]._id.toString() === req.params.id.toString()) {

      }
      else {
        newArr.push(user.cart[i])
      }
    }
    user.cart = newArr
    await user.save();
    return res.status(200).json({success : true , message : "product deleted"})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

//to add multiple orders in the user account
router.post('/user/order/add' , async (req , res) => {
  try {
    const {data , token , orderID} = req.body
    const id = JWTToken.decode(token , process.env.JWT_SECRET)
    const user = await Users.findById(id.id)
    for (let i = 0 ; i < data.length ; i++) {
      console.log(data[i] + "this is for user")
      user.orders.push({
        id : data[i].id ,
        name : data[i].name ,
        price : data[i].price , 
        quantity : data[i].quantity ,
        PaymentID :  orderID ,
        status : "Ordered" ,
        placedAt : Date.now() ,
        mainPhoto : data[i].mainPhoto ,
        condition : data[i].condition
      })
    }
    console.log(user.orders)
    await user.save()
    return res.status(200).json({success : true , message : "product added"})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

//to get a specific order of a user 
router.post("/user/order/get/:id" , async (req , res) => {
  try {
    const {token} = req.body
    const id = JWTToken.decode(token , process.env.JWT_SECRET);
    const user = await Users.findById(id.id)
    if (!user) {
      return res.status(404).json({success : false , message : "user not found"})
    }
    for (let i = 0 ; i < user.orders.length ; i++) {
      if (user.orders[i].id.toString() === req.params.id.toString()) {
        return res.status(200).json({success : true , product : user.orders[i]})
      }
    }
    console.log(user)
    return res.status(404).json({success : false , message : "product not found"})
  } catch (error) {
    return res.status(500).json({success : false , message : "internal server error"})
  }
})

module.exports = router;

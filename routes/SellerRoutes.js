const express = require("express")
const Sellers = require('../models/SellerModel')
const JWT = require("jsonwebtoken")
const dotenv = require("dotenv")
const User = require('../models/userModel')
const Products = require("../models/productModel")
const bcrypt = require('bcrypt')

dotenv.config({path : '../config/config.env'})

const router = express.Router();

//to create a seller account 
router.post("/seller/register" , async (req , res) => {
   try {
    const {email , name , password} = req.body;
    const seller1 = await Sellers.findOne({email})
    console.log(password)
    const hashedPassword = await bcrypt.hash(password , 10)
    if (seller1) {
        return res.status(404).json({success : false , message : "user already exists"})
    }
    const user1 = await User.findOne({email})
    if (user1) {
        return res.status(404).json({success : false , message : "you are already a user kindly login"})
    }
    const seller = await Sellers.create({
        name : name ,
        email : email ,
        password : hashedPassword
    })
    const user = await User.create({
        name : name , 
        email : email,
        password : hashedPassword , 
        role : "seller" ,
        avatar: {
            publicID: "this is sample id",
            url: "this is a sample url",
        },
    })
    const token = JWT.sign({id : user._id} , process.env.JWT_SECRET)
    res.status(201).json({success : true , message : "the seller is created" , token})
   } catch (error) {
       return res.status(200).json({success : false , message : "internal server error"})
   }
})

//route to create a new  product from the seller
router.post("/seller/product/add/:token" , async (req , res) => {
    // try {
        const {name , description , price , stock,  category , condition , mainPhoto , images} = req.body;
        const id = JWT.decode(req.params.token , process.env.JWT_SECRET);
        const user = await User.findById(id.id)
        console.log(mainPhoto)
        if (!user) {
            return res.status(404).json({success : false , message : "user not found"})
        }
        const seller = await Sellers.findOne({email : user.email});
        if (!seller) {
            return res.status(404).json({success : false , message : "you are on a user account kindly convert to a seller account to add products"})
        }
        const products = await Products.create({
            name : name , 
            description : description ,
            price , price ,
            stock : stock ,
            category : category ,
            user : seller._id ,
            quality : condition ,
            mainPhoto : mainPhoto 
        })
        console.log(images)
        for (let i = 0 ; i < images.length ; i++) {
            const newArr = {
                url : images[i]
            }
            console.log(newArr)
            products.images.push(newArr)
        }
        await products.save()
        const newDict = {
            mainPhoto : mainPhoto ,
            name : name , 
            Productid : products._id ,
            description : description ,
            price : price ,
            stock : stock ,
            category : category ,
            condition : condition , 
        }
        console.log(newDict)
        seller.products.push(newDict)
        await seller.save();
        return res.status(200).json({success : true , message : "product added"})
    // } catch (error) {
    //     return res.status(500).json({success : false , message : "internal server error"})
    // }
})

//route to get all the products of the seller;
router.get("/seller/product/get/:token" , async (req , res) => {
    try {
        const id = JWT.decode(req.params.token , process.env.JWT_SECRET)
        const user = await User.findById(id.id)
        if (!user) {
            return res.status(404).json({success : false , message : "user not found"})
        }
        const seller = await Sellers.findOne({email : user.email})
        if (!seller) {
            return res.status(404).json({success : false , message : "seller not found"})
        }
        const product = await Products.find({user : seller._id});
        return res.status(200).json({success : true , product})
    } catch (error) {
        return res.status(500).json({success : false , message : "internal server error"})
    }
})

//to update the products and make changes in them by the seller in case of change in stock or the quality
router.post('/seller/product/update/:id' , async (req , res) => {
    const product = await Products.findById(req.params.id)
    const update = {
        Stock : product.stock ,
        quality : product.quality
    }
    if (req.body.stock !== null) {
        update.Stock = req.body.stock
    }
    if (req.body.quality !== null) {
        update.quality = req.body.quality
    }
    const product1 = await Products.findByIdAndUpdate(req.params.id , update)
    return res.status(200).json({success : true , message : "the product is successfully changed"})
})

//to remove a product from the seller list and from the website
router.delete("/seller/product/delete/:id" , async (req ,res) => {
    const {token} = req.body;
    const id = JWT.decode(token , process.env.JWT)
    const user = await User.findById(id.id)
    if (!user) {
        return res.status(404).json({success : false , message : "user not found"})
    }
    const seller = await Sellers.findOne({email : user.email})
    if (!seller) {
        return res.status(404).json({success : false , message : "your account is not seller based"})
    }
    const product = await Products.findById(req.params.id)
    if (!product) {
        return res.status(404).json({success : false , message : "requested product Not found"})
    }
    const product1 = await Products.findByIdAndDelete(req.params.id)
    let newProducts = []
    for (let i = 0 ; i < seller.products.length ; i++) {
        if (seller.products[i].Productid.toString() !== req.params.id.toString()) {
            newProducts.push(seller.products[i])
        }
    }
    seller.products = newProducts;
    await seller.save()
    const seller1 = await Sellers.findOne({email : user.email})
    return res.status(200).json({success : true , message : "product Removed"})
})

module.exports = router
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    condition : {
        type : String ,
        required : true ,
    } ,
    id : {
        type : mongoose.Schema.ObjectId ,
        required : true ,
    } ,
    name : {
        type : String , 
        required : true ,
    } ,
    price : {
        type : String ,
        required : true ,
    } ,
    quantity : {
        type : String , 
        required : true ,
    } ,
    mainPhoto : {
        type : String ,
        required : true ,
    } ,
    PaymentID : {
        type : String ,
        required : true ,
    } ,
    status : {
        type : String ,
        required : true ,
    } , 
    placedAt : {
        type : Date,
    } ,
    user : {
        type : mongoose.Schema.ObjectId ,
        required : true
    }
})

module.exports = mongoose.model("orders" , orderSchema)
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        required: [true , 'please enter your name'],
    },
    email : {
        type : String ,
        required : [true , 'please enter your email'],
        unique : true,
        validate : [validator.isEmail , 'please enter a valid emai;']
    },
    password : {
        type : String ,
        required : [true , 'please enter your password'],
        select : false,
    },
    avatar : {
        publicID : {
            type : String ,
            required : true,
        } ,
        url : {
            type : String ,
            required : true
        }
    },
    orders : [
        {
            condition : {
                type : String ,
                required : true
            } ,
            id : {
                type : mongoose.Schema.ObjectId ,
                required : true
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
                required : true
            } ,
            PaymentID : {
                type : String , 
                required : true ,
            } ,
            status : {
                type : String ,
                required : true 
            } ,
            placedAt : {
                type : Date
            }
        }
    ]  ,
    role : {
        type: String ,
        default : "user",
    },
    resetPasswordToken : {
        type : String,
    } ,
    resetPasswordExpire : {
        type : Date,
    } ,
    OTP : {
        type : Number
    } , 
    wishlist : [
        {
            name : {
                type : String ,
                required : true,
            } ,
            mainPhoto : {
                type : String ,
            } ,
            price : {
                type : String , 
                required : true ,
            } ,
            id : {
                type : mongoose.Schema.ObjectId ,
                ref : "Product"
            } ,
            condition : {
                type : String ,
                required : true,
            }
        }
    ] ,
    address : [
        {
            HouseNo : {
                type : String ,
                required : true ,
            } ,
            Street : {
                type : String ,
                required : true ,
            } ,
            Landmark : {
                type : String ,
                required : true ,
            } ,
            pincode : {
                type : String ,
                required : true
            } , 
            state : {
                type : String , 
                required : true 
            }
        }
    ] ,
    cart : [
        {
            condition : {
                type : String ,
                required : true
            } ,
            name : {
                type : String ,
                required : true,
            } ,
            price : {
                type : Number , 
                required : true ,
            } ,
            mainPhoto : {
                type : String ,
                required : true
            } ,
            id : {
                type : mongoose.Schema.ObjectId ,
                ref : "Product"
            } ,
            quantity : {
                type : Number ,
                required : true,
            } ,
            
        },
    ] ,
    buyNowCart : {
        name : {
            type : String ,
        } ,
        mainPhoto : {
            type : String 
        } ,
        price : {
            type : Number , 
        } ,
        id : {
            type : mongoose.Schema.ObjectId ,
            ref : "Product"
        } ,
        quantity : {
            type : Number ,
        }
    },
});

module.exports = mongoose.model("user" , userSchema);
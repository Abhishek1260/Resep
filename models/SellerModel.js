const mongoose = require("mongoose");

const sellerSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "the seller name is required"],
  },
  email: {
    type: String,
    required: [true, "the seller email is required"],
  },
  password: {
    type: String,
    required: [true, "the seller password is required"],
  },
  products: [
    {
      name: {
        type: String,
        required: [true, "the product name is required"],
      },
      mainPhoto : {
        type : String
      } ,
      description: {
        type: String,
        required: [true, "the product description is required"],
      },
      price: {
        type: Number,
        required: [true, "the product price is required"],
      },
      stock: {
        type: Number,
        default: 0,
      },
      category : {
        type : String , 
        required : [true , 'the product category is required']
      } ,
      condition : {
        type : String ,
        required : [true , 'the product condition is required']
      } ,
      Productid : {
        type : mongoose.Schema.ObjectId ,
        required : [true , "the product ID is required"] , 
        ref : "Products"
      },
      images: [
        {
          public_ID: {
            type: String,
            required: true,
          },
          URL: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Sellers" , sellerSchema)

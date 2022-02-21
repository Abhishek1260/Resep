const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect('mongodb://localhost:27017/shopping?readPreference=primary&appname=MongoDB%20Compass&ssl=false' , () => {
        console.log("connected")
    })
}

module.exports = connect;
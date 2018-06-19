const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: String,
    ratings:{
        rating: Number,
        ratingCount : Number
    },
    location:{
        address: String,
        lat: Number,
        lng: Number
    },
    prices:{
        average: Number,
        // upperAverage : Number,
        // lowerAverage: Number
    },
    menu:[
        {
            catName: String,
            catAltName: String,
            catAveragePrice: Number,
            itemPrices: [
                {
                    itemName: String,
                    price: Number
                }
            ]
        }
    ]
})

const Restaurant = mongoose.model("restaurant", restaurantSchema );
module.exports = Restaurant
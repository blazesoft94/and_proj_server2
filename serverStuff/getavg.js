var mongoose = require("mongoose");
var Restaurant = require("./../schemas/restaurantSchema.js");
mongoose.Promise= global.Promise;
mongoose.connect("mongodb://abrehman94:realmadrid94@ds113738.mlab.com:13738/restaurants")
var db = mongoose.connection;
setTimeout(()=>process.exit(0), 120000)

db.once("open",()=>{
    console.log("connected to database");
    Restaurant.find({}).then((data)=>{
        data.forEach((restaurant)=>{
            restaurant.menu.forEach((cat)=>{
                total = 0;
                totalItems =0;
                cat.itemPrices.forEach((item)=>{
                    total+=item.price;
                    totalItems+=1;
                });
                cat.catAveragePrice = parseInt(total/totalItems);
            });
            restaurant.save();
            // console.log(restaurant.name, total)
        })
    });

    
})
db.on("error",()=>console.log("error connecting to database"));
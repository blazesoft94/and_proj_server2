var mongoose = require("mongoose");
var Restaurant = require("./../schemas/restaurantSchema.js")
var fs = require("fs");
var geoCode = require("./../geoCode/geoCode.js");
var restaurants = require("./updateWithMenu.js");
mongoose.Promise= global.Promise;
mongoose.connect("mongodb://abrehman94:realmadrid94@ds113738.mlab.com:13738/restaurants")
var db = mongoose.connection;
setTimeout(()=>process.exit(0), 120000)

db.once("open",()=>{
    console.log("connected to database");
    var city = "lahore"
    // var allRestaurants = fs.readFileSync(__dirname+"/restaurants3.txt", {encoding: "utf-8"})
    var obj = restaurants; //JSON.parse(allRestaurants)
    var promArray = []
    for(var count=0; count<obj.length; count++ ){
        // if(obj[count].name=="Coffee Planet - Phase 6"){
        //     var xx = parseInt(obj[count].ratingCount)
        //     console.log(xx)
        // }
        promArray.push(Restaurant.findOne({name: obj[count].name}))
        //
    }
    Promise.all(promArray).then((data)=>{
        console.log(obj.length)
        for(var count=0; count<obj.length; count++ ){
            var found = false;
            for(var c=0; c<data.length; c++){
                if(data[c]){
                    if(data[c].name == obj[count].name){
                        console.log(obj[count].name,"found");
                        found = true;
                        break;
                    }
                }
            }
            if(!found){
                getCoordinates(obj[count], city);
            }
        }
    }, (err)=>console.log(err));

    
})
db.on("error",()=>console.log("error connecting to database"));



function getCoordinates(obj, city) {
    var cityToSend = city == "none" ? "" : " "+city; 
    geoCode(obj, cityToSend).then((data)=>{
        console.log(data.name)
        var rest = new Restaurant({
            name: obj.name,
            ratings: {rating: obj.rating ? parseFloat(obj.rating) : 0, ratingCount: parseInt(obj.ratingCount) ? parseInt(obj.ratingCount) : 0},
            location: {
                 address: data.address,
                 lat: data.latitude,
                 lng: data.longitude
            },
            prices: {
                average: obj.averagePrice,
                // upperAverage : parseInt(obj.upperAveragePrice),
                // lowerAverage:  parseInt(obj.lowerAveragePrice)
            }, 
            menu:obj.menu

             })
        rest.save((err,d)=>{
            if(err){
                console.error(err)
            }
        })
    },(errData)=>{
        console.log("some error with",errData.addressName)
        if(errData.result == "no_results"){
            console.log("---------------");
            console.log("no results");
            console.log("---------------");
        }
        else{
            console.log("the error with",errData.obj.name)
            console.log("sending again");
            getCoordinates(errData.obj,"none");
        }
        
    });
}


var categories = {
    FastFood: /fast food|burger/,
    Pizza: /pizza/,
    Bbq: /bbq|barbeque|b.b.q/,
    Sandwich: /sandwich/,
    Soup: /soup/,
    Chinese: /chinese/,
    Pasta: /pasta/,
    Steak: /steak/,
    Pakistani: /pakistani/,
    Bakery: /bakery/

}
var Restaurant = require("./../schemas/restaurantSchema.js");
var mongoose = require("mongoose");
// var Restaurant = require("./../schemas/restaurantSchema.js");
mongoose.Promise= global.Promise;
mongoose.connect("mongodb://abrehman94:realmadrid94@ds113738.mlab.com:13738/restaurants")
var db = mongoose.connection;

function propName(prop, value){
    for(var i in prop) {
        if (prop[i] == value){
             return i;
        }
    }
    return false;
 }

function changeCat(){
    Restaurant.find({}).then((data)=>{
        console.log("got da data")
        for( var restaurant=0; restaurant< data.length; restaurant++ ){
                // console.log(data[restaurant])
                for (var cat=0; cat<data[restaurant].menu.length; cat++){
                    // console.log(cat);
                    for(var prop in categories){
                        var reg = RegExp(categories[prop],"i");
                        // console.log(reg);
                        if (data[restaurant].menu[cat].catName.match(reg)){
                            console.log(data[restaurant].menu[cat].catAltName)
                            // data[restaurant].menu[cat].catAltName = prop;
                            // console.log("changing",data[restaurant].menu[cat].catName,"to",prop);
                            break;
                        }
                    }
                    data[restaurant].save().then(()=>{},err=>console.log(err));
                }
                // restaurant.save();
                // console.log(restaurant.name, restaurant.menu.catName)
        }
    });
}

db.once("open",()=>{
    console.log("connected to database");
    changeCat();
})
db.on("error",()=>console.log("error connecting to database"));

// for(var prop in categories){
//     var x = prop;
//     console.log(categories[prop]);
// }
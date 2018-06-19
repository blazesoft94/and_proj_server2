
var bodyParser = require("body-parser")
var path= require("path");
var fs = require("fs");
var express = require("express");
const hbs = require("hbs");
var http = require("http");
var app =express();
var server = http.createServer(app)
var geoCode = require("./geoCode/geoCode.js")
var mongoose = require("mongoose");
var Restaurant = require("./schemas/restaurantSchema");
const publicPath = path.join(__dirname+"/public");
var port = process.env.PORT || 5000;

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
    All: /./
}

mongoose.connect("mongodb://abrehman94:realmadrid94@ds113738.mlab.com:13738/restaurants")
var db = mongoose.connection;
db.once("open",()=>{
    console.log("connected to database");
})
db.on("error",()=>console.log("error connecting to database"));

hbs.registerPartials(__dirname+"/views/partials");

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "hbs")
hbs.registerHelper("hyphenTheSpaces", (name)=>{
    return name.split(" ").join("-");
});
hbs.registerHelper("spaceThehyphens", (name)=>{
    return name.split("-").join(" ");
});
hbs.registerHelper("pairMaker",(items)=>{
    var arrayPairs = {
        left: [],
        right: []
    };
    for(var x=0; x<items.length; x++){
        if(x%2==0){
            arrayPairs.left.push(items[x]);
        }
        else{
            arrayPairs.right.push(items[x]);
        }
        // var pair = [items[x], items[x+1]]
    }
    console.log(arrayPairs)
    return [arrayPairs]
})
console.log(publicPath)
// app.get("/", (req,res)=>{
    // res.send("yoo");
// })
app.get("/show", (req,res)=>{
    // res.render("hello.hbs", {lat: 31.4457743, lng:75.874584})
    // var budget = req.query.budget;
    // var {meal} = req.body;
    var people = req.query.people || 1;
    var cat = req.query.cat || "none";
    console.log(cat);
    var perPerson = req.query.budget || 500;
    var limit = perPerson *0.1;
    Restaurant.find({
        "menu.catAltName": cat,
        "menu.catAveragePrice" : 
            {$gt: perPerson-limit, $lt : perPerson+limit} 
        })
    .sort({"ratings.ratingCount": -1})
    .sort({"ratings.rating": -1})
    .then((data)=>{
            console.log("found");
            // console.log(data)
            // res.render("listRestaurants",{ restaurants : data})
            var obj = {
                result: data
            }
            res.json(obj);
    },err=>console.error(err));
});
app.get("/", (req,res)=>{
    res.render("index");
})
app.get("/menu",(req,res)=>{
    var name = req.query.restaurant;
    Restaurant.find({name:name}).then((data)=>{
        res.render("menu2",{
            "restaurant" : data[0]
        });
    })
    // res.render("menu");
});

app.post("/show", (req,res)=>{
    console.log("post request");
    var {budget} = req.body;
    // var {meal} = req.body;
    var {people} = req.body;
    var {cat} = req.body;
    console.log(cat);
    var perPerson = parseInt(budget)/parseInt(people)
    var limit = perPerson *0.1;
    Restaurant.find({
        "menu.catAltName": cat,
        "menu.catAveragePrice" : 
            {$gt: perPerson-limit, $lt : perPerson+limit} 
        })
    .sort({"ratings.ratingCount": -1})
    .sort({"ratings.rating": -1})
    .then((data)=>{
            console.log("found");
            // console.log(data)
            // res.render("listRestaurants",{ restaurants : data})
            res.type("json");
            res.write(data);
    },err=>console.error(err));

}); 

app.listen(port, ()=>console.log("listening on port",port),err=>console.error);


// geoCode("kfc lahore")
//     .then((data)=>{
//         console.log(data)
//     })


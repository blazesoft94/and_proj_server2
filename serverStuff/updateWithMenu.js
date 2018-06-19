var fs = require("fs");
var restaurantlist = require("./restaurantList.js");
// var prevRes = fs.readFileSync(__dirname+"/restaurants3.txt", {encoding: "utf-8"})
// var previousRestaurants = JSON.parse(prevRes)

// fs.writeFileSync("./resNew.txt", JSON.stringify(restaurantlist), {encoding: "utf-8"});
// for(var i =0; i<restaurantlist.length; i++){
//     var found = false;
//     for(var j=0; j<previousRestaurants.length; j++){
//         if(restaurantlist[i].name == previousRestaurants[j].name){
//             found=true;
//             // console.log("------------------------\n\n");              
//             // console.log(restaurantlist[i]);
//             // console.log(previousRestaurants[j]);
//             // console.log("------------------------\n\n"); 
//             break;            
//         }
//     }
//     if(!found){
//         console.log("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
//         console.log(restaurantlist[i]);
//         console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n\n")
//     }
// }
// exclusive discounted deals, limited time offer



// starters, appetizers, deal, offer, drink, beverage, side order, side line, salad, tandoor, naan, nan, soup, dessert, add on, 




restaurantlist = removeEmptyCategories(restaurantlist);
restaurantlist = correctPrices(restaurantlist)


totalPriceArray = []
restaurantlist.forEach((restaurant)=>{
    totalPrice = 0;
    itemCount=0;
    restaurant.rating = parseFloat(restaurant.rating)
    if(!restaurant.rating){
        restaurant.rating = 0;
    }
    restaurant.menu.forEach((category)=>{
        if(!category.catName.match(/coffee|tea|dip sauce|spicy corner|chai|refreshment|dips|shake|smoothie|starter|appetizer|deal|offer|drink|beverage|side order|side line|sideline|salad|tandoor|combo|kids|extra|naan|nan|soup|dessert|add on/ig)){
            category.itemPrices.forEach((item)=>{
                if(!item.itemName.match(/platter|deal/ig)){                   
                    itemCount++;
                    totalPrice+=item.price;
                }
            })
        }
    });
    // console.log(totalPrice)
    // if(totalPrice==0){
    //     console.log(restaurant)
    // }
    restaurant.totalPrice = totalPrice;
    restaurant.averagePrice = totalPrice>0 ? totalPrice/itemCount : 0
})
fs.writeFileSync("resWithAveragePrices.txt","\n")

restaurantlist.forEach((restaurant)=>{
    totalPrice = 0;
    itemCount=0;
    restaurant.rating = parseFloat(restaurant.rating)
    if(!restaurant.rating){
        restaurant.rating = 0;
    }
    restaurant.menu.forEach((category)=>{
        if(!category.catName.match(/coffee|tea|dip sauce|spicy corner|chai|refreshment|dips|shake|smoothie|starter|appetizer|deal|offer|drink|beverage|side order|side line|sideline|salad|tandoor|combo|kids|extra|naan|nan|soup|dessert|add on/ig)){
            category.itemPrices.forEach((item)=>{
                if(!item.itemName.match(/platter|deal/ig)){   
                    if(!(item.price>=1000 && restaurant.averagePrice<500) ){
                        if(item.price<1500){
                            itemCount++;
                            totalPrice+=item.price;
                        }
                    }                
                    
                }
            })
        }
    });
    // console.log(totalPrice)
    if(restaurant.totalPrice==0){
        console.log(restaurant)
    }
    restaurant.totalPrice = totalPrice;
    restaurant.averagePrice = totalPrice>0 ? totalPrice/itemCount : 0
    restaurant.averagePrice = parseInt(restaurant.averagePrice);
})


restaurantlist.forEach((restaurant)=>{
    totalPrice = 0;
    itemCount=0;
    restaurant.rating = parseFloat(restaurant.rating)
    if(!restaurant.rating){
        restaurant.rating = 0;
    }
    restaurant.menu.forEach((category)=>{
        if(!category.catName.match(/coffee|tea|dip sauce|spicy corner|chai|refreshment|dips|shake|smoothie|starter|appetizer|deal|offer|drink|beverage|side order|side line|sideline|salad|tandoor|combo|kids|extra|naan|nan|soup|dessert|add on/ig)){
            category.itemPrices.forEach((item)=>{
                if(!item.itemName.match(/platter|deal/ig)){   
                    if(!(item.price>=1000 && restaurant.averagePrice<500) ){
                        if(item.price<1500){
                            itemCount++;
                            totalPrice+=item.price;
                        }
                    }                
                    
                }
            })
        }
    });
    // console.log(totalPrice)
    if(restaurant.totalPrice==0){
        console.log(restaurant)
    }
    restaurant.totalPrice = totalPrice + totalPrice*0.16;
    restaurant.averagePrice = totalPrice>0 ? ((restaurant.totalPrice)/(itemCount)) : 0
    restaurant.averagePrice = parseInt(restaurant.averagePrice);
    // var x = restaurant.name+" "+ restaurant.url+ " "+restaurant.averagePrice;
    // fs.appendFileSync("resWithAveragePrices.txt", x+"\n")
})



function removeEmptyCategories(restaurantlist){
    for(var restaurant=0; restaurant<restaurantlist.length; restaurant++){
        var menuLength = restaurantlist[restaurant].menu.length;
        for(var category =0; category<menuLength; category++){
            if(restaurantlist[restaurant].menu[category].itemPrices.length==0){
                // process.stdout.write(category.toString())
                restaurantlist[restaurant].menu.splice(category,1);
                category += -1;
                menuLength += -1;
            }
            
        }
    }
    return restaurantlist;
}

function correctPrices(restaurantlist){
    for(var restaurant=0; restaurant<restaurantlist.length; restaurant++){
        var menuLength = restaurantlist[restaurant].menu.length;
        for(var category =0; category<menuLength; category++){
            for( item in restaurantlist[restaurant].menu[category].itemPrices){
                restaurantlist[restaurant].menu[category].itemPrices[item].price = parseInt(restaurantlist[restaurant].menu[category].itemPrices[item].price.replace( /[^0-9]*/g, ''));
                // if(restaurantlist[restaurant].menu[category].itemPrices[item].price>999)console.log(restaurantlist[restaurant].menu[category].itemPrices[item])
            }
        }
    }
    return restaurantlist;
}

module.exports = restaurantlist;
var geoCode = require("./../geoCode/geoCode.js");
var ob = {name: "Aiwan Street"};
geoCode(ob,"Rawalpindi").then((data)=>{
    console.log(data);
})
var request= require("request");
var geocodeAddress= function (obj,city){
    return new Promise((resolve, reject)=>{
        var address = obj.name+city;
        var encodedUri= encodeURIComponent(address);
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedUri}`,
            json: true
        }, (error, response, body) => {
            if(error){
                reject({obj: obj,type: "unable to connect", addressName: address});
            }
            else if(body.status==="ZERO_RESULTS"){
                reject({obj: obj,type: "no_results", addressName: address});
            }
            else if(body.status==="OK"){
                results= {
                    name: address,
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                }
                // fs.writeFile("results.txt",(results.latitude+","+results.longitude));
                resolve(results);
                
            }
        });
    });
}
module.exports = geocodeAddress
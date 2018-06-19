
function myMap(lat,lng){
    var mapOptions = {
        center: new google.maps.LatLng(lat,lng),
        zoom:16,
        mapTypeId: google.maps.MapTypeId.ROAD
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions)
    var marker = new google.maps.Marker({position: mapOptions.center});
    marker.setMap(map);
}
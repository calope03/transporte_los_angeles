
var markers = [];
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: 34.0194, lng: -118.411},
    styles: styleMap
  });
  
  ajaxHandler("https://api.metro.net/agencies/lametro/vehicles/", function(data){
    //console.log(data);
    data.items.forEach(localizacion => {
        var myLatLng = {lat: localizacion.latitude,lng:localizacion.longitude};
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: localizacion.id
        });
        markers.push(marker);
    });
    var markerCluster = new MarkerClusterer(map, markers,{imagePath: 'images/m'});
  });
  
}
initMap();

function ajaxHandler (url, cb){
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      cb(data)  
    })
    .catch(function(error) {
      console.log(error)
    });  
}
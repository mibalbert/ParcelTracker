

/* test.js */


// if (document.getElementById('sender_postcode').value != undefined){
//     const postcode_dep = document.getElementById('sender_postcode').value
//     const postcode_arriv = document.getElementById('recipient_postcode').value
    
//     const geocoder = new google.maps.Geocoder();
//     const address = postcode_dep;
//     geocoder.geocode( { 'address': address}, function(results, status) {
//         if (status == google.maps.GeocoderStatus.OK) {
//             const latitude = results[0].geometry.location.lat()
//             const longitude = results[0].geometry.location.lng()
        
//             const myform = document.getElementById('myform');
//             myform.onsubmit = function(){
//             const x = document.getElementById('sender_postcode_coord_lat').value;
//             x.value = = latitude
//             document.getElementById('sender_postcode_coord_lng').value = longitude;
//             myform.submit();}
//         }
    
//     })
    

// };
console.log("DOMContentLoaded")

// function initMap() {
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 8,
//     center: { lat: 40.731, lng: -73.997 },
//   });
//   const geocoder = new google.maps.Geocoder();
//   const infowindow = new google.maps.InfoWindow();

//   document.getElementById("submit").addEventListener("click", () => {
//     geocodeLatLng(geocoder, map, infowindow);
//   });
// }

// function geocodeLatLng(geocoder, map, infowindow) {
//   const input = document.getElementById("latlng").value;
//   const latlngStr = input.split(",", 2);
//   const latlng = {
//     lat: parseFloat(latlngStr[0]),
//     lng: parseFloat(latlngStr[1]),
//   };

//   geocoder
//     .geocode({ location: latlng })
//     .then((response) => {
//       if (response.results[0]) {
//         map.setZoom(11);

//         const marker = new google.maps.Marker({
//           position: latlng,
//           map: map,
//         });

//         infowindow.setContent(response.results[0].formatted_address);
//         infowindow.open(map, marker);
//       } else {
//         window.alert("No results found");
//       }
//     })
//     .catch((e) => window.alert("Geocoder failed due to: " + e));
// }

// window.initMap = initMap;
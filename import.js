// // export { Handlebars } from ''

// {{!-- const startPostcode = document.getElementById("sender_postcode").innerHTML
// console.log(startPostcode)
// const endPostcode = document.getElementById("recipient_postcode").innerHTML

// ///Create function that initiates the map and adds the decorators to it, like polyline(straight-path) and markers.
// function initMap() {
//     const map = new google.maps.Map(document.getElementById("map-one-parcel"), {
//         zoom: 6,
//         center: { lat: 52.131459, lng: -1.219818 },
//     });
//     let coord = [
//                     { lat: 0, lng: 0},
//                     { lat: 0, lng: 0},
//                 ]

//     let ff = {}

//     let	url1 = `https://maps.googleapis.com/maps/api/geocode/json?address=${startPostcode}&key=AIzaSyDD8R7YovtasMKrrOIp8D29AoFiJH8fKSE`
//     fetch(url1, {
//         method: "POST",
//     }).then(response =>
//         response.json()
//     ).then(json => {
//         {{!-- const lat =
//         const lng = json.results[0].geometry.location.lng --}}

//         ff = {lat: json.results[0].geometry.location.lat, lng: json.results[0].geometry.location.lng}

//     });

//     console.log(ff)

//     let	url2 = `https://maps.googleapis.com/maps/api/geocode/json?address=${endPostcode}&key=AIzaSyDD8R7YovtasMKrrOIp8D29AoFiJH8fKSE`
//     fetch(url2, {
//         method: "POST",
//     }).then(response =>
//         response.json()
//     ).then(json => {
//         {{!-- geoPoints2.push(json.results[0].geometry.location) --}}

//         const latt = json.results[0].geometry.location.lat
//         const lngg = json.results[0].geometry.location.lng

//         coord[1].lat = latt
//         coord[1].lng = lngg
//     });

//     console.log(coord)

//     //Draws the line
//     const drawPoly = new google.maps.Polyline({
//         path: coord,
//         //geodesic: true, #curves the line
//         strokeColor: "#FF0000",
//         strokeOpacity: 1.0,
//         strokeWeight: 2,
//     });
//     //Sets the starting point marker
//     const mark1 = new google.maps.Marker({
//             position: coord[0],
//             title: "1",
//             map: map,
//     });
//     //Sets the end point marker
//     {{!-- const mark2 = new google.maps.Marker({
//             position: coord[1],
//             title: "2",
//             map: map,
//     }); --}}
//     drawPoly.setMap(map);
//     mark1.setMap(map)
//     {{!-- mark2.setMap(map) --}}

// } --}}

// const startPostcode = document.getElementById("sender_postcode").innerHTML
// console.log(startPostcode)
// const endPostcode = document.getElementById("recipient_postcode").innerHTML

// ///Create function that initiates the map and adds the decorators to it, like polyline(straight-path) and markers.
// function initMap() {
//     const map = new google.maps.Map(document.getElementById("map-one-parcel"), {
//         zoom: 6,
//         center: { lat: 52.131459, lng: -1.219818 },
//     });

//     var lineCoordinates = [
//         new google.maps.LatLng(45.4215296, -75.6971931),
//         new google.maps.LatLng(41.4215296, -71.6571931)
//     ];

//     let	url1 = `https://maps.googleapis.com/maps/api/geocode/json?address=E11ES&key=AIzaSyDD8R7YovtasMKrrOIp8D29AoFiJH8fKSE`
//     fetch(url1, {
//         method: "POST",
//     }).then(response =>
//         response.json()
//     ).then(data => {

//     {{!-- const lat = data.results[0].geometry.location.lat;
//     const lng = data.results[0].geometry.location.lng;
//     add1.lat = lat
//     add1.lng = lng --}}

//     });

//     {{!-- let	url2 = `https://maps.googleapis.com/maps/api/geocode/json?address=${endPostcode}&key=AIzaSyDD8R7YovtasMKrrOIp8D29AoFiJH8fKSE`
//     fetch(url2, {
//         method: "POST",
//     }).then(response =>
//         response.json()
//     ).then(json => {

//     }); --}}

//     console.log(lineCoordinates)

//     //Draws the line
//     const drawPoly = new google.maps.Polyline({
//         path: lineCoordinates,
//         //geodesic: true, #curves the line
//         strokeColor: "#FF0000",
//         strokeOpacity: 1.0,
//         strokeWeight: 2,
//     });
//     //Sets the starting point marker

//     const mark1 = new google.maps.Marker({
//             position: new google.maps.LatLng(45.4215296, -75.6971931),
//             title: "1",
//             map: map,
//     });
//     //Sets the end point marker
//     {{!-- const mark2 = new google.maps.Marker({
//             position: add1,
//             title: "2",
//             map: map,
//     }); --}}
//     {{!-- drawPoly.setMap(map); --}}
//     mark1.setMap(map)
//     {{!-- mark2.setMap(map) --}}

// }

// <script>

// function initMap() {
//     const map = new google.maps.Map(document.getElementById("map-one-parcel"), {
//         zoom: 5,
//         center: { lat: 0, lng: 0 },
//     });

//     Promise.all([
//         fetch("https://maps.googleapis.com/maps/api/geocode/json?address=E11ES&key=AIzaSyDD8R7YovtasMKrrOIp8D29AoFiJH8fKSE"),
//         fetch("https://maps.googleapis.com/maps/api/geocode/json?address=E11ES&key=AIzaSyDD8R7YovtasMKrrOIp8D29AoFiJH8fKSE"),
//         ]).then(([start, end]) => {

//             start.json()
//             end.json()

//         }).then(([start, end]) => {
//             console.log(start)
//         })
//         .catch((err) => {
//             console.log(err);
//         });

//             const flightPlanCoordinates = [
//                 new google.maps.LatLng(0, 21),
//                 new google.maps.LatLng(12, 15),
//             ];
//             console.log(flightPlanCoordinates)

//             const flightPath = new google.maps.Polyline({
//                 path: flightPlanCoordinates,
//                 geodesic: true,
//                 strokeColor: "#FF0000",
//                 strokeOpacity: 1.0,
//                 strokeWeight: 2,
//             });
//             flightPath.setMap(map);

// }

// window.initMap = initMap;
// </script>

// {{!-- let lat = document.getElementById('sender_postcode')
// let lng = document.getElementById('recipient_postcode')
// lat = lat.innerHTML
// lng = lng.innerHTML
// let map;
// function initMap(){
//     //initiate the directions stuff
//     const directionsRenderer = new google.maps.DirectionsRenderer()
//     const directionsService = new google.maps.DirectionsService()
//     //create the map
//     map = new google.maps.Map(document.getElementById('map-one-parcel'), {
//         disableDefaultUI: true,
//     })
//     directionsRenderer.setMap(map)
//     calculateAndDisplayRoute(directionsService, directionsRenderer)
// }
// function calculateAndDisplayRoute(directionsService, directionsRenderer) {
//     directionsService.route(
//         {
//             origin: lat ,
//             destination: lng ,
//             travelMode: "DRIVING"
//         },
//         (response, status) => {
//             directionsRenderer.setDirections(response);
//             console.log(status);
//             if(status != 'OK'){
//                 display(status)
//             }
//         }
//     )
// }

// window.initMap = initMap; --}}

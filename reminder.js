

function codeAddress(geocoder, map, address) {
    geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
        });
        //res.push(results[0].geometry.location.lat)
    } else {
        alert('Geocode was not successful for the following reason: ' + status);
    }
    });
}







///Function to retrieve lat & long based on Postcode
function geoCode(postcode){
	axios.get("https://maps.googleapis.com/maps/api/geocode/json",{
		params: {
			address : postcode,
			key: "AIzaSyBMN0tTYpnYsYcy62DPJoLB_bqZqHnNVDU"
		}
	}).then(function(response){
		console.log(response)
		console.log(response.data.results[0].geometry.location.lat)
		console.log(response.data.results[0].geometry.location.lng)
		//const lat = document.getElementById('lat')
		//const lng = document.getElementById('lng')
		//lat.innerHTML = response.data.results[0].geometry.location.lat
		//lat.value = response.data.results[0].geometry.location.lat
		//lng.innerHTML = response.data.results[0].geometry.location.lng
}).catch(function(errors){
	console.log(errors)
})}

// geoCode()


{{!-- 
// This example requires the Geometry library. Include the libraries=geometry
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry">
let marker1, marker2;
let poly, geodesicPoly;

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 34, lng: -40.605 },
  });

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(
    document.getElementById("info")
  );
  marker1 = new google.maps.Marker({
    map,
    draggable: true,
    position: { lat: 40.714, lng: -74.006 },
  });
  marker2 = new google.maps.Marker({
    map,
    draggable: true,
    position: { lat: 48.857, lng: 2.352 },
  });

  const bounds = new google.maps.LatLngBounds(
    marker1.getPosition(),
    marker2.getPosition()
  );

  map.fitBounds(bounds);
  google.maps.event.addListener(marker1, "position_changed", update);
  google.maps.event.addListener(marker2, "position_changed", update);
  poly = new google.maps.Polyline({
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 3,
    map: map,
  });
  geodesicPoly = new google.maps.Polyline({
    strokeColor: "#CC0099",
    strokeOpacity: 1.0,
    strokeWeight: 3,
    geodesic: true,
    map: map,
  });
  update();
}

function update() {
  const path = [marker1.getPosition(), marker2.getPosition()];

  poly.setPath(path);
  geodesicPoly.setPath(path);

  const heading = google.maps.geometry.spherical.computeHeading(
    path[0],
    path[1]
  );

  document.getElementById("heading").value = String(heading);
  document.getElementById("origin").value = String(path[0]);
  document.getElementById("destination").value = String(path[1]);
}

window.initMap = initMap; --}}



















const status = document.getElementById('status')
		const authorised = document.getElementById('authorised')
		const courier = document.getElementById('courier')
		//console.log(courier)
		if(courier != null){
			if (status.innerHTML == 'not-dispatched'){
			document.getElementById('accept').style.display = 'none'	
			} else if(status.innerHTML == 'in-transit'){
				document.getElementById('formis').style.display = 'none'
			} else {
				document.getElementById('formis').style.display = 'none'
				document.getElementById('accept').style.display = 'none'
			}
		} else {
			document.getElementById('formis').style.display = 'none'
			document.getElementById('accept').style.display = 'none'
		}

const status = document.getElementById('status')
		const authorised = document.getElementById('authorised')
		const courier = document.getElementById('courier')
		//console.log(courier)
		if(courier != null){
			if (status.innerHTML == 'not-dispatched'){
			document.getElementById('accept').style.display = 'none'	
			} else if(status.innerHTML == 'in-transit'){
				document.getElementById('formis').style.display = 'none'
			} else {
				document.getElementById('formis').style.display = 'none'
				document.getElementById('accept').style.display = 'none'
			}
		} else {
			document.getElementById('formis').style.display = 'none'
			document.getElementById('accept').style.display = 'none'
		}



















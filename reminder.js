

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


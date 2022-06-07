
/* geo-maps.js */



window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded')


})

//Display the change in price when slider is moved
const slider = document.querySelector('[name=slider]')
slider.addEventListener('input', event => {
    document.querySelector('[name=slider_value]').value = slider.value
})

const sender_lat = document.querySelector('[name=sender_postcode]')
const sender_lat = document.querySelector('[name=recipient_postcode]')
const sender_lat = document.querySelector('snd_lat')
const sender_lat = document.querySelector('snd_lat')
const sender_lng = document.querySelector('snd_lng')
const receiver_lat = document.querySelector('rcv_lat')
const receiver_lng = document.querySelector('rcv_lng')
const form = document.querySelector('form[name=myform]')
form.addEventListener('submit', event =>{
	

			// function codeAddress() {
			// 	console.log("sssssss",postcode)
			// 	const postcode = document.getElementById('sender_postcode')

			// 	var address = postcode.value;
			// 	geocoder.geocode( { 'address': address}, function(results, status) {
			// 	if (status == 'OK') {
			// 		map.setCenter(results[0].geometry.location);
			// 		var marker = new google.maps.Marker({
			// 			map: map,
			// 			position: results[0].geometry.location
			// 		});
			// 	} else {
			// 		alert('Geocode was not successful for the following reason: ' + status);
			// 	}
			// 	});
			// }

})


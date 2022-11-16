
window.addEventListener('DOMContentLoaded', () => {



	var script = document.createElement('script');
	script.src =
		'https://maps.googleapis.com/maps/api/js?key=AIzaSyBMN0tTYpnYsYcy62DPJoLB_bqZqHnNVDU&callback=initMap';
	script.async = true;

	let map

	window.initMap = async function() {

		map = new google.maps.Map(document.getElementById("map-bitch"), {
		  center: { lat: -34.397, lng: 150.644 },
		  zoom: 8,
		});		
		const marker = new google.maps.Marker({
			position: { lat: -34.397, lng: 50.644 },
			map: map,
		  });

		  
	}

	

	document.head.appendChild(script);
});


// /* courier-route.js */

window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded');

	var script = document.createElement('script');
	script.src =
		'https://maps.googleapis.com/maps/api/js?key=AIzaSyBMN0tTYpnYsYcy62DPJoLB_bqZqHnNVDU&callback=initMap';
	script.async = true;








	window.initMap = async function() {
		let markers = Array();

		// this will execute the promises sequentially
		for (const el of waypoints) {
		  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${el}&key=AIzaSyDD8R7YovtasMKrrOIp8D29AoFiJH8fKSE`;
		  try {
			const res = await fetch(url);
			const value = await res.json(); // alternatively, in a single line: await fetch(..).then(res => res.json());
	  
			let pos = value.results[0].geometry.location;
			markers.push(pos);
			console.log(pos);
	
	
		
				var mapOptions = {
					// center: new google.maps.LatLng(markers[0].latitude, markers[0].longitude),
					center: markers[0],
					// center: 
					zoom: 10,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				var map = new google.maps.Map(document.getElementById("routes-map"), mapOptions);
	
		} catch (err) {
			console.log(err);
			display();
		  }
		}
		console.log(markers[0]);
	  }

	document.head.appendChild(script);
});





















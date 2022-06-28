window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded');

	// console.log(document.getElementsByClassName('routes-table-row'))

	//Create the script tag, set the appropriate attributes
	var script = document.createElement('script');
	script.src =
		'https://maps.googleapis.com/maps/api/js?key=AIzaSyBMN0tTYpnYsYcy62DPJoLB_bqZqHnNVDU&callback=initMap';
	script.async = true;

	window.initMap = function () {
		const directionsService = new google.maps.DirectionsService();
		const directionsRenderer = new google.maps.DirectionsRenderer();
		const map = new google.maps.Map(document.getElementById('routes-map'), {
			// zoom: 8,
			// center: { lat: 51.5287718, lng: -0.2416802 },
			// disableDefaultUI: true,
		});

		directionsRenderer.setMap(map);
		calculateDisplayRoutes(directionsService, directionsRenderer);
	};

	///Add logic to take the shortest path + display time elapsed sice added to transit

	async function calculateDisplayRoutes(directionsService, directionsRenderer) {
		let waypts = [];

		document.querySelectorAll('.asd').forEach((item) => {
			let wayPointId = item.getAttribute('value');
			waypts.push({
				location: wayPointId,
				stopover: true,
			});
		});
		console.log(waypts);
		const waypts2 = waypts.slice(1, -1);
		console.log(waypts2);

		directionsService.route({
			origin: waypts[0].location,
			destination: waypts.at(-1).location,
			waypoints: waypts2,
			optimizeWaypoints: true,
			travelMode: google.maps.TravelMode.DRIVING,
		}, (response, status) => {
			if (status === 'OK' && response) {
				directionsRenderer.setDirections(response);
				const route = response.routes[0];
				const summaryPanel = document.getElementById('directions-route');
				summaryPanel.innerHTML = '';
				console.log(route)
				// For each route, display summary information.
				for (let i = 0; i < route.legs.length; i++) {
					const routeSegment = i + 1;

					
					summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
					summaryPanel.innerHTML += route.legs[i].start_address + `(Package ${i})`;
					summaryPanel.innerHTML += '<br><span><strong>to</strong></span>';
					summaryPanel.innerHTML += route.legs[i].end_address + `(Package ${i+1})` + '<br>';
					summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
				}
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		});
	}
	document.head.appendChild(script);
});

// const route = response.routes[0];
// const summaryPanel = document.getElementById("directions-route");
// summaryPanel.innerHTML = "";

// // For each route, display summary information.
// for (let i = 0; i < route.legs.length; i++) {
// const routeSegment = i + 1;
// summaryPanel.innerHTML +=
// "<b>Route Segment: " + routeSegment + "</b><br>";
// summaryPanel.innerHTML += route.legs[i].start_address + " to ";
// summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
// summaryPanel.innerHTML +=
// route.legs[i].distance.text + "<br><br>";

// let lat = document.getElementById('sender_postcode')
// let lng = document.getElementById('recipient_postcode')
// lat = lat.innerHTML
// lng = lng.innerHTML
// let map;
// function initMap(){
// 	//initiate the directions stuff
// 	const directionsRenderer = new google.maps.DirectionsRenderer()
// 	const directionsService = new google.maps.DirectionsService()
// 	//create the map
// 	map = new google.maps.Map(document.getElementById('map-one-parcel'), {
// 		disableDefaultUI: true,
// 	})
// 	directionsRenderer.setMap(map)
// 	calculateAndDisplayRoute(directionsService, directionsRenderer)
// }
// function calculateAndDisplayRoute(directionsService, directionsRenderer) {
// 	directionsService.route(
// 		{
// 			origin: lat ,
// 			destination: lng ,
// 			travelMode: "DRIVING"
// 		},
// 		(response, status) => {
// 			directionsRenderer.setDirections(response);
// 			console.log(status);
// 			if(status != 'OK'){
// 				display(status)
// 			}
// 		}
// 	)
// }

// function display(status){
// 	let map_error = document.getElementById('error-map-one-parcel')
// 	let map = document.getElementById('map-one-parcel')
// 	map.style.display = 'none'
// 	map_error.innerHTML = `The route could not be accessed status code: <strong>${status}</strong> <br>
// 							Probbably the postcode is faulty.`

// 	map_error.style.display = 'block'
// }

// // Append the 'script' element to 'head'

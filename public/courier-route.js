/* courier-route.js */

window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded');

	var script = document.createElement('script');
	script.src =
		'https://maps.googleapis.com/maps/api/js?key=AIzaSyBMN0tTYpnYsYcy62DPJoLB_bqZqHnNVDU&callback=initMap';
	script.async = true;

	window.initMap = function () {
		const directionsService = new google.maps.DirectionsService();
		const directionsRenderer = new google.maps.DirectionsRenderer();
		const map = new google.maps.Map(document.getElementById('routes-map'), {
			// disableDefaultUI: true,
		});
		directionsRenderer.setMap(map);
		calculateDisplayRoutes(directionsService, directionsRenderer);
	};

	async function calculateDisplayRoutes(
		directionsService,
		directionsRenderer,
	) {
		// let waypts = [{ location: 'EC4V 4EG', stopover: true }];

		let waypts = [];

		document.querySelectorAll('.recipient_postcode').forEach((item) => {
			let wayPointId = item.getAttribute('value');
			waypts.push({
				location: wayPointId,
				stopover: true,
			});
		});
		const waypts2 = waypts.slice(1, -1);
		const alphabet = [
			'A',
			'B',
			'C',
			'D',
			'E',
			'F',
			'G',
			'H',
			'I',
			'J',
			'K',
			'L',
			'M',
			'N',
			'O',
			'P',
			'Q',
			'R',
			'S',
			'T',
			'U',
			'V',
			'W',
			'X',
			'Y',
			'Z',
		];

		directionsService.route({
			origin: waypts[0].location,
			destination: waypts.at(-1).location,
			// destination: waypts[0].location, // if end point to be starting point making it a cycle
			waypoints: waypts2,
			optimizeWaypoints: true,
			travelMode: google.maps.TravelMode.DRIVING,
		}, (response, status) => {
			if (status === 'OK' && response) {
				directionsRenderer.setDirections(response);
				const route = response.routes[0];
				const summaryPanel = document.getElementById(
					'directions-route',
				);
				summaryPanel.innerHTML += `Starting Point (Warehouse): ` +
					`<strong>${waypts[0].location}</strong>` + `<br><br>`;
				// For each route, display summary information.
				for (let i = 0; i < route.legs.length; i++) {
					const routeSegment = i + 1;
					summaryPanel.innerHTML += '<b>Route Segment: ' +
						routeSegment + '</b><br>';
					// summaryPanel.innerHTML += route.legs[i].start_address +
					// 	` (Package ${i})`;
					summaryPanel.innerHTML += route.legs[i].start_address +
						`  ( ${alphabet[i]} )`;
					summaryPanel.innerHTML +=
						'<br><span><strong>to</strong></span>';
					// summaryPanel.innerHTML += route.legs[i].end_address +
					// 	` (Package ${i + 1})` + '<br>';
					summaryPanel.innerHTML += route.legs[i].end_address +
						`  ( ${alphabet[i + 1]} )` + '<br>';
					summaryPanel.innerHTML += route.legs[i].distance.text +
						'<br><br>';
				}
				summaryPanel.innerHTML += `<br>End Point (Last delivery): ` +
					`<strong>${waypts.at(-1).location}</strong>` + `<br><br>`;
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		});
	}
	document.head.appendChild(script);
});

// /* courier-route.js */

window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded');

	var script = document.createElement('script');
	script.src =
		'https://maps.googleapis.com/maps/api/js?key=AIzaSyBMN0tTYpnYsYcy62DPJoLB_bqZqHnNVDU&callback=initMap';
	script.async = true;

	// 	window.initMap = async function() {

	// 		let waypoints = []
	// 		document.querySelectorAll('.recipient_postcode').forEach((item) => {
	// 			let postcode = item.getAttribute('value');
	// 			waypoints.push(postcode);
	// 		});
	// 		let markers = Array();

	// 		// this will execute the promises sequentially
	// 		for (const el of waypoints) {
	// 		  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${el}&key=AIzaSyDD8R7YovtasMKrrOIp8D29AoFiJH8fKSE`;
	// 		  try {
	// 			const res = await fetch(url);
	// 			const value = await res.json(); // alternatively, in a single line: await fetch(..).then(res => res.json());
	// 			let pos = value.results[0].geometry.location;
	// 			markers.push(pos);

	// 		} catch (err) {
	// 			console.log(err);
	// 			display();
	// 		  }
	// 		}

	// 		let mapOptions = {
	// 			// center: new google.maps.LatLng(markers[0].latitude, markers[0].longitude),
	// 			center: markers[0],
	// 			// center:
	// 			zoom: 10,
	// 			mapTypeId: google.maps.MapTypeId.ROADMAP
	// 		};
	// 		const map = new google.maps.Map(document.getElementById("routes-map"), mapOptions);

	// 		for (const marks of markers) {
	// 			const mark = new google.maps.Marker({
	// 				position: marks,
	// 				icon: {
	// 				url: "https://i.ibb.co/G0fpVRx/Marker-Drop-Off2.png",
	// 				size: new google.maps.Size(36, 45),
	// 				scaledSize: new google.maps.Size(36, 45),
	// 				anchor: new google.maps.Point(17, 48)
	// 				},
	// 				animation: google.maps.Animation.DROP,
	// 		});
	// 		mark.setMap(map);
	// 		}

	// 		var infoWindow = new google.maps.InfoWindow();
	// 		let bounds = new google.maps.LatLngBounds();
	// 		var service = new google.maps.DirectionsService();

	// 		var lat_lng = new Array();
	// 		for (let i = 0; i < markers.length; i++) {

	// 			var myLatlng = new google.maps.LatLng(markers[i]);
	// 			lat_lng.push(myLatlng);
	// 		}

	// 		bounds.extend(markers[0]);
	// 		bounds.extend(markers[1]);
	// 		map.fitBounds(bounds);
	// 		//Tilt effect on the map
	// 		map.setTilt(45)

	// 		//Initialize the Direction Service

	// 		for (var i = 0; i < lat_lng.length; i++) {
	// 			if ((i + 1) < lat_lng.length) {
	// 				var src = lat_lng[i];
	// 				var des = lat_lng[i + 1];
	// 				// path.push(src);

	// 				service.route({
	// 				origin: src,
	// 				destination: des,
	// 				travelMode: google.maps.DirectionsTravelMode.DRIVING
	// 				}, function(result, status) {
	// 				if (status == google.maps.DirectionsStatus.OK) {

	// 					//Initialize the Path Array
	// 					var path = new google.maps.MVCArray();
	// 					//Set the Path Stroke Color
	// 					var poly = new google.maps.Polyline({
	// 					map: map,
	// 					strokeColor: '#4986E7',
	// 					strokeWeight: 4
	// 					});
	// 					poly.setPath(path[i]);
	// 					for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
	// 						path.push(result.routes[0].overview_path[i]);
	// 					}

	// 					google.maps.event.addListener(poly, 'click', function() {
	// 						console.log("You clicked the poly!")
	// 					})

	// 				}
	// 			});}}
	// 	}

	// 	document.head.appendChild(script);
	// });

	// 	window.initMap = () => {
	// 		const directionsService = new google.maps.DirectionsService();
	// 		const directionsRenderer = new google.maps.DirectionsRenderer();
	// 		const map = new google.maps.Map(document.getElementById('routes-map'), {
	// 			mapId: "14558a00a81bc942",
	// 			center: { lat: 51.500898, lng: -0.124231},
	// 		});
	// 		directionsRenderer.setMap(map);
	// 		calculateDisplayRoutes(directionsService, directionsRenderer);
	// 	};

	// 	async function calculateDisplayRoutes(
	// 		directionsService,
	// 		directionsRenderer,
	// 	) {
	// 		// let waypts = [{ location: 'EC4V 4EG', stopover: true }];
	// 		let waypts = [];

	// 		document.querySelectorAll('.recipient_postcode').forEach((item) => {
	// 			let wayPointId = item.getAttribute('value');
	// 			waypts.push({
	// 				location: wayPointId,
	// 				stopover: true,
	// 			});
	// 		});
	// 		const waypts2 = waypts.slice(1, -1);

	// 		directionsService.route({
	// 			origin: waypts[0].location,
	// 			destination: waypts.at(-1).location,
	// 			// destination: waypts[0].location, // if you want to make it a cycle
	// 			waypoints: waypts2,
	// 			optimizeWaypoints: true,
	// 			travelMode: google.maps.TravelMode.DRIVING,
	// 		}, (response, status) => {
	// 			if (status === 'OK' && response) {
	// 				directionsRenderer.setDirections(response);

	// 			} else {
	// 				window.alert('Directions request failed due to ' + status);
	// 			}
	// 		});
	// 	}

	// 	document.head.appendChild(script);
	// });

	// console.log(directionsRenderer)

	// const summaryPanel = document.getElementById('directions-route');
	// summaryPanel.innerHTML += `Starting Point (Warehouse): ` +
	// 	`<strong>${waypts[0].location}</strong>` + `<br><br>`;
	// // For each route, display summary information.
	// for (let i = 0; i < route.legs.length; i++) {
	// 	const routeSegment = i + 1;
	// 	summaryPanel.innerHTML += '<b>Route Segment: ' +
	// 		routeSegment + '</b><br>';
	// 	// summaryPanel.innerHTML += route.legs[i].start_address +
	// 	// 	` (Package ${i})`;
	// 	summaryPanel.innerHTML += route.legs[i].start_address +
	// 		`  ( ${numbe[i]} )`;
	// 	summaryPanel.innerHTML +=
	// 		'<br><span><strong>to</strong></span>';
	// 	// summaryPanel.innerHTML += route.legs[i].end_address +
	// 	// 	` (Package ${i + 1})` + '<br>';
	// 	summaryPanel.innerHTML += route.legs[i].end_address +
	// 		`  ( ${numbe[i + 1]} )` + '<br>';
	// 	summaryPanel.innerHTML += route.legs[i].distance.text +
	// 		'<br><br>';
	// }
	// summaryPanel.innerHTML += `<br>End Point (Last delivery): ` +
	// 	`<strong>${waypts.at(-1).location}</strong>` + `<br><br>`;

	var markers = [{
		'timestamp': 'Alibaug',
		'latitude': '18.641400',
		'longitude': '72.872200',
		'description':
			'Alibaug is a coastal town and a municipal council in Raigad District in the Konkan region of Maharashtra, India.',
	}, {
		'timestamp': 'Mumbai',
		'latitude': '18.964700',
		'longitude': '72.825800',
		'description':
			'Mumbai formerly Bombay, is the capital city of the Indian state of Maharashtra.',
	}, {
		'timestamp': 'Pune',
		'latitude': '18.523600',
		'longitude': '73.847800',
		'description':
			'Pune is the seventh largest metropolis in India, the second largest in the state of Maharashtra after Mumbai.',
	}, {
		'timestamp': 'Bhopal',
		'latitude': '23.2599',
		'longitude': '73.857800',
		'description':
			'Pune is the seventh largest metropolis in India, the second largest in the state of Maharashtra after Mumbai.',
	}, {
		'timestamp': 'Bhopal',
		'latitude': '26.9124',
		'longitude': '75.7873',
		'description':
			'Pune is the seventh largest metropolis in India, the second largest in the state of Maharashtra after Mumbai.',
	}];
	window.initMap = () => {
		var mapOptions = {
			center: new google.maps.LatLng(
				markers[0].latitude,
				markers[0].longitude,
			),
			zoom: 10,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
		};
		var map = new google.maps.Map(
			document.getElementById('routes-map'),
			mapOptions,
		);
		var infoWindow = new google.maps.InfoWindow();
		var lat_lng = new Array();
		var latlngbounds = new google.maps.LatLngBounds();
		for (i = 0; i < markers.length; i++) {
			var data = markers[i];
			var myLatlng = new google.maps.LatLng(
				data.latitude,
				data.longitude,
			);
			lat_lng.push(myLatlng);
			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				title: data.timestamp,
			});
			// console.log(i)

			latlngbounds.extend(marker.position);
			(function (marker, data) {
				google.maps.event.addListener(marker, 'click', function (e) {
					infoWindow.setContent(data.timestamp);
					infoWindow.open(map, marker);
				});
			})(marker, data);
		}
		map.setCenter(latlngbounds.getCenter());
		map.fitBounds(latlngbounds);

		//***********ROUTING****************//

		//Initialize the Direction Service
		var service = new google.maps.DirectionsService();

		//Loop and Draw Path Route between the Points on MAP
		for (var i = 0; i < lat_lng.length; i++) {
			if ((i + 1) < lat_lng.length) {
				var src = lat_lng[i];
				var des = lat_lng[i + 1];
				// path.push(src);

				service.route({
					origin: src,
					destination: des,
					travelMode: google.maps.DirectionsTravelMode.WALKING,
				}, function (result, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						//Initialize the Path Array
						var path = new google.maps.MVCArray();
						//Set the Path Stroke Color
						var poly = new google.maps.Polyline({
							map: map,
							strokeColor: '#4986E7',
							strokeWeight: 5,
						});
						poly.setPath(path);
						for (
							var i = 0,
								len = result.routes[0].overview_path.length;
							i < len;
							i++
						) {
							path.push(result.routes[0].overview_path[i]);
						}

						poly.addListener('mouseover', () => {
							poly.setOptions({
								strokeWeight: 10,
								strokeColor: '#49bde7',
							});
						});

						poly.addListener('mouseout', () => {
							setTimeout(() => {
								poly.setOptions({
									strokeWeight: 5,
									strokeColor: '#4986E7',
								});
							}, 100);
						});
					}
				});
			}
		}
	};

	document.head.appendChild(script);
});

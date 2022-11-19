/* charts.js */

window.addEventListener('DOMContentLoaded', (event) => {
	console.log('DOMContentLoaded');

	// const date = new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738));
	// console.log(date)

	var script = document.createElement('script');
	script.src =
		'https://maps.googleapis.com/maps/api/js?key=AIzaSyBMN0tTYpnYsYcy62DPJoLB_bqZqHnNVDU&callback=initMap';
	script.async = true;

	// Chart bit
	const instore = document.getElementById('instore');
	const accepted = document.getElementById('accepted');
	// const delivered = document.getElementById('delivered')
	const totalInstore = document.getElementById('admin-total-instore');
	const totalAccepted = document.getElementById('admin-total-in-transit');

	if (document.getElementById('myChartAdmin')) {
		const context = document.getElementById('myChartAdmin').getContext(
			'2d',
		);
		const myChartAdmin = new Chart(context, {
			type: 'pie',
			data: {
				labels: [
					`In-transit (${totalAccepted.innerHTML})`,
					`Total in Wearhouse (${totalInstore.innerHTML})`,
				],
				datasets: [{
					label: '# of parcels',
					data: [totalAccepted.innerHTML, totalInstore.innerHTML],
					backgroundColor: [
						'rgba(255, 238, 88, 0.83)',
						'rgba(255, 167, 38, 0.83)',
					],
					borderColor: [
						'rgba(255, 238, 88, 0.83)',
						'rgba(255, 167, 38, 0.83)',
					],
					borderWidth: 1,
					hoverOffset: 4,
				}],
			},
			options: {
				plugins: {
					legend: {
						labels: {
							// This more specific font property overrides the global property
							font: {
								size: 14,
							},
						},
					},
				},
				// scales: {
				// 	y: {
				// 		beginAtZero: true
				// 	}
				// }
			},
		});
	} else if (document.getElementById('myChartCourier')) {
		const ctx = document.getElementById('myChartCourier').getContext('2d');
		const myChartCourier = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: [
					`Accepted (${accepted.innerHTML})`,
					`In Wearhouse (${instore.innerHTML})`,
				],
				datasets: [{
					label: '# of parcels',
					data: [accepted.innerHTML, instore.innerHTML],
					backgroundColor: [
						'rgba(255, 238, 88, 0.83)',
						'rgba(255, 167, 38, 0.83)',
					],
					borderColor: [
						'rgba(255, 238, 88, 0.83)',
						'rgba(255, 167, 38, 0.83)',
					],
					borderWidth: 1,
					hoverOffset: 4,
				}],
			},
			options: {
				plugins: {
					legend: {
						labels: {
							// This more specific font property overrides the global property
							font: {
								size: 14,
							},
						},
					},
				},
				// scales: {
				// 	y: {
				// 		beginAtZero: true
				// 	}
				// }
			},
		});
	}

	//Pick-up postcode
	const start = document.getElementById('sender_postcode').innerHTML;
	//Drop-off postcode
	const end = document.getElementById('recipient_postcode').innerHTML;
	const startFullAdd = document.getElementById('sender_address').innerHTML;
	const endFullAdd = document.getElementById('recipient_address').innerHTML;

	//Initialize the map
	window.initMap = () => {
		//Fetch request to get the geolocation (lat and lng) based on postcode to later display
		//the markers and the line between them
		const url1 =
			`https://maps.googleapis.com/maps/api/geocode/json?address=${start}&key=AIzaSyDD8R7YovtasMKrrOIp8D29AoFiJH8fKSE`;
		const url2 =
			`https://maps.googleapis.com/maps/api/geocode/json?address=${end}&key=AIzaSyDD8R7YovtasMKrrOIp8D29AoFiJH8fKSE`;
		Promise.all([
			fetch(url1).then((value) => value.json()),
			fetch(url2).then((value) => value.json()),
		]).then((value) => {
			//The lat and lng for pick-up (pos1) and drop-off (pos2) locations based on postcode
			let pos1 = value[0].results[0].geometry.location;
			pos2 = value[1].results[0].geometry.location;
			console.log(pos1);
			const map = new google.maps.Map(
				document.getElementById('map-one-parcel'),
				{
					mapId: '14558a00a81bc942',
					center: pos1,
				},
			);

			//Sets the map to fit the markers and polyline
			let bounds = new google.maps.LatLngBounds();
			bounds.extend(pos1);
			bounds.extend(pos2);
			map.fitBounds(bounds);
			//Tilt effect on the map
			setTimeout(() => {
				map.setTilt(45);
			}, 1500);
			//Creates the polyline
			const path = new google.maps.Polyline({
				path: [pos1, pos2],
				geodesic: true,
				strokeOpacity: 0.0,
				//creates the dotted polyline
				icons: [{
					icon: {
						path: 'M 0,-1 0,1',
						strokeOpacity: 1,
						scale: 4,
					},
					offset: '0',
					repeat: '20px',
				}],
				strokeColor: '#CC2327',
				// //Uncomment for a solid polylineline
				// {{!-- geodesic: true,
				// strokeColor: "#FF0000",
				// strokeOpacity: 1.0,
				// strokeWeight: 3, --}}
			});
			//Creates the first marker (pick-up marker)
			const mark1 = new google.maps.Marker({
				position: pos1,
				icon: {
					url: 'https://i.ibb.co/MBfWrx2/Marker-Pick-Up2.png',
					size: new google.maps.Size(36, 45),
					scaledSize: new google.maps.Size(36, 45),
					anchor: new google.maps.Point(17, 48),
				},
				animation: google.maps.Animation.DROP,
			});
			//Creates the second marker (drop-off marker)
			const mark2 = new google.maps.Marker({
				position: pos2,
				icon: {
					url: 'https://i.ibb.co/G0fpVRx/Marker-Drop-Off2.png',
					size: new google.maps.Size(36, 45),
					scaledSize: new google.maps.Size(36, 45),
					anchor: new google.maps.Point(17, 48),
				},
				animation: google.maps.Animation.DROP,
			});
			//Adds path and markers to map object
			path.setMap(map);
			mark1.setMap(map);
			mark2.setMap(map);

			//Content within the pop-out window for pick-up marker
			const contentString1 =
				'<div ><h2 id="firstHeading" class="firstHeading">Pick-up</h2></div><br>' +
				`<p style="font-size: 14px"><b>Address:</b> ${startFullAdd}`;

			//Content within the pop-out window for drop-off marker
			const contentString2 =
				'<h2 id="firstHeading" class="firstHeading">Drop-off</h2><br>' +
				`<p style="font-size: 14px"><b>Address:</b> ${endFullAdd}`;

			//Pop-out window (for pick-up maker - infowindow)
			const infoWindowOptions1 = {
				content: contentString1,
				maxWidth: 200,
			};

			//Pop-out window (for drop-off maker - infowindow)
			const infoWindowOptions2 = {
				content: contentString2,
				maxWidth: 200,
			};

			//Create pop-out windows objects
			const infoWindow1 = new google.maps.InfoWindow(infoWindowOptions1);
			const infoWindow2 = new google.maps.InfoWindow(infoWindowOptions2);

			//Options to attach to map and display from "mark1"/pick-up marker as the source
			const infoWindowOptionsOpen1 = {
				map: map,
				anchor: mark1,
				shouldFocus: true,
			};

			//Options to attach to map and display from "mark2"/drop-off marker as the source
			const infoWindowOptionsOpen2 = {
				map: map,
				anchor: mark2,
				shouldFocus: true,
			};
			//Event listener to open the infowindow when clicking the pick-up marker
			mark1.addListener('click', (ev) => {
				infoWindow1.open(infoWindowOptionsOpen1);
			});
			//Event listener to open the infowindow when clicking the drop-off marker
			mark2.addListener('click', (ev) => {
				infoWindow2.open(infoWindowOptionsOpen2);
			});

			//Event listener to close infowindow when clicking the map
			map.addListener('click', (ev) => {
				infoWindow1.close(infoWindowOptionsOpen1);
				infoWindow2.close(infoWindowOptionsOpen2);
			});

			//Buttons with settings
			const buttons = [
				///These names are the ones used to display the UI (for the google icons span ting)
				[
					'navigate_before',
					'rotate',
					20,
					google.maps.ControlPosition.LEFT_CENTER,
				],
				[
					'navigate_next',
					'rotate',
					-20,
					google.maps.ControlPosition.RIGHT_CENTER,
				],
				[
					'expand_less',
					'tilt',
					-10,
					google.maps.ControlPosition.TOP_CENTER,
				],
				[
					'expand_more',
					'tilt',
					10,
					google.maps.ControlPosition.BOTTOM_CENTER,
				],
			];

			buttons.forEach(([text, mode, amount, position]) => {
				const controlDiv = document.createElement('div');
				const controlUI = document.createElement('div');
				const span = document.createElement('span');
				span.classList.add('material-symbols-outlined');
				span.setAttribute('id', 'arrows');
				span.innerText = `${text}`;

				controlUI.append(span);

				controlUI.style.transform = 'scale(1.5)';
				controlUI.style.padding = '0.35rem 0.35rem';

				controlUI.addEventListener('mouseover', () => {
					document.body.style.cursor = 'pointer';
				});

				controlUI.addEventListener('click', () => {
					adjustMap(mode, amount);
				});
				controlDiv.appendChild(controlUI);
				map.controls[position].push(controlDiv);
			});

			const adjustMap = function (mode, amount) {
				switch (mode) {
					case 'tilt':
						map.setTilt(map.getTilt() + amount);
						break;
					case 'rotate':
						map.setHeading(map.getHeading() + amount);
						break;
					default:
						break;
				}
			};
		}).catch((err) => {
			console.log(err);
			if (err) display();
		});
	};
	document.head.appendChild(script);
});

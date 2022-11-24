window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded');

	// const date = Date.now();

	// console.log(new Intl.DateTimeFormat('gb-EU',{ dateStyle: 'full', timeStyle: 'short' }).format(date));

	var script = document.createElement('script');
	script.src =
		'https://maps.googleapis.com/maps/api/js?key=AIzaSyBMN0tTYpnYsYcy62DPJoLB_bqZqHnNVDU&libraries=places,geometry&callback=initMap';
	script.async = true;

	window.initMap = async function () {
		const map = new google.maps.Map(document.getElementById('map-bitch'), {
			mapTypeControl: false,
			disableDefaultUI: true,
			center: { lat: 51.509276, lng: -0.146909 },
			zoom: 8,
		});

		new AutocompleteDirectionsHandler(map);
	};

	class AutocompleteDirectionsHandler {
		map;
		originPlaceId;
		destinationPlaceId;
		poly;
		poly2;
		bounds;
		geocoder;
		orgMarker;
		dstMarker;
		orgLat;
		orgLng;
		dstLat;
		dstLng;
		orgLatLng;
		dstLatLng;
		constructor(map) {
			this.map = map;
			this.originPlaceId = '';
			this.destinationPlaceId = '';

			this.orgLat = '';
			this.orgLng = '';
			this.desLat = '';
			this.desLng = '';

			this.orgLatLng = '';
			this.dstLatLng = '';

			this.directionsService = new google.maps.DirectionsService();
			this.directionsRenderer = new google.maps.DirectionsRenderer();
			this.geocoder = new google.maps.Geocoder();
			this.orgMarker = new google.maps.Marker({
				map: map,
				animation: google.maps.Animation.DROP,
			});
			this.dstMarker = new google.maps.Marker({
				map: map,
				animation: google.maps.Animation.DROP,
			});

			this.bounds = new google.maps.LatLngBounds();

			this.poly = new google.maps.Polyline({
				map: this.map,
				strokeColor: '#000000',
				strokeOpacity: 1.0,
				strokeWeight: 3,
			});

			const originInput = document.getElementById('origin-input');
			const destinationInput = document.getElementById(
				'destination-input',
			);

			// Specify just the place data fields that you need.
			const originAutocomplete = new google.maps.places.Autocomplete(
				originInput,
				{
					componentRestrictions: { country: 'uk' },
					fields: ['place_id', 'geometry'],
				},
			);
			// Specify just the place data fields that you need.
			const destinationAutocomplete = new google.maps.places.Autocomplete(
				destinationInput,
				{
					componentRestrictions: { country: 'uk' },
					fields: ['place_id', 'geometry'],
				},
			);

			this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
			this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

			document.getElementById('clear-button').addEventListener(
				'click',
				() => {
					// location.reload()

					this.orgLat = '';
					this.orgLng = '';
					this.desLat = '';
					this.desLng = '';

					originInput.value = '';
					destinationInput.value = '';

					this.dstMarker.setVisible(false);
					this.orgMarker.setVisible(false);
					this.poly.getPath().pop();
					this.poly.getPath().pop();
				},
			);
		}

		setupPlaceChangedListener(autocomplete, mode) {
			// autocomplete.bindTo('bounds', this.map);
			autocomplete.addListener('place_changed', () => {
				const place = autocomplete.getPlace();
				this.poly.getPath().pop();
				this.poly.getPath().pop();

				// this.map.setBound(this.orgMarker)
				// this.poly.setMap(null);
				if (!place.place_id) {
					window.alert(
						'Please enter a real address.',
					);
					return;
				}
				let lat = place.geometry.location.lat(),
					lng = place.geometry.location.lng();

				// console.log(lat, lng);

				if (mode === 'ORIG') {
					// this.originPlaceId = place.place_id;
					document.cookie = `ORIG_LAT=${lat}`;
					document.cookie = `ORIG_LNG=${lng}`;
					document.cookie = `ORIG_PLACE_ID=${place.place_id}`;
					this.originPlaceId = place.place_id;
					this.orgLat = lat;
					this.orgLng = lng;

					this.orgLatLng = place.geometry.location;

					this.geocoder
						.geocode({ placeId: place.place_id })
						.then(({ results }) => {
							this.map.setZoom(11);
							this.map.setCenter(results[0].geometry.location);
							// Set the position of the marker using the place ID and location.
							// @ts-ignore TODO This should be in @typings/googlemaps.
							this.orgMarker.setPlace({
								placeId: place.place_id,
								location: results[0].geometry.location,
							});
							this.orgMarker.setVisible(true);
						})
						.catch((e) =>
							window.alert('Geocoder failed due to: ' + e)
						);
				} else {
					// this.destinationPlaceId = place.place_id;
					document.cookie = `DEST_LAT=${lat}`;
					document.cookie = `DEST_LNG=${lng}`;
					document.cookie = `DEST_PLACE_ID=${place.place_id}`;
					this.destinationPlaceId = place.place_id;
					this.desLat = lat;
					this.desLng = lng;

					this.dstLatLng = place.geometry.location;

					this.geocoder
						.geocode({ placeId: place.place_id })
						.then(({ results }) => {
							this.map.setZoom(11);
							this.map.setCenter(results[0].geometry.location);
							// Set the position of the marker using the place ID and location.
							// @ts-ignore TODO This should be in @typings/googlemaps.
							this.dstMarker.setPlace({
								placeId: place.place_id,
								location: results[0].geometry.location,
							});
							this.dstMarker.setVisible(true);
						})
						.catch((e) =>
							window.alert('Geocoder failed due to: ' + e)
						);
				}
				// console.log('this is orgLatLng', this.orgLatLng);

				this.route();
			});
		}
		route() {
			if (!this.originPlaceId || !this.destinationPlaceId) {
				return;
			}
			this.poly.getPath().push(this.orgLatLng);
			this.poly.getPath().push(this.dstLatLng);

			this.poly.setMap(this.map);

			// const lineCoordinates = [{lat: this.orgLat, lng: this.orgLng, lat: this.desLat, lng: this.desLng }]
			// const bounds = new google.maps.LatLngBounds()

			console.log(this.orgLat);
			console.log(this.orgLng);
			console.log(this.desLat);
			console.log(this.desLng);

			// if (this.originPlaceId && this.destinationPlaceId) {
			// 	for (var i = 0; i < lineCoordinates.length; i++) {
			// 		var pos = new google.maps.LatLng(lineCoordinates[i].lat, lineCoordinates[i].lng);
			// 		bounds.extend(pos);
			// 	}

			// 	//fit the map within the bounds
			// 	map.fitBounds(bounds);
			// }
		}
	}
	document.head.appendChild(script);
});

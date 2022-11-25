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
			this.dstLat = '';
			this.dstLng = '';

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
			
			// let pos1 = {lat: this.orgMarker.location.lat(), lng: this.orgMarker.location.lat()}
			// this.bounds.extend()
			// this.bounds.extend(this.dstMarker.location)
			
			// this.map.fitBounds(this.bounds)
			
			
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
					// Fix the clear button for the polyline as it rememberes the last inputed address
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
					

					if (mode === 'ORIG') {
						// this.originPlaceId = place.place_id;
						document.cookie = `ORIG_LAT=${lat}`;
						document.cookie = `ORIG_LNG=${lng}`;
						document.cookie = `ORIG_PLACE_ID=${place.place_id}`;
						this.originPlaceId = place.place_id;
						this.orgLat = lat;
						this.orgLng = lng;
						
						// this.bounds.extend(place.geometry.location)
						this.orgLatLng = place.geometry.location;
						this.orgMarker.setPlace({
							placeId: place.place_id,
							location: place.geometry.location,
						});
						this.orgMarker.setVisible(true);			
						
						
					} else {
						// this.destinationPlaceId = place.place_id;
						document.cookie = `DEST_LAT=${lat}`;
						document.cookie = `DEST_LNG=${lng}`;
						document.cookie = `DEST_PLACE_ID=${place.place_id}`;
						this.destinationPlaceId = place.place_id;
						this.dstLat = lat;
						this.dstLng = lng;
						
						// this.bounds.extend(place.geometry.location)
						this.dstLatLng = place.geometry.location;
						this.dstMarker.setPlace({
							placeId: place.place_id,
							location: place.geometry.location,
						});
						this.dstMarker.setVisible(true);			
						
					}
					
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
								
				let markerList = [
					{
						lat: this.orgMarker.getPlace().location.lat(),
						lng: this.orgMarker.getPlace().location.lng()
					},
					{
						lat: this.dstMarker.getPlace().location.lat(),
						lng: this.dstMarker.getPlace().location.lng()
					},
				]
			
				this.centralize(markerList)		
				
		}
		
		centralize(markerList) {
			const bounds = new google.maps.LatLngBounds();
			markerList.forEach((marker) => {
				bounds.extend(new google.maps.LatLng(marker.lat, marker.lng))
			})
			this.map.fitBounds(bounds)
		}

	}
	document.head.appendChild(script);
});

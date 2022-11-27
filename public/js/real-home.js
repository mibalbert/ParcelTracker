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
		
		
		var p1 = new google.maps.LatLng(37.420672, -122.157504)
		console.log(p1)
		var p2 = new google.maps.LatLng(37.465234, -122.135240);
		
		drawDashedCurve(p1, p2, map);
		
		
		var straightPoly = new google.maps.Polyline({
				map:map,
				path: [p1, p2],
				strokeOpacity: 0.2,
				strokeColor: "blue"
				});
				var markerP1 = new google.maps.Marker({
				position: p1,
				map:map,
				icon: {
				path: google.maps.SymbolPath.CIRCLE,
				scale: 4,
				fillColor: "black",
				fillOpacity: 1.0,
				draggable: true,
				}
				});
						var markerP2 = new google.maps.Marker({
				position: p2,
				map:map,
				icon: {
				path: google.maps.SymbolPath.CIRCLE,
				scale: 4,
				fillColor: "black",
				fillOpacity: 1.0,
				draggable: true,
				}
			});
			
		}
		
		function drawDashedCurve(P1, P2, map) {
			var lineLength = google.maps.geometry.spherical.computeDistanceBetween(P1, P2);
			var lineHeading = google.maps.geometry.spherical.computeHeading(P1, P2);
			if (lineHeading < 0) {
				var lineHeading1 = lineHeading + 45;
				var lineHeading2 = lineHeading + 135;
			} else {
				var lineHeading1 = lineHeading + -45;
				var lineHeading2 = lineHeading + -135;
			}
			var pA = google.maps.geometry.spherical.computeOffset(P1, lineLength / 2.2, lineHeading1);
			var pB = google.maps.geometry.spherical.computeOffset(P2, lineLength / 2.2, lineHeading2);
		
			var curvedLine = new GmapsCubicBezier(P1, pA, pB, P2, 0.01, map);
		}
		
		var GmapsCubicBezier = function(latlong1, latlong2, latlong3, latlong4, resolution, map) {
			var lat1 = latlong1.lat();
			var long1 = latlong1.lng();
			var lat2 = latlong2.lat();
			var long2 = latlong2.lng();
			var lat3 = latlong3.lat();
			var long3 = latlong3.lng();
			var lat4 = latlong4.lat();
			var long4 = latlong4.lng();
			
			var points = [];
			
			for (let it = 0; it <= 1; it += resolution) {
				points.push(this.getBezier({
					x: lat1,
					y: long1
				}, {
					x: lat2,
					y: long2
				}, {
					x: lat3,
					y: long3
				}, {
					x: lat4,
					y: long4
				}, it));
			}
			var path = [];
			for (var i = 0; i < points.length - 1; i++) {
				path.push(new google.maps.LatLng(points[i].x, points[i].y));
				path.push(new google.maps.LatLng(points[i + 1].x, points[i + 1].y, false));
			}
					
		
			var Line = new google.maps.Polyline({
				path: path,
				geodesic: true,
				strokeOpacity: 0.0,
				icons: [{
					icon: {
						path: 'M 0,-1 0,1',
						strokeOpacity: 1,
						scale: 4
					},
					offset: '0',
					repeat: '20px'
				}],
				strokeColor: 'grey'
			});
		
			Line.setMap(map);
		
			return Line;
		};
		
		
		GmapsCubicBezier.prototype = {
		
			B1: function(t) {
				return t * t * t;
			},
			B2: function(t) {
				return 3 * t * t * (1 - t);
			},
			B3: function(t) {
				return 3 * t * (1 - t) * (1 - t);
			},
			B4: function(t) {
				return (1 - t) * (1 - t) * (1 - t);
			},
			getBezier: function(C1, C2, C3, C4, percent) {
				var pos = {};
				pos.x = C1.x * this.B1(percent) + C2.x * this.B2(percent) + C3.x * this.B3(percent) + C4.x * this.B4(percent);
				pos.y = C1.y * this.B1(percent) + C2.y * this.B2(percent) + C3.y * this.B3(percent) + C4.y * this.B4(percent);
				return pos;
			}
		}
		
	;

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
					lng: this.orgMarker.getPlace().location.lng(),
				},
				{
					lat: this.dstMarker.getPlace().location.lat(),
					lng: this.dstMarker.getPlace().location.lng(),
				},
			];
			this.centralize(markerList);
		}

		centralize(markerList) {
			const bounds = new google.maps.LatLngBounds();
			markerList.forEach((marker) => {
				bounds.extend(new google.maps.LatLng(marker.lat, marker.lng));
			});
			// this.map.fitBounds(bounds);
			this.map.setCenter(bounds.getCenter()); //or use custom center
			this.map.fitBounds(bounds);
			this.map.setZoom(this.map.getZoom() - 0.8); 
			if(this.map.getZoom() > 15){
				this.map.setZoom(15);
			}
		}


		
    
    
	}
	document.head.appendChild(script);
});

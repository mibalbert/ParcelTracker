// /* courier-route.js */

window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded');

	var script = document.createElement('script');
	script.src =
		'https://maps.googleapis.com/maps/api/js?key=AIzaSyBMN0tTYpnYsYcy62DPJoLB_bqZqHnNVDU&callback=initMap';
	script.async = true;


	window.initMap = async function() {
		
		let waypoints = []
		document.querySelectorAll('.recipient_postcode').forEach((item) => {
			let postcode = item.getAttribute('value');
			waypoints.push(postcode);
		});
		let markers = Array();

		// this will execute the promises sequentially
		for (const el of waypoints) {
		  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${el}&key=AIzaSyDD8R7YovtasMKrrOIp8D29AoFiJH8fKSE`;
		  try {
			const res = await fetch(url);
			const value = await res.json(); // alternatively, in a single line: await fetch(..).then(res => res.json());
			let pos = value.results[0].geometry.location;
			markers.push(pos);	
	
		} catch (err) {
			console.log(err);
			display();
		  }
		}
		
		let mapOptions = {
			// center: new google.maps.LatLng(markers[0].latitude, markers[0].longitude),
			center: markers[0],
			// center: 
			zoom: 10,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		const map = new google.maps.Map(document.getElementById("routes-map"), mapOptions);

		for (const marks of markers) {
			const mark = new google.maps.Marker({
				position: marks,
				icon: {
				url: "https://i.ibb.co/G0fpVRx/Marker-Drop-Off2.png",
				size: new google.maps.Size(36, 45),
				scaledSize: new google.maps.Size(36, 45),
				anchor: new google.maps.Point(17, 48)
				},
				animation: google.maps.Animation.DROP,
		});
		mark.setMap(map);
		}
		var markers2 = [{
			"timestamp": 'Alibaug',
			"latitude": '18.641400',
			"longitude": '72.872200',
			"description": 'Alibaug is a coastal town and a municipal council in Raigad District in the Konkan region of Maharashtra, India.'
		  },
		  {
			"timestamp": 'Mumbai',
			"latitude": '18.964700',
			"longitude": '72.825800',
			"description": 'Mumbai formerly Bombay, is the capital city of the Indian state of Maharashtra.'
		  },
		  {
			"timestamp": 'Pune',
			"latitude": '18.523600',
			"longitude": '73.847800',
			"description": 'Pune is the seventh largest metropolis in India, the second largest in the state of Maharashtra after Mumbai.'
		  },
		  {
			"timestamp": 'Bhopal',
			"latitude": '23.2599',
			"longitude": '73.857800',
			"description": 'Pune is the seventh largest metropolis in India, the second largest in the state of Maharashtra after Mumbai.'
		  },
		  {
			"timestamp": 'Bhopal',
			"latitude": '26.9124',
			"longitude": '75.7873',
			"description": 'Pune is the seventh largest metropolis in India, the second largest in the state of Maharashtra after Mumbai.'
		  }
		];

		var infoWindow = new google.maps.InfoWindow();
		let bounds = new google.maps.LatLngBounds();
		var service = new google.maps.DirectionsService();
		
		var lat_lng = new Array();
		for (let i = 0; i < markers.length; i++) {
		
			var myLatlng = new google.maps.LatLng(markers[i]);
			lat_lng.push(myLatlng);
		}
		
		bounds.extend(markers[0]);
		bounds.extend(markers[1]);
		map.fitBounds(bounds);
		//Tilt effect on the map
		map.setTilt(45)
		
		//Initialize the Direction Service
		
	
		for (var i = 0; i < lat_lng.length; i++) {
			if ((i + 1) < lat_lng.length) {
				var src = lat_lng[i];
				var des = lat_lng[i + 1];
				// path.push(src);
		
				service.route({
				origin: src,
				destination: des,
				travelMode: google.maps.DirectionsTravelMode.DRIVING
				}, function(result, status) {
				if (status == google.maps.DirectionsStatus.OK) {
		
					//Initialize the Path Array
					var path = new google.maps.MVCArray();
					//Set the Path Stroke Color
					var poly = new google.maps.Polyline({
					map: map,
					strokeColor: '#4986E7'
					});
					poly.setPath(path);
					for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
						path.push(result.routes[0].overview_path[i]);
					}
				}
			});}}
	}
	document.head.appendChild(script);
});





















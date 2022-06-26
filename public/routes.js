
window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded')


    // console.log(document.getElementsByClassName('routes-table-row'))
    

    //Create the script tag, set the appropriate attributes
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBMN0tTYpnYsYcy62DPJoLB_bqZqHnNVDU&callback=initMap';
    script.async = true;
        

    var directionDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;

    
    window.initMap = function() {
        
        directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true
        });

        var myOptions = {
            zoom: 3,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        }

        map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        directionsDisplay.setMap(map);
        calcRoute();
        
    }

    function calcRoute() {

        var waypts = [];

        stop = new google.maps.LatLng(51.943571, 6.463856)
        waypts.push({
            location: stop,
            stopover: true
        });
        stop = new google.maps.LatLng(51.945032, 6.465776)
        waypts.push({
            location: stop,
            stopover: true
        });
        stop = new google.maps.LatLng(51.945538, 6.469413)
        waypts.push({
            location: stop,
            stopover: true
        });
        stop = new google.maps.LatLng(51.947462, 6.467941)
        waypts.push({
            location: stop,
            stopover: true
        });
        stop = new google.maps.LatLng(51.945409, 6.465562)
        waypts.push({
            location: stop,
            stopover: true
        });
        stop = new google.maps.LatLng(51.943700, 6.462096)
        waypts.push({
            location: stop,
            stopover: true
        });

        start = new google.maps.LatLng(51.943382, 6.463116);
        end = new google.maps.LatLng(51.943382, 6.463116);
        
        createMarker(start);
        
        var request = {
            origin: start,
            destination: end,
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: google.maps.DirectionsTravelMode.WALKING
        };

        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                var route = response.routes[0];
            }
        });
    }

    function createMarker(latlng) {
        
        var marker = new google.maps.Marker({
            position: latlng,
            map: map
        });
    }



	document.head.appendChild(script);
        

})

    
    
		


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
    


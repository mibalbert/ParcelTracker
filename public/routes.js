
window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded')


    console.log(document.getElementsByClassName('routes-table-row'))
    

    //Create the script tag, set the appropriate attributes
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBMN0tTYpnYsYcy62DPJoLB_bqZqHnNVDU&callback=initMap';
    script.async = true;
        

    // Attach your callback function to the `window` object
    window.initMap = function() {
        // JS API is loaded and available
        let map;
        map = new google.maps.Map(document.getElementById("routes-map"), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
				disableDefaultUI: true,
        });
            
    }
		

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
    document.head.appendChild(script);
        

})


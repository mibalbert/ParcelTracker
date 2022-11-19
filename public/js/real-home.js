
window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded');

    // const date = Date.now();

	// console.log(new Intl.DateTimeFormat('gb-EU',{ dateStyle: 'full', timeStyle: 'short' }).format(date));


	var script = document.createElement('script');
	script.src =
		'https://maps.googleapis.com/maps/api/js?key=AIzaSyBMN0tTYpnYsYcy62DPJoLB_bqZqHnNVDU&libraries=places,geometry&callback=initMap';
	script.async = true;


	// const departureCookie = sessionStorage.getItem('departure');
	// const arrivalCookie = sessionStorage.getItem('arrival');

	// departure.value = departureCookie
	// arrival.value = arrivalCookie
	
	// departure.addEventListener('input', function (e) {
	// 	// if (e.key === 'Enter') {
	// 	  sessionStorage.setItem('departure', e.target.value)
	// 	// }
	// });
	
	// arrival.addEventListener('input', function (e) {
	// 	// if (e.key === 'Enter') {
	// 	  sessionStorage.setItem('arrival', e.target.value)
	// 	// }
	// });
	
	

	
	// sessionStorage.removeItem('departure');
	// sessionStorage.removeItem('arrival');
	
	const departure = document.getElementById('departure')
	const arrival = document.getElementById('arrival')

	window.initMap = async function() {
		// const directionsService = new google.maps.DirectionsService();
		// const directionsRenderer = new google.maps.DirectionsRenderer();
		
		let map = new google.maps.Map(document.getElementById("map-bitch"), {
		  center: { lat: 51.482447, lng: -0.138447 },
		  zoom: 8,
		})
		
		let autocompleteDep = new google.maps.places.Autocomplete(
			departure,
			{
				componentRestrictions: {'country': ['UK']},
				fields: ['address_components', 'geometry', 'name']
			}
		)
		let autocompleteArrv = new google.maps.places.Autocomplete(
			arrival,
			{
				componentRestrictions: {'country': ['UK']},
				fields: ['address_components', 'geometry', 'name']
			}
		)
		departure.addEventListener("change", function(){
			departure.value = "";
		});
		
		arrival.addEventListener("change", function(){
			arrival.value = "";
		});

		autocompleteDep.addListener('place_changed', fillInAddressSender)
		autocompleteArrv.addListener('place_changed', fillInAddressRecipient)
		
		const markerDeparture =  new google.maps.Marker({
			map: map,
		});


		
		function fillInAddressSender() {
			// Get the place details from the autocomplete object.
			const place = autocompleteDep.getPlace()
			
			let senderStreetName, senderPostcode, senderStreetNumber, senderTown

			sessionStorage.setItem('sendLat', place.geometry.location.lat().toString()) 
			sessionStorage.setItem('sendLng', place.geometry.location.lng().toString()) 

			// console.log(place.name)

			try{
				for (const component of place.address_components) {
					
					const componentType = component.types[0]
					
					switch (componentType) {
						case "street_number": {
						senderStreetNumber = component.long_name;
						break;
						}
				
						case "route": {
							senderStreetName = component.short_name;
						break;
						}
				
						case "postal_code": {
						senderPostcode = component.long_name;
						break;
						}

						case "postal_town": {
							senderTown = component.long_name;
							break;
						}
						
					}
				}
				// console.log(senderStreetNumber, ";", senderStreetName, ";", senderPostcode, ";",senderTown )

				sessionStorage.setItem('sendStreetNum', senderStreetNumber) 
				sessionStorage.setItem('sendStreetName', senderStreetName) 
				sessionStorage.setItem('sendPostalCode', senderPostcode) 
				sessionStorage.setItem('sendPostalTown', senderTown) 
	
			} catch(err){
				console.log(err)
			}
		}
		
		function fillInAddressRecipient() {
		// Get the place details from the autocomplete object.
			const place2 = autocompleteArrv.getPlace()
			
			let recipStreetName, recipPostcode, recipStreetNumber, recipTown
	
			sessionStorage.setItem('recipLat', place2.geometry.location.lat().toString()) 
			sessionStorage.setItem('recipLng', place2.geometry.location.lng().toString()) 
	
			// console.log(place2.name)
	
			try{
				for (const component of place2.address_components) {
					
					const componentType = component.types[0]
					
					switch (componentType) {
						case "street_number": {
							recipStreetNumber = component.long_name;
						break;
						}
				
						case "route": {
							recipStreetName = component.short_name;
						break;
						}
				
						case "postal_code": {
							recipPostcode = component.long_name;
						break;
						}
	
						case "postal_town": {
							recipTown = component.long_name;
							break;
						}
						
					}
				}
				// console.log(recipStreetNumber, recipStreetName, recipPostcode, recipTown )
				sessionStorage.setItem('recipStreetNum', recipStreetNumber) 
				sessionStorage.setItem('recipStreetName', recipStreetName) 
				sessionStorage.setItem('recipPostalCode', recipPostcode) 
				sessionStorage.setItem('recipPostalTown', recipTown) 
		
			} catch(err){
				console.log(err)
			}
		}
	}
	document.head.appendChild(script);
})









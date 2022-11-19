/* send.js */

window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded');


	var script = document.createElement('script');
	script.src =
		'https://maps.googleapis.com/maps/api/js?key=AIzaSyBMN0tTYpnYsYcy62DPJoLB_bqZqHnNVDU&libraries=places,geometry&callback=initAutocomplete';
	script.async = true;

	//Change value displayed when moving slider 
	const slider = document.querySelector('[name=weight_kg]')
	slider.addEventListener('input', event => {
		document.querySelector('[name=weight_value]').value = slider.value
	})

	let autocomplete
	let autocomplete2
	let sender_address
	let sender_address_details
	let sender_postcode
	let sender_city
	let sender_country
	let recipient_address
	let recipient_address_details
	let recipient_postcode 
	let recipient_city 
	let recipient_country       

	const alert = document.getElementById('alert') 

	window.initAutocomplete = async function() {
		sender_address = document.querySelector("[name=sender_address]")
		sender_address_details = document.querySelector("[name=sender_address_details]")
		sender_city = document.querySelector("[name=sender_city]")
		sender_postcode = document.querySelector("[name=sender_postcode]")
		sender_country = document.querySelector("[name=sender_country]")

		recipient_address = document.querySelector("[name=recipient_address]")
		recipient_address_details = document.querySelector("[name=recipient_address_details]")
		recipient_postcode = document.querySelector("[name=recipient_postcode]")
		recipient_city = document.querySelector("[name=recipient_city]")
		recipient_country = document.querySelector("[name=recipient_country]")
		
		autocomplete = new google.maps.places.Autocomplete(sender_address, {
			componentRestrictions: { country: ["uk"] },
			fields: ["address_components", "geometry"],
			types: ["address"],
		});
		
		autocomplete2 = new google.maps.places.Autocomplete(recipient_address, {
			componentRestrictions: { country: ["uk"] }, //no-restrictions, add uk or usa for restrictions
			fields: ["address_components", "geometry"],
			types: ["address"],
		});
		
		sender_address.focus()
		
		autocomplete.addListener("place_changed", fillInAddressSender)
		autocomplete2.addListener("place_changed", fillInAddressRecipient)
	}

	function fillInAddressSender() {
	// Get the place details from the autocomplete object.
		const place = autocomplete.getPlace()
		console.log(place)
		let sender_address1 = ""
		let sender_postcode1 = ""

		try{
			for (const component of place.address_components) {
				const componentType = component.types[0]

				switch (componentType) {
				case "street_number": {
					sender_address1 = `${component.long_name} ${sender_address1}`
					break
				}

				case "route": {
					sender_address1 += component.short_name
					break
				}
				case "postal_code": {
					sender_postcode1 = `${component.long_name}${sender_postcode1}`
					break
				}
				case "postal_code_suffix": {
					sender_postcode1 = `${sender_postcode1}-${component.long_name}`
					console.log(sender_postcode1)
					break
				}
				case "postal_town":{
					sender_city.value = component.long_name
					break
				} 
				case "locality":{
					sender_city.value = component.long_name
					break
				}
				case "country":
					sender_country.value = component.long_name
					break
				}
			}
		} catch(err){
			alert.innerHTML = 'Try inserting the Address again' 
			alert.style.display = 'block'
			setTimeout( ()=>{
				alert.style.display = 'none'
				}, 1500)
	}
		
	sender_address.value = sender_address1
	sender_postcode.value = sender_postcode1
	recipient_address.focus()
	}

	function fillInAddressRecipient() {
	// Get the place details from the autocomplete object.
		const place = autocomplete2.getPlace()
		let recipient_address1 = ""
		let recipient_postcode1 = ""

		try{
			for (const component of place.address_components) {
				const componentType = component.types[0]

				switch (componentType) {
				case "street_number": {
					//console.log(component)
					//console.log(component.long_name)
					//console.log(address1)
					recipient_address1 = `${component.long_name} ${recipient_address1}`
					break
				}

				case "route": {
					recipient_address1 += component.short_name
					break
				}
				case "postal_code": {
					recipient_postcode1 = `${component.long_name}${recipient_postcode1}`
					break
				}
				case "postal_code_suffix": {
					recipient_postcode1 = `${recipient_postcode1}-${component.long_name}`
					console.log(recipient_postcode1)
					break
				}
				case "postal_town":{
					recipient_city.value = component.long_name
					break
				}
				case "country":
					recipient_country.value = component.long_name
					break
				}
			}
		} catch(err){
			// alert.innerHTML = 'Try inserting the Address again' 
			// alert.style.display = 'block'
			// setTimeout( ()=>{
			// 	alert.style.display = 'none'
			// 	}, 1500)
	}
		
	recipient_address.value = recipient_address1
	recipient_postcode.value = recipient_postcode1
	//recipient_address_details.focus()
	}
	document.head.appendChild(script);
});

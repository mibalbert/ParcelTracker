/* main.js */

window.addEventListener('DOMContentLoaded', (event) => {
	console.log('DOMContentLoaded');


	/// Display dash if empty
	const section = document.querySelector('.parcels')
	const textEmpty = document.querySelector('.empty')
	
	const tableData = document.getElementsByClassName('parcel-td')
	
	if(tableData.length === 0) {
		section.style.display = 'none'
		textEmpty.style.display = 'block'
	}




	/// Alerts
	const alertGreenSuccess = document.querySelector('.uuid-alert-green-success');
	const alertYellowTransit = document.querySelector('.uuid-alert-yellow-transit');
	const alertYellowDelivered = document.querySelector('.uuid-alert-yellow-delivered');
	const alertRedNotFound = document.querySelector('.uuid-alert-red-not-found');
		
	const greenSuccess = sessionStorage.getItem("greenSuccess");
	const yellowTransit = sessionStorage.getItem("yellowTransit");
	const yellowDelivered = sessionStorage.getItem("yellowDelivered");
	const redNotFound = sessionStorage.getItem("redNotFound");
	
	console.log(greenSuccess)
	
	console.log(yellowTransit)
	
	console.log(yellowDelivered)
	
	console.log(redNotFound)
	
	if (greenSuccess) {
		alertGreenSuccess.style.display = 'block'
		sessionStorage.removeItem("greenSuccess");
		setTimeout(function () {
			alertGreenSuccess.style.display = 'none'
			// location.reload()
		}, 1000)
	}
	if (yellowTransit) {
		alertYellowTransit.style.display = 'block'
		sessionStorage.removeItem("yellowTransit");
		setTimeout(function () {
			alertYellowTransit.style.display = 'none'
			// location.reload()
		}, 1000)
	}
	if (yellowDelivered) {
		alertYellowDelivered.style.display = 'block'
		sessionStorage.removeItem("yellowDelivered");
		setTimeout(function () {
			alertYellowDelivered.style.display = 'none'
			// location.reload()
		}, 1000)
	}
	if (redNotFound) {
		alertRedNotFound.style.display = 'block'
		sessionStorage.removeItem("redNotFound");
		setTimeout(function () {
			alertRedNotFound.style.display = 'none'
			// location.reload()
		}, 1000)
	}

	//Handles the text box input
	const inputValue = document.querySelector('input[name=uuid]')
	document.getElementById('insert-uuid-button-accept').addEventListener('click', ()=>{
		// console.log(inputValue.value)
		let value = inputValue.value
		makeCall(value)
	})

	//Handle the 'accept' buttons (individually)
	document.querySelectorAll('.td-transit').forEach((item) => {
		item.addEventListener('click', (event) => {
			console.log(item.getAttribute('value'));
			const uuid = item.getAttribute('value');
			makeCall(uuid);
		});
	});

	function makeCall(uuid) {
		axios.post(window.location.href, {
			uuid: uuid,
		})
			.then(function (response) {
				let code = response.status
				console.log("The code is", code)
				if (code === 200) {
					sessionStorage.setItem('greenSuccess', 'true');
					location.reload()
				}
			})	
			.catch(function (error) {
				let code = error.response.status
				console.log(error.response.status)

				if (code === 409) {
					sessionStorage.setItem('yellowTransit', 'true');
					location.reload()
				} else if (code === 403) {
					sessionStorage.setItem('yellowDelivered', 'true');
					location.reload()
				
				} else if (code === 404) {
					sessionStorage.setItem('redNotFound', 'true');
					location.reload()
				}
			});
	}
});

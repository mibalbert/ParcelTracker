/* main.js */

window.addEventListener('DOMContentLoaded', (event) => {
	console.log('DOMContentLoaded');

	// const alert = document.getElementById('uuid-alert-red')
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
				// const uu = document.querySelector('input[name=uuid]')
				let elem = document.getElementById('uuid-alert-green');
				let code = response.status;
				if (code === 200) {
					console.log(response.data);
					elem.innerHTML = 'It fucking worked';
					// sessionStorage.reloadAfterPageLoad = true
					setTimeout(function () {
						location.reload();
						elem.innerHTML = '';
					}, 1500);
					// elem.innerHTML = response.data.msg
				}
			})
			.catch(function (error) {
				// console.log(error.response.status);
				// console.log(error.response);

				// const uu = document.querySelector('input[name=uuid]')
				// let elem = document.getElementById('uuid-alert-red')

				// elem.innerHTML = error.response.status
				// setTimeout( function(){
				// elem.innerHTML = ""
				// } , 1500)
			});
	}
});

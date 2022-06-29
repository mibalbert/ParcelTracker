/* util.js */

const date_time_now = new Date();

window.addEventListener('DOMContentLoaded', (event) => {
	console.log('DOM CONTENT LOADED');

	const created = document.getElementsByClassName('date_time_created');
	const transit = document.getElementsByClassName('date_time_in_transit');
	const delivered = document.getElementsByClassName('date_time_delivered');

	const button = document.getElementById('insert-uuid-button');
	button.addEventListener('click', makeCall);

	//Add querySelector or Class selector to select all the fileds and shit
	for (let x = 0; x < delivered.length; x++) {
		if (delivered[x].innerHTML === '') delivered[x].innerHTML = '-';
	}
	for (let x = 0; x < transit.length; x++) {
		if (transit[x].innerHTML === '') transit[x].innerHTML = '-';
	}

	const date_time = new Date(created.innerHTML);
	const hours = diff_hours(date_time, date_time_now);

	// Get uuid to make api call
	const uuid = document.querySelector('input[name=uuid]');
	uuid.addEventListener('keypress', async (event) => {
		if (event.keyCode === 13) {
			event.preventDefault();
			makeCall(uuid.value);
			uuid.value = '';
		}
	});
});

function diff_hours(dt2, dt1) {
	let diff = (dt2 - dt1) / 1000;
	diff /= 60 * 60;
	return Math.abs(Math.round(diff));
}

// Fetch api to post uuid to 'accept' parcel
async function makeCall(uuid) {
	axios.post(window.location.href, {
		uuid: uuid,
	})
		.then(function (response) {
			const uu = document.querySelector('input[name=uuid]');
			let elem = document.getElementById('uuid-alert-green');
			let code = response.status;
			if (code === 200) {
				// console.log(response.data.msg)
				elem.innerHTML = response.data.msg;
			}
			setTimeout(function () {
				location.reload();
				elem.innerHTML = '';
			}, 1500);
		})
		.catch(function (error) {
			// console.log(error.response.status);
			// console.log(error.response);

			const uu = document.querySelector('input[name=uuid]');
			let elem = document.getElementById('uuid-alert-red');

			elem.innerHTML = error.response.status;
			setTimeout(function () {
				elem.innerHTML = '';
			}, 1500);
		});
}


///////////// CRAETE Map that shows the starting point (the parcel with the highest ammount of time spent in wearhouse),
/////////////	   the destination (The most recently added parcel), and the waypoints
/////////////      waypoints should be all the parcels from accepted

// Create the script for the Map
// var script = document.createElement('script');
// script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBMN0tTYpnYsYcy62DPJoLB_bqZqHnNVDU&callback=initMap';
// script.async = true;

// let map
// // Attach your callback function to the `window` object
// window.initMap = function() {
// 	map = new google.maps.Map(document.getElementById('map'), {
// 		center: {lat: -34.397, lng: 150.644},
// 		zoom: 8
// 	});
// };
// // Append the 'script' element to 'head'
// document.head.appendChild(script);

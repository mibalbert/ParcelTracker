// function codeAddress(geocoder, map, address) {
//     geocoder.geocode({'address': address}, function(results, status) {
//     if (status === 'OK') {
//         map.setCenter(results[0].geometry.location);
//         var marker = new google.maps.Marker({
//         map: map,
//         position: results[0].geometry.location
//         });
//         //res.push(results[0].geometry.location.lat)
//     } else {
//         alert('Geocode was not successful for the following reason: ' + status);
//     }
//     });
// }

// ///Function to retrieve lat & long based on Postcode
// function geoCode(postcode){
// 	axios.get("https://maps.googleapis.com/maps/api/geocode/json",{
// 		params: {
// 			address : postcode,
// 			key: "AIzaSyBMN0tTYpnYsYcy62DPJoLB_bqZqHnNVDU"
// 		}
// 	}).then(function(response){
// 		console.log(response)
// 		console.log(response.data.results[0].geometry.location.lat)
// 		console.log(response.data.results[0].geometry.location.lng)
// 		//const lat = document.getElementById('lat')
// 		//const lng = document.getElementById('lng')
// 		//lat.innerHTML = response.data.results[0].geometry.location.lat
// 		//lat.value = response.data.results[0].geometry.location.lat
// 		//lng.innerHTML = response.data.results[0].geometry.location.lng
// }).catch(function(errors){
// 	console.log(errors)
// })}

// // geoCode()

// {{!--
// // This example requires the Geometry library. Include the libraries=geometry
// // parameter when you first load the API. For example:
// // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry">
// let marker1, marker2;
// let poly, geodesicPoly;

// function initMap() {
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 4,
//     center: { lat: 34, lng: -40.605 },
//   });

//   map.controls[google.maps.ControlPosition.TOP_CENTER].push(
//     document.getElementById("info")
//   );
//   marker1 = new google.maps.Marker({
//     map,
//     draggable: true,
//     position: { lat: 40.714, lng: -74.006 },
//   });
//   marker2 = new google.maps.Marker({
//     map,
//     draggable: true,
//     position: { lat: 48.857, lng: 2.352 },
//   });

//   const bounds = new google.maps.LatLngBounds(
//     marker1.getPosition(),
//     marker2.getPosition()
//   );

//   map.fitBounds(bounds);
//   google.maps.event.addListener(marker1, "position_changed", update);
//   google.maps.event.addListener(marker2, "position_changed", update);
//   poly = new google.maps.Polyline({
//     strokeColor: "#FF0000",
//     strokeOpacity: 1.0,
//     strokeWeight: 3,
//     map: map,
//   });
//   geodesicPoly = new google.maps.Polyline({
//     strokeColor: "#CC0099",
//     strokeOpacity: 1.0,
//     strokeWeight: 3,
//     geodesic: true,
//     map: map,
//   });
//   update();
// }

// function update() {
//   const path = [marker1.getPosition(), marker2.getPosition()];

//   poly.setPath(path);
//   geodesicPoly.setPath(path);

//   const heading = google.maps.geometry.spherical.computeHeading(
//     path[0],
//     path[1]
//   );

//   document.getElementById("heading").value = String(heading);
//   document.getElementById("origin").value = String(path[0]);
//   document.getElementById("destination").value = String(path[1]);
// }

// window.initMap = initMap; --}}

// const status = document.getElementById('status')
// 		const authorised = document.getElementById('authorised')
// 		const courier = document.getElementById('courier')
// 		//console.log(courier)
// 		if(courier != null){
// 			if (status.innerHTML == 'not-dispatched'){
// 			document.getElementById('accept').style.display = 'none'
// 			} else if(status.innerHTML == 'in-transit'){
// 				document.getElementById('formis').style.display = 'none'
// 			} else {
// 				document.getElementById('formis').style.display = 'none'
// 				document.getElementById('accept').style.display = 'none'
// 			}
// 		} else {
// 			document.getElementById('formis').style.display = 'none'
// 			document.getElementById('accept').style.display = 'none'
// 		}
// // argappeals.reg@coventrey.ac.uk
// const status = document.getElementById('status')
// 		const authorised = document.getElementById('authorised')
// 		const courier = document.getElementById('courier')
// 		//console.log(courier)
// 		if(courier != null){
// 			if (status.innerHTML == 'not-dispatched'){
// 			document.getElementById('accept').style.display = 'none'
// 			} else if(status.innerHTML == 'in-transit'){
// 				document.getElementById('formis').style.display = 'none'
// 			} else {
// 				document.getElementById('formis').style.display = 'none'
// 				document.getElementById('accept').style.display = 'none'
// 			}
// 		} else {
// 			document.getElementById('formis').style.display = 'none'
// 			document.getElementById('accept').style.display = 'none'
// 		}

// section.parcels {
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: 5rem 0;
// }

// .parcels-ind {
//   display: flex;
//   margin: 20px;
//   width: 50%;
//   padding: 1.15rem;
//   box-shadow: 1px 1px 10px -3px rgb(138, 137, 137, 0.8);
// }

// .parcel-link {
//   cursor: help;
//   display: flex;
//   justify-content: space-evenly;

// }

// .parcel-link div {
//   min-width: 10%;
//   max-width: 11%;
//   display: flex;
//   align-items: center;
// }

// 		<section class="parcels">
// 				<section class="parcel-head">
// 						{{!-- <div></div> --}}
// 				</section>
// 			{{#each parcels}}

// 				<section class="parcels-ind">
// 					<section id="link" class="parcel-link" onclick="window.location='/parcel/{{this.uuid}}'">

// 						{{!-- <span>Sender PostCode</span>
// 						<div>Recipient PostCode</div>
// 						<div>Weight</div>
// 						<div>Recipient Name</div>
// 						<div>Sender Username</div>
// 						<div>Date Posted</div>
// 						<div>Unique ID</div>
// 						<div>Status</div> --}}

// 						<div><img class="parcel-icon" src="img/package.png"></div>
// 						<div>{{this.sender_postcode}}</div>
// 						<div>{{this.recipient_postcode}}</div>
// 						<div>{{this.weight_kg}}</div>
// 						<div>{{this.recipient_name}}</div>
// 						{{!-- <div>{{this.full_address}}</div> --}}
// 						<div>{{this.sender_username}}</div>
// 						<div>{{{lol this.date_time_created}}}</div>
// 						<div>{{this.uuid}}</div>
// 						<div>{{this.status}}</div>

// 					</section>

// 					<section>
// 						<div><button class="button-add-transit" value="{{this.uuid}}">Accept</button></div>

// 					</section>
// 				</section>
// 			{{/each}}
// 		</section>

// // BreadCrumbs

// 	<section class="breadcrumbs-section">
// 		<ul class="breadcrumbs-ul">
// 			<li class="breadcrumbs_item">
// 				<a class="breadcrumbs-link" href="/">Home</a>
// 			</li>
// 			<li class="breadcrumbs_item">
// 				<a class="breadcrumbs-link" href="/home-courier-p">Parcels</a>
// 				</li>
// 			<li class="breadcrumbs_item">
// 				<a class="breadcrumbs-link breadcrumbs-link-active" href="/home-courier-transit">Transit</a>
// 			</li>
// 		</ul>
// 	</section>

// );

// const created = document.getElementsByClassName('date_time_created');
// const transit = document.getElementsByClassName('date_time_in_transit');
// const delivered = document.getElementsByClassName('date_time_delivered');

// const button = document.getElementById('insert-uuid-button');
// button.addEventListener('click', makeCall);

//Add querySelector or Class selector to select all the fileds
// for (let x = 0; x < delivered.length; x++) {
// 	if (delivered[x].innerHTML === '') delivered[x].innerHTML = '-';
// }
// for (let x = 0; x < transit.length; x++) {
// 	if (transit[x].innerHTML === '') transit[x].innerHTML = '-';
// }

// const date_time = new Date(created.innerHTML);
// const hours = diff_hours(date_time, date_time_now);

// Get uuid to make api call
// const uuid = document.querySelector('input[name=uuid]');
// uuid.addEventListener('keypress', async (event) => {
// 	if (event.keyCode === 13) {
// 		event.preventDefault();
// 		makeCall(uuid.value);
// 		uuid.value = '';
// 	}
// });
// function diff_hours(dt2, dt1) {
// 	let diff = (dt2 - dt1) / 1000;
// 	diff /= 60 * 60;
// 	return Math.abs(Math.round(diff));
// }

// Fetch api to post uuid to 'accept' parcel
// async function makeCall(uuid) {
// 	axios.post(window.location.href, {
// 		uuid: uuid,
// 	})
// 		.then(function (response) {
// 			const uu = document.querySelector('input[name=uuid]');
// 			let elem = document.getElementById('uuid-alert-green');
// 			let code = response.status;
// 			if (code === 200) {
// 				// console.log(response.data.msg)
// 				elem.innerHTML = response.data.msg;
// 			}
// 			setTimeout(function () {
// 				location.reload();
// 				elem.innerHTML = '';
// 			}, 1500);
// 		})
// 		.catch(function (error) {
// 			// console.log(error.response.status);
// 			// console.log(error.response);

// 			const uu = document.querySelector('input[name=uuid]');
// 			let elem = document.getElementById('uuid-alert-red');

// 			elem.innerHTML = error.response.status;
// 			setTimeout(function () {
// 				elem.innerHTML = '';
// 			}, 1500);
// 		});
// }

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

//   if (!record || record.length == 0) {
//     throw new Error("The user name or password is incorrect.");
//   }

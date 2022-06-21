
/* util.js */

const date_time_now = new Date()

window.addEventListener('DOMContentLoaded', event => {
	console.log('DOM CONTENT LOADED')
	
	const created = document.getElementsByClassName('date_time_created')
	const transit = document.getElementsByClassName('date_time_in_transit')
	const delivered = document.getElementsByClassName('date_time_delivered')
	
	// document.querySelector('button[name=plm]').addEventListener('click', makeCall)

	//Add querySelector or Class selector to select all the fileds and shit
	for(let x=0; x<delivered.length; x++){
		if (delivered[x].innerHTML === '' ) delivered[x].innerHTML = '-'
	}
	for(let x=0; x<transit.length; x++){
		if (transit[x].innerHTML === '' ) transit[x].innerHTML = '-'
	}

    const date_time = new Date(created.innerHTML)
    const hours = diff_hours(date_time, date_time_now)
	
    ///if hours && status != 'delivered'

	// if( hours > 48 ){
	// 		created.innerHTML = `${created.innerHTML} h:${hours}`
    //     	created.style.color = 'red'
	// } 
    //     }else if( hours > 24 ){

    //     }else{

    //     }
    // } else{
    //     //display this if date is null
    //     return '<span>' + '-' + '</span>'
    // }
	
	// console.log(hours)

	// Create the script for the Map
	var script = document.createElement('script');
	script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBMN0tTYpnYsYcy62DPJoLB_bqZqHnNVDU&callback=initMap';
	script.async = true;

	let map
	// Attach your callback function to the `window` object
	window.initMap = function() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: -34.397, lng: 150.644},
			zoom: 8
		});
	};
	// Append the 'script' element to 'head'
	document.head.appendChild(script);

	// Get uuid to make api call
	const uuid = document.querySelector('input[name=uuid]')
	uuid.addEventListener('keypress', async event => {
		if (event.keyCode === 13) { 
      		event.preventDefault();
			makeCall(uuid.value)
			uuid.value = ""
		}
	})
})

function diff_hours(dt2, dt1){
    let diff =(dt2 - dt1) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));	
}

// Fetch api to post uuid to 'accept' parcel 
async function makeCall(uuid) { 
	axios.post(window.location.href, {
		uuid: uuid,
	})
	.then(function (response) {
		const uu = document.querySelector('input[name=uuid]')
		let elem = document.getElementById('alert')
		let code = response.status
		if ( code === 200 ){
			elem.innerHTML = "You've added a parcel to deliver"
		} 
		setTimeout( function(){
			elem.innerHTML = ""
			
		} , 1500)
	
	})
	.catch(function (error) {
		// console.log(error.response.status);
		const uu = document.querySelector('input[name=uuid]')
		let elem = document.getElementById('alert')
		elem.innerHTML = "Sorry you've inputed the wrong uuid!"
		setTimeout( function(){
			elem.innerHTML = ""
		} , 1500)
	});
}
	








    // // Checks if the parcel was posted longer than 48h
    // if (date_time != null){
    //     const date_time_dtf = date_time.toDateString()
    //     const date_time_tmf = date_time.toLocaleTimeString()
    //     const hours = diff_hours(date_time, date_time_now)



//  if (date_time != null){
//         const date_time_dtf = date_time.toDateString()
//         const date_time_tmf = date_time.toLocaleTimeString()
//         const hours = diff_hours(date_time, date_time_now)
//         if( hours > 48 ){
//             return '<span>' + date_time_dtf + ' ' + '(' + date_time_tmf + ' - ' +hours + 'h' + ')' + '</span>'
//         }else if( hours > 24 ){
//             return '<span>' + date_time_dtf + ' ' + '(' + date_time_tmf + ' - ' + hours + 'h' + ')' + '</span>'
//         }else{
//             return '<span>' + date_time_dtf + ' ' + '(' + date_time_tmf + ' - ' + hours + 'h' + ')' + '</span>'
//         }
//     } else{
//         //display this if date is null
//         return '<span>' + '-' + '</span>'
//     }

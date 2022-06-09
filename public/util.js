
/* util.js */

window.addEventListener('DOMContentLoaded', event => {
	console.log('DOM CONTENT LOADED')
    if (document.getElementById('alert')) {alert()}
	document.querySelector['name=alert']
})

function alert(){
	const elem = document.getElementById('alert')
	if (elem.innerHTML == "Sorry, you inputed a wrong uuid!") {
		elem.style.color = 'red'
	} else if (elem.innerHTML == "You've added a parcel to deliver!") {
		elem.style.color = 'green'
	} setTimeout( function(){
			elem.remove()
	} , 2000)
}



// <script src="lib/vanilla-toast.min.js"></script>

// vt.success("Success Message");
// vt.info("Info Message");
// vt.warn("Warning Message");
// vt.error("Error Message");

// vt.success("Success Message",{
//   title: undefined,
//   position: toastPosition.TopCenter,
//   duration: 2000,
//   closable: true,
//   focusable: true,
//   callback: undefined
// });


	
// function geoCode(postcode){
// 	axios.get("https://maps.googleapis.com/maps/api/geocode/json",{
// 		params: {
// 			address : postcode,
// 			key: "AIzaSyBMN0tTYpnYsYcy62DPJoLB_bqZqHnNVDU"
// 		}
// 	}).then(function(response){
// 		return response.data.results[0].geometry.location.lat
// 		// lat.value = response.data.results[0].geometry.location.lat
// 		// lng.innerHTML = response.data.results[0].geometry.location.lng
// }).catch(function(errors){
// 	console.log(errors)
// })}


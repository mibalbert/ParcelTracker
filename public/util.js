
/* util.js */


// const green = document.createElement('p')
// green.setAttribute('id','green')
// const greentext = document.createTextNode('THIS IS THE GREEN ALERT!')
// green.append(greentext)
// const alert = document.getElementById('alert')
// alert.appendChild(green)
setTimeout( function(){
	const elem = document.getElementById('alert')
	elem.remove()
	// elem.style.display = 'none' 
	} , 3000)


// const slider = document.querySelector('input[name=slider]')
// const slider_val = document.querySelector('[name=slider_value]')
// slider.addEventListener('input', event => {
// 	// console.log('CHANGE')
// 	slider_val.value = slider.value
// })


window.addEventListener('DOMContentLoaded', event => {
	console.log('DOM CONTENT LOADED')
	// document.querySelector('form').addEventListener('submit', submitData)
})

// async function submitData(event) {
// 	console.log('FORM SUBMITTED!')
// 	data = event.target.querySelector('input[name="search"]').value
// 	console.log(data)
// 	const json = await apiCall(data)
// 	console.log(json)
// }

// async function apiCall(data) {
// 	console.log('MAKING API POST REQUEST')
// 	const url = 'https://julietgarage-secondpackage-8080.codio-box.uk/home-courier-transit'
	
// 	try {
// 		const response = await fetch(url, { method: 'POST', // or 'PUT'
// 								            headers: {
// 									                'Content-Type': 'application/json',
// 								                },
// 								            body: JSON.stringify(data),
// 								         })
// 		if(!response.ok) throw new Error('unable to make API call')
// 		return response.json()
// 	} catch(err) {
// 		console.log(`ERROR: ${err.message}`)
// 	}
// }







// 	event.preventDefault()
// 	console.log(event.target)
// 	const data = {
//     	uuid: ''
//   }















// const config = {
	// 	method: 'POST',
	// 	body: JSON.stringify(data),
	// 	mode: 'no-cors'
	// }
	// try {
	// 	const response = await fetch(url)
	// 	if(!response.ok) throw new Error('unable to make API call')
	// 	return response.json()
	// } catch(err) {
	// 	console.log(`ERROR: ${err.message}`)
	// }

	// const data = { username: 'example' };

	

/* util.js */

impoer { setParcelStatus } from '../modules/retrieve.js'


window.addEventListener('DOMContentLoaded', event => {
	console.log('DOMCONTENTLOADED')

	const slider = document.querySelector('input[name=slider]')
	const slider_val = document.querySelector('[name=slider_value]')
	slider.addEventListener('input', event => {
		// console.log('CHANGE')
		slider_val.value = slider.value
	})

addEventListener....keyup, set

})

async function set(){

	const input = document.querySelector('input[name=input]')
	const result = await setParcelStatus()
	if(result =='green'){
		createElement....
	}else{

	}

}


//Slider showing dynamic digits


// const red = document.createElement('p')
// red.innerHTML = 'IT SAYS GREEN!' 

// sec.append(red)

// export function file2DataURI(file) {
//   return new Promise((resolve, reject) => {
// 		try {
// 			const reader = new FileReader()
// 			reader.onload = () => {
// 				resolve(reader.result)
// 			}
// 			reader.readAsDataURL(file)
// 		} catch(err) {
// 			reject(err)
// 		}
//   })
// }


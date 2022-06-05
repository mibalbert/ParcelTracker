

/* slider.js */

const slider = document.querySelector('input[name=slider]')
const slider_val = document.querySelector('[name=slider_value]')
slider.addEventListener('input', event => {
	// console.log('CHANGE')
	slider_val.value = slider.value
})


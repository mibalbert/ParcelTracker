
/* util.js */

window.addEventListener('DOMContentLoaded', event => {
	console.log('DOM CONTENT LOADED')
	if (document.querySelector('input[name=slider]')){
        const slider = document.querySelector('input[name=slider]')
        const slider_val = document.querySelector('[name=slider_value]')
        slider.addEventListener('input', event => {
            // console.log('CHANGE')
            slider_val.value = slider.value
        })
    }
    if (document.getElementById('alert')){
		const elem = document.getElementById('alert')
		if (elem.innerHTML == "Sorry, you inputed a wrong uuid!") {
			elem.style.color = 'red'
		} else if (elem.innerHTML == "You've added a parcel to deliver!") {
			elem.style.color = 'green'}
		setTimeout( function(){
				elem.remove()
			// elem.style.display = 'none' 
			} , 2000)
	}


})





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



    // date_time.forEach(element => {
    //     const date = element.toDateString();
    //     const time = element.toLocaleTimeString();
    //     date_time_formated.push(date + time)
    // })
    

    // const result2 = result.map(elem =>{
        
    //     const sd  = elem.date_time_created
    //     const dd = sd.toDateString()
    //     console.log(dd) 
    //     // .toDateString();
    //     // const time = element.toLocaleTimeString();    
    // })
    // console.log(date_time_formated)
    // console.log(result.date_time_created)
    



//// Add this one for the signature route
// if (elem.innerHTML == 'The parcel is beeing delivered now') {
// 	elem.style.color = 'green'
// 	console.log("THE INNER HTML IS REEDDDD")
// }

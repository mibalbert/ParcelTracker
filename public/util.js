
/* util.js */

const date_time_now = new Date()

window.addEventListener('DOMContentLoaded', event => {
	console.log('DOM CONTENT LOADED')
    if (document.getElementById('alert')) alert()
	document.querySelector['name=alert']
	const created = document.getElementsByClassName('date_time_created')
	const transit = document.getElementsByClassName('date_time_in_transit')
	const delivered = document.getElementsByClassName('date_time_delivered')
	
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


	if( hours > 48 ){
			created.innerHTML = `${created.innerHTML} h:${hours}`
        	created.style.color = 'red'}
    //     }else if( hours > 24 ){

    //     }else{

    //     }
    // } else{
    //     //display this if date is null
    //     return '<span>' + '-' + '</span>'
    // }
	
	console.log(hours)


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


function diff_hours(dt2, dt1){
    let diff =(dt2 - dt1) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));	
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

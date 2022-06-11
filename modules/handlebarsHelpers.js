 
 /*  handlebarsHelpers.js  */
 
 
 export function handlebarsHelper1(date_time) {
    const date_time_created = new Date(date_time)
    const date_time_now = new Date()
    // Checks if the parcel was posted longer than 48h
    if (date_time != null){
        const date_time_dtf = date_time.toDateString()
        const date_time_tmf = date_time.toLocaleTimeString()
        const hours = diff_hours(date_time, date_time_now)
        if( hours > 48 ){
            return '<span style="color:#eb3434;">' + date_time_dtf + ' ' + '(' + date_time_tmf + ' - ' +hours + 'h' + ')' + '</span>'
        }else if( hours > 24 ){
            return '<span style="color:#ebba34;">' + date_time_dtf + ' ' + '(' + date_time_tmf + ' - ' + hours + 'h' + ')' + '</span>'
        }else{
            return '<span>' + date_time_dtf + ' ' + '(' + date_time_tmf + ' - ' + hours + 'h' + ')' + '</span>'
        }
    } else{
        //display this if date is null
        return '<span>' + '-' + '</span>'
    }
}

export function handlebarsHelper2(date_time) {
    
    const date_time_created = new Date(date_time)
    const date_time_now = new Date()
    const hours = diff_hours(date_time, date_time_now)
    // Checks if the parcel was posted longer than 48h
    if (date_time != null){
        const date_time_dtf = date_time.toDateString()
        const date_time_tmf = date_time.toLocaleTimeString()
        return '<span>' + date_time_dtf + ' ' + '(' + date_time_tmf + ' - ' + hours + 'h' + ')' + '</span>'
    } else{
        return '<span>' + '-' + '</span>'
    }
}

export function handlebarsHelper3(data) {
    
    console.log(data)

}

//Reference: https://www.w3resource.com/javascript-exercises/javascript-date-exercise-45.php
function diff_hours(dt2, dt1){
    let diff =(dt2 - dt1) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));	
}
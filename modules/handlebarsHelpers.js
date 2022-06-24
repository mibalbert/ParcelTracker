 
 /*  handlebarsHelpers.js  */
 
 ///Formats the date-time format
 export function handlebarsHelper1(date_time) {
    const date_time_created = new Date(date_time)
    const date_time_now = new Date()
    // Checks if the parcel was posted longer than 48h
    if (date_time != null){
        const date_time_dtf = date_time.toDateString()
        const date_time_tmf = date_time.toLocaleTimeString()
        const hours = diff_hours(date_time, date_time_now)
        const new_date = '<span>' + date_time_dtf +  ' - ' + date_time_tmf + ' ' + '(' + hours + 'h ago' + ')' + '</span>'
        if( hours > 48 ){
            return new_date
        }else if( hours > 24 ){
            return new_date
        }else{
            return new_date
        }
    } else{
        //display this if date is null
        return '<span>' + '-' + '</span>'
    }
}


            // return '<span>' + date_time_dtf + ' ' + '(' + date_time_tmf + ' - ' + hours + 'h ago' + ')' + '</span>'


// export function handlebarsHelper2(date_time) {
    
//     const date_time_created = new Date(date_time)
//     const date_time_now = new Date()
//     const hours = diff_hours(date_time, date_time_now)
//     // Checks if the parcel was posted longer than 48h
//     if (date_time != null){
//         const date_time_dtf = date_time.toDateString()
//         const date_time_tmf = date_time.toLocaleTimeString()
//         return '<span>' + date_time_dtf + ' ' + '(' + date_time_tmf + ' - ' + hours + 'h' + ')' + '</span>'
//     } else{
//         return '<span>' + '-' + '</span>'
//     }
// }

// export function handlebarsHelper3(data) {
    
//     console.log(data)

// }

function diff_hours(dt2, dt1){
    let diff =(dt2 - dt1) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));	
}

/* send.js */

import { db } from 'db'
import { format } from "https://deno.land/std@0.91.0/datetime/mod.ts";


const date_time_created = format(new Date(), "yyyy-MM-dd HH:mm:ss")

export async function addParcel(data, authorised){
    const parcel = data.fields
    console.log(parcel)
	// const lat,lng = geoCode(parcel.postcode)
    const sender_username = await authorised
    const result = await db.query('INSERT INTO parcels (sender_postcode, recipient_postcode, weight_kg, recipient_name, \
                                  full_address, sender_username, uuid, date_time_created) VALUES ( ?, ?, ?, ?, ?, ?, UUID(), ?)',
                                  [ parcel.sender_postcode, parcel.recipient_postcode, parcel.slider, parcel.recipient_name, parcel.full_address, sender_username, date_time_created ] )
    console.log(result)
    return 1
}

//////get geolocation of POSTCODE before inserting into db

///Function to retrieve lat & long based on Postcode
// function geoCode(postcode){
// 	axios.get("https://maps.googleapis.com/maps/api/geocode/json",{
// 		params: {
// 			address : postcode,
// 			key: "AIzaSyBMN0tTYpnYsYcy62DPJoLB_bqZqHnNVDU"
// 		}
// 	}).then(function(response){
// 		//console.log(response)
// 		//console.log(response.data.results[0].geometry.location.lat)
// 		//console.log(response.data.results[0].geometry.location.lng)
// 		//const lat = document.getElementById('lat')
// 		//const lng = document.getElementById('lng')
// 		lat.innerHTML = response.data.results[0].geometry.location.lat
// 		lat.value = response.data.results[0].geometry.location.lat
// 		lng.innerHTML = response.data.results[0].geometry.location.lng
// }).catch(function(errors){
// 	console.log(errors)
// })}

// geoCode()




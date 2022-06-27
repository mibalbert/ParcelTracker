/* send.js */

import { db } from 'db';
import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts';

const dateTimeCreated = format(new Date(), 'yyyy-mm-dd hh:mm:ss');

export async function addParcel(data, authorised) {
	const parcel = data.fields;
	console.log('THIS IS IN THE SEND JS', parcel);

	const senderUsername = await authorised;
	const result = await db.query(
'INSERT INTO parcels (recipient_name, sender_address, sender_address_details, sender_city, \
                                  sender_postcode, sender_country, recipient_address, recipient_address_details, recipient_city, \
                                  recipient_postcode, recipient_country, weight_kg, sender_username, date_time_created, uuid) \
                                  VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, UUID())',
		[
			parcel.recipient_name,
			parcel.sender_address,
			parcel.sender_address_details,
			parcel.sender_city,
			parcel.sender_postcode,
			parcel.sender_country,
			parcel.recipient_address,
			parcel.recipient_address_details,
			parcel.recipient_city,
			parcel.recipient_postcode,
			parcel.recipient_country,
			parcel.weight_kg,
			senderUsername,
			dateTimeCreated,
		],
	);

	console.log(result);
	return 1;
}

/*  handlebarsHelpers.js  */

///Formats the date-time format
export function handlebarsHelper1(dateTime) {
	const dateTimeNow = new Date();
	// Checks if the parcel was posted longer than 48h
	if (dateTime !== null) {
		const dateTimeDtf = dateTime.toDateString();

		const dateTimeTmf = dateTime.toLocaleTimeString();

		const hours = diffHours(dateTime, dateTimeNow);

		const newDate = '<span>' + dateTimeDtf + '<br>' + dateTimeTmf + '<br>' +
			'(' + hours + 'h ago' + ')' + '</span>';

		return newDate;
	} else {
		//display this if date is null
		return '<span>' + '-' + '</span>';
	}
}

// return '<span>' + date_time_dtf + ' ' + '(' + date_time_tmf + ' - ' + hours + 'h ago' + ')' + '</span>'

export function handlebarsHelper2(dateTime) {
	const dateTimeNow = new Date();
	// Checks if the parcel was posted longer than 48h
	if (dateTime !== null) {
		const dateTimeDtf = dateTime.toDateString();

		const dateTimeTmf = dateTime.toLocaleTimeString();

		const hours = diffHours(dateTime, dateTimeNow);

		const newDateGreen = '<span style="color:rgb(104, 216, 70)">' +
			dateTimeDtf + '<br>' + dateTimeTmf + '<br>' +
			'(' + hours + 'h ago' + ')' + '</span>';
		const newDateYellow = '<span style="color:#e0b91c">' + dateTimeDtf +
			'<br>' + dateTimeTmf + '<br>' +
			'(' + hours + 'h ago' + ')' + '</span>';
		const newDateRed = '<span style="color:#e01c1c">' + dateTimeDtf + '<br>' +
			dateTimeTmf + '<br>' +
			'(' + hours + 'h ago' + ')' + '</span>';

		if (hours > 48) {
			return newDateRed;
		} else if (hours > 24) {
			return newDateYellow;
		} else {
			return newDateGreen;
		}
	} else {
		//display this if date is null
		return '<span>' + '-' + '</span>';
	}
}

export function handlebarsHelper3(courier) {
	if (courier !== null) {
		return courier;
	} else {
		return '-';
	}
}

function diffHours(dt2, dt1) {
	let diff = (dt2 - dt1) / 1000;
	diff /= 60 * 60;
	return Math.abs(Math.round(diff));
}

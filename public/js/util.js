/* util.js */

window.addEventListener('DOMContentLoaded', (event) => {
	console.log('DOM CONTENT LOADED');

	/// Display message empty table
	const section = document.querySelector('.parcels');
	const textEmpty = document.querySelector('.empty');

	const tableData = document.getElementsByClassName('parcel-td');

	if (tableData.innerHTML === null) {
		section.style.display = 'none';
		textEmpty.style.display = 'block';
	}

	/// Alert
	const alertGreenSuccess = document.querySelector(
		'.uuid-alert-green-success',
	);
	const greenSuccess = sessionStorage.getItem('greenSuccess');

	if (greenSuccess) {
		alertGreenSuccess.style.display = 'block';
		sessionStorage.removeItem('greenSuccess');
		setTimeout(function () {
			alertGreenSuccess.style.display = 'none';
		}, 1500);
	}
});

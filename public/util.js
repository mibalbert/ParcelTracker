/* util.js */

window.addEventListener('DOMContentLoaded', (event) => {
	console.log('DOM CONTENT LOADED');

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

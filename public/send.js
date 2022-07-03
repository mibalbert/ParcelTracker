/* geo-maps.js */

window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded');
	//Display the change in price when slider is moved
	const slider = document.querySelector('[name=slider]');
	slider.addEventListener('input', (event) => {
		document.querySelector('[name=slider_value]').value = slider.value;
	});
});

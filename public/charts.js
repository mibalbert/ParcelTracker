

  /* charts.js */


window.addEventListener('DOMContentLoaded', (event) => {
	console.log('DOMContentLoaded');

		// Chart bit
        const instore = document.getElementById('instore')
        const accepted = document.getElementById('accepted')
        // const delivered = document.getElementById('delivered')
        const totalInstore = document.getElementById('admin-total-instore')
        const totalAccepted = document.getElementById('admin-total-in-transit')

		if (document.getElementById('myChartAdmin')){
			const context = document.getElementById('myChartAdmin').getContext('2d');
			const myChartAdmin = new Chart(context, {
				type: 'pie',
				data: {
					labels: [`In-transit (${totalAccepted.innerHTML})`, `Total in Wearhouse (${totalInstore.innerHTML})`],
					datasets: [{
						label: '# of parcels',
						data: [totalAccepted.innerHTML, totalInstore.innerHTML],
						backgroundColor: [
							'rgba(54, 162, 235, 0.83)',
							'rgba(255, 99, 132, 0.83)',
							// 'rgba(255, 206, 86, 0.2)',
							// 'rgba(75, 192, 192, 0.2)',
							// 'rgba(153, 102, 255, 0.2)',
							// 'rgba(255, 159, 64, 0.2)'
						],
						borderColor: [
							'rgba(54, 162, 235, 0.83)',
							'rgba(255, 99, 132, 0.83)',
							// 'rgba(255, 206, 86, 1)',
							// 'rgba(75, 192, 192, 1)',
							// 'rgba(153, 102, 255, 1)',
							// 'rgba(255, 159, 64, 1)'
						],
						borderWidth: 1,
						hoverOffset: 4
					}]
				},
				options: {
					plugins: {
							legend: {
								labels: {
									// This more specific font property overrides the global property
									font: {
										size: 14
									}
								}
							}
						}
					// scales: {
					// 	y: {
					// 		beginAtZero: true
					// 	}
					// }
				}
			});

		} else if (document.getElementById('myChartCourier')) {
			const ctx = document.getElementById('myChartCourier').getContext('2d');
			const myChartCourier = new Chart(ctx, {
				type: 'pie',
				data: {
					labels: [`Accepted (${accepted.innerHTML})`, `In Wearhouse (${instore.innerHTML})`],
					datasets: [{
						label: '# of parcels',
						data: [accepted.innerHTML, instore.innerHTML],
						backgroundColor: [
							'rgba(54, 162, 235, 0.83)',
							'rgba(255, 99, 132, 0.83)',
							// 'rgba(255, 206, 86, 0.2)',
							// 'rgba(75, 192, 192, 0.2)',
							// 'rgba(153, 102, 255, 0.2)',
							// 'rgba(255, 159, 64, 0.2)'
						],
						borderColor: [
							'rgba(54, 162, 235, 0.83)',
							'rgba(255, 99, 132, 0.83)',
							// 'rgba(255, 206, 86, 1)',
							// 'rgba(75, 192, 192, 1)',
							// 'rgba(153, 102, 255, 1)',
							// 'rgba(255, 159, 64, 1)'
						],
						borderWidth: 1,
						hoverOffset: 4
					}]
				},
				options: {
					plugins: {
							legend: {
								labels: {
									// This more specific font property overrides the global property
									font: {
										size: 14
									}
								}
							}
						}
					// scales: {
					// 	y: {
					// 		beginAtZero: true
					// 	}
					// }
				}
			});
		}
})
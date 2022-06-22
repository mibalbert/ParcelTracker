
window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded')


    console.log(document.getElementsByClassName('routes-table-row'))
    

    //Create the script tag, set the appropriate attributes
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBMN0tTYpnYsYcy62DPJoLB_bqZqHnNVDU&callback=initMap';
    script.async = true;
        
    let map

    // Attach your callback function to the `window` object
    window.initMap = function() {
        // JS API is loaded and available
        let map;
        map = new google.maps.Map(document.getElementById("routes-map"), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
        });
            
    }



    // // Append the 'script' element to 'head'
    document.head.appendChild(script);
        

})


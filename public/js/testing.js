window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded');

	// const date = Date.now();

	// console.log(new Intl.DateTimeFormat('gb-EU',{ dateStyle: 'full', timeStyle: 'short' }).format(date));

	var script = document.createElement('script');
	script.src =
		'https://maps.googleapis.com/maps/api/js?key=AIzaSyBMN0tTYpnYsYcy62DPJoLB_bqZqHnNVDU&libraries=places,geometry&callback=initMap';
	script.async = true;

  window.initMap = async function() {
    console.log('adasdasdasd')
    var map = new google.maps.Map(
      document.getElementById("map-bitch"), {
        center: new google.maps.LatLng(37.4419, -122.1419),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    
   		new newPolyline(map);
	}		
		class newPolyline {
      p1;
      p2;

      constructor(map){

          this.map = map
          this.p1 = google.maps.geometry.spherical.computeOffset(map.getCenter(), 10000, 10);
          this.p2 = google.maps.geometry.spherical.computeOffset(map.getCenter(), 2000, 10);
    
          console.log(this.p1)
          this.drawDashedCurve(this.p1, this.p2, this.map);
          
          var straightPoly = new google.maps.Polyline({
          map: this.map,
          path: [this.p1, this.p2],
          strokeOpacity: 0.2,
          strokeColor: "blue"
          });
          var markerP1 = new google.maps.Marker({
          position: this.p1,
          map: this.map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 4,
          fillColor: "black",
          fillOpacity: 1.0,
          draggable: true,
          }
          });
          var markerP2 = new google.maps.Marker({
          position: this.p2,
          map: this.map,
          icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 4,
          fillColor: "black",
          fillOpacity: 1.0,
          draggable: true,
          }
          });
        
      }


        drawDashedCurve(P1, P2, map) {
          var lineLength = google.maps.geometry.spherical.computeDistanceBetween(P1, P2);
          var lineHeading = google.maps.geometry.spherical.computeHeading(P1, P2);
          if (lineHeading < 0) {
            var lineHeading1 = lineHeading + 45;
            var lineHeading2 = lineHeading + 135;
          } else {
            var lineHeading1 = lineHeading + -45;
            var lineHeading2 = lineHeading + -135;
          }
          var pA = google.maps.geometry.spherical.computeOffset(P1, lineLength / 2.2, lineHeading1);
          var pB = google.maps.geometry.spherical.computeOffset(P2, lineLength / 2.2, lineHeading2);
          try {
            
            this.GmapsCubicBezier(P1, pA, pB, P2, 0.01, map);
          } catch (error) {
            console.log(errorw)
          }

        }

        GmapsCubicBezier (latlong1, latlong2, latlong3, latlong4, resolution, map) {
          var lat1 = latlong1.lat();
          var long1 = latlong1.lng();
          var lat2 = latlong2.lat();
          var long2 = latlong2.lng();
          var lat3 = latlong3.lat();
          var long3 = latlong3.lng();
          var lat4 = latlong4.lat();
          var long4 = latlong4.lng();

          var points = [];
          function B1 (t) {
            return t * t * t;
          }
          function B2 (t) {
            return 3 * t * t * (1 - t);
          }
          function B3 (t) {
            return 3 * t * (1 - t) * (1 - t);
          }
          function B4 (t) {
            return (1 - t) * (1 - t) * (1 - t);
          }
          function getBezier (C1, C2, C3, C4, percent) {
            var pos = {};
            pos.x = C1.x * B1(percent) + C2.x * B2(percent) + C3.x * B3(percent) + C4.x * B4(percent);
            pos.y = C1.y * B1(percent) + C2.y * B2(percent) + C3.y * B3(percent) + C4.y * B4(percent);
            return pos;
          }
          
          for (let it = 0; it <= 1; it += resolution) {

            points.push(getBezier({
              x: lat1,
              y: long1
            }, {
              x: lat2,
              y: long2
            }, {
              x: lat3,
              y: long3
            }, {
              x: lat4,
              y: long4
            }, it));
          }
          var path = [];
          for (var i = 0; i < points.length - 1; i++) {
            path.push(new google.maps.LatLng(points[i].x, points[i].y));
            path.push(new google.maps.LatLng(points[i + 1].x, points[i + 1].y, false));
          }

          var Line = new google.maps.Polyline({
            path: path,
            geodesic: true,
            strokeOpacity: 0.0,
            icons: [{
              icon: {
                path: 'M 0,-1 0,1',
                strokeOpacity: 1,
                scale: 4
              },
              offset: '0',
              repeat: '20px'
            }],
            strokeColor: 'grey'
          });
          
          Line.setMap(map);

        };
        
        
      }
  
  document.head.appendChild(script);

})
window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded');

	// const date = Date.now();

	// console.log(new Intl.DateTimeFormat('gb-EU',{ dateStyle: 'full', timeStyle: 'short' }).format(date));

	var script = document.createElement('script');
	script.src =
		'https://maps.googleapis.com/maps/api/js?key=AIzaSyBMN0tTYpnYsYcy62DPJoLB_bqZqHnNVDU&libraries=places,geometry&callback=initMap';
	script.async = true;

	window.initMap = async function () {
		const map = new google.maps.Map(document.getElementById('map-bitch'), {
			center: new google.maps.LatLng(37.4419, -122.1419),
      zoom: 13
		});
   
    
    var p1 = new google.maps.LatLng(37.420672, -122.157504)
    console.log(p1)
    var p2 = new google.maps.LatLng(37.465234, -122.135240);
    
    drawDashedCurve(p1, p2, map);
    
    
    var straightPoly = new google.maps.Polyline({
        map:map,
        path: [p1, p2],
        strokeOpacity: 0.2,
        strokeColor: "blue"
        });
        var markerP1 = new google.maps.Marker({
        position: p1,
        map:map,
        icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 4,
        fillColor: "black",
        fillOpacity: 1.0,
        draggable: true,
        }
        });
            var markerP2 = new google.maps.Marker({
        position: p2,
        map:map,
        icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 4,
        fillColor: "black",
        fillOpacity: 1.0,
        draggable: true,
        }
      });
      
    }
    
    function drawDashedCurve(P1, P2, map) {
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
    
      var curvedLine = new GmapsCubicBezier(P1, pA, pB, P2, 0.01, map);
    }
    
    var GmapsCubicBezier = function(latlong1, latlong2, latlong3, latlong4, resolution, map) {
      var lat1 = latlong1.lat();
      var long1 = latlong1.lng();
      var lat2 = latlong2.lat();
      var long2 = latlong2.lng();
      var lat3 = latlong3.lat();
      var long3 = latlong3.lng();
      var lat4 = latlong4.lat();
      var long4 = latlong4.lng();
      
      var points = [];
      
      for (let it = 0; it <= 1; it += resolution) {
        points.push(this.getBezier({
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
    
      return Line;
    };
    
    
    GmapsCubicBezier.prototype = {
    
      B1: function(t) {
        return t * t * t;
      },
      B2: function(t) {
        return 3 * t * t * (1 - t);
      },
      B3: function(t) {
        return 3 * t * (1 - t) * (1 - t);
      },
      B4: function(t) {
        return (1 - t) * (1 - t) * (1 - t);
      },
      getBezier: function(C1, C2, C3, C4, percent) {
        var pos = {};
        pos.x = C1.x * this.B1(percent) + C2.x * this.B2(percent) + C3.x * this.B3(percent) + C4.x * this.B4(percent);
        pos.y = C1.y * this.B1(percent) + C2.y * this.B2(percent) + C3.y * this.B3(percent) + C4.y * this.B4(percent);
        return pos;
      }
    };
    

	document.head.appendChild(script);
});

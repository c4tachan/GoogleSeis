var map;

function initialize() {
  var mapOptions = {
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

  // Try HTML5 geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Location found using HTML5.'
      });

      map.setCenter(pos);
    }, function () {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }

  var vibeLayer = new google.maps.KmlLayer('https://raw.github.com/c4tachan/GoogleSeis/master/Vibes_PA.kml'); //, {map: map});
  console.log(vibeLayer);
  vibeLayer.setMap(map);

  console.log('Hello World!');

  var stat = vibeLayer.getStatus();
  console.log(stat);

  // switch (stat) {
  //   case google.maps.KmlLayerStatus.DOCUMENT_NOT_FOUND:
  //     console.log('Document not found!');
  //     break;

  //   case google.maps.KmlLayerStatus.DOCUMENT_TOO_LARGE:
  //     console.log('Document is too large!');
  //     break;

  //   case google.maps.KmlLayerStatus.FETCH_ERROR:
  //     console.log('Document could not be fetched!');
  //     break;

  //   case google.maps.KmlLayerStatus.INVALID_DOCUMENT:
  //     console.log('Document is not a valid KML, KMZ or GeoRSS file!');
  //     break;

  //   case google.maps.KmlLayerStatus.INVALID_REQUEST:
  //     console.log('The KmlLayer is invalid!');
  //     break;

  //   case google.maps.KmlLayerStatus.LIMITS_EXCEEDED:
  //     console.log('The document exceeds the feature limits of KmlLayer!');
  //     break;

  //   case google.maps.KmlLayerStatus.TIMED_OUT:
  //     console.log('The document could not be loaded in a reasonable amount of time!');
  //     break;

  //   case google.maps.KmlLayerStatus.UNKNOWN:
  //     console.log('The document failed to load for an unknown reason!');
  //     break;

  //   case google.maps.KmlLayerStatus.OK:
  //     console.log('The layer loaded sucessfully!');
  //     break;

  //   default:
  //     console.log('No values matched!', stat);
  //     break;
  // }

}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(40.613, - 79.162),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);

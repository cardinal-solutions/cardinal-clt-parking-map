(function() {

  var center;
  var map;
  var geocoder;

  var cardinalLogo = './assets/images/cardinal-logo.svg';

  var cardinalAddress = document.getElementById('cardinal-address');

  var office = {
    lat: 35.227156,
    lng: -80.846351,
    icon: cardinalLogo,
    name: 'Cardinal Solutions Office',
    info: '<p>Office is located on the 5th floor.</p>'
  };

  var lots = [
    {
      lat: 35.227895,
      lng: -80.847096,
      name: 'Parking near Greens Lunch',
      info: '<ul><li><strong>Daily</strong>: $9.00</li><li><strong>Monthly</strong>: $135.00</li></ul>'
    },
    {
      lat: 35.228253,
      lng: -80.856591,
      name: 'Hill Street Parking',
      info: '<p>Street Parking is free, but fills up early.</p>'
    },
    {
      lat: 35.232059,
      lng: -80.845199,
      name: 'Graham St & 6th St',
      info: '<ul><li><strong>Daily</strong>: $5.00</li><li><strong>Monthly</strong>: $79.00</li></ul>'
    },
    {
      lat: 35.230140,
      lng: -80.848257,
      name: 'Graham St & 4th St',
      info: '<ul>' +
        '<li><strong>Daily</strong>: $6.00</li>' +
        '</ul>' +
        '<p><strong>Note</strong>: <em>Cash only unless using <a href="http://us.parkmobile.com/mobile-apps" target="_blank">ParkMobile App</a></em>.</p>'
    }
  ];

  // When the window has finished loading create our google map below
  google.maps.event.addDomListener(window, 'load', init);

  google.maps.event.addDomListener(window, 'resize', function() {
    map.setCenter(center);
  });

  cardinalAddress.addEventListener('click', function() {
    map.setCenter(center);
  });

  function init() {
    center = new google.maps.LatLng(35.227156, -80.846351);

    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
      zoom: 16,
      scrollwheel: false,
      center: center,
      //generated from Snazzy Maps.
      styles: [{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#e9e5dc"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.medical","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"poi.sports_complex","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54},{"visibility":"off"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"water","elementType":"all","stylers":[{"saturation":43},{"lightness":-11},{"color":"#1a85c7"}]}]
    };

    // Get the HTML DOM element that will contain your map
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    var infoWindow = new google.maps.InfoWindow({});

    // Create the Google Map using our element and options defined above
    map = new google.maps.Map(mapElement, mapOptions);

    [].concat(office, lots).forEach(function(item) {
      var markerCenter = new google.maps.LatLng(item.lat, item.lng);

      var newMapMarker = new google.maps.Marker({
        position: markerCenter,
        map: map,
        title: item.name,
        icon: (item.icon) ? item.icon : ''
      });

      newMapMarker.addListener('click', function() {
        map.setCenter(offsetCenter(markerCenter, 0, -80));

        var content = '<h3>' + item.name + '</h3>';

        if(item.info) {
          content += item.info;
        }

        infoWindow.setContent(content);

        infoWindow.open(map, newMapMarker);
      })
    });
  }

  //borrowed from:  http://stackoverflow.com/a/10666030
  function offsetCenter(latlng,offsetx,offsety) {
    // latlng is the apparent centre-point
    // offsetx is the distance you want that point to move to the right, in pixels
    // offsety is the distance you want that point to move upwards, in pixels
    // offset can be negative
    // offsetx and offsety are both optional

    var scale = Math.pow(2, map.getZoom());
    var nw = new google.maps.LatLng(
        map.getBounds().getNorthEast().lat(),
        map.getBounds().getSouthWest().lng()
    );

    var worldCoordinateCenter = map.getProjection().fromLatLngToPoint(latlng);
    var pixelOffset = new google.maps.Point((offsetx/scale) || 0,(offsety/scale) ||0)

    var worldCoordinateNewCenter = new google.maps.Point(
        worldCoordinateCenter.x - pixelOffset.x,
        worldCoordinateCenter.y + pixelOffset.y
    );

    var newCenter = map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);

    map.setCenter(newCenter);
  }

}());

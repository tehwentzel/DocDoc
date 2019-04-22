function initMap() {
  var myLatlng = { lat: 41.872276, lng: -87.648633 };
  var markA = { lat: 41.870001, lng: -87.646358 };
  var markB = { lat: 41.871983, lng: -87.653482 };
  var markC = { lat: 41.867253, lng: -87.657259 };
  var markD = { lat: 41.867797, lng: -87.636145 };

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: myLatlng
  });

  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: "Your Location"
  });
  var markerA = new google.maps.Marker({
    position: markA,
    map: map,
    title: "Dr. Realman",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/red.png"
    }
  });
  var markerB = new google.maps.Marker({
    position: markB,
    map: map,
    title: "Dr. Octavia",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/red.png"
    }
  });
  var markerC = new google.maps.Marker({
    position: markC,
    map: map,
    title: "Dr. Strange",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/red.png"
    }
  });
  var markerD = new google.maps.Marker({
    position: markD,
    map: map,
    title: "Dr. Doctor",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/red.png"
    }
  });

  marker.addListener("click", function() {});
}

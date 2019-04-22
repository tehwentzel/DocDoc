function initMap() {
  var myLatlng = { lat: 41.872276, lng: -87.648633 };
  var markA = { lat: 41.870001, lng: -87.646358 };
  var markB = { lat: 41.871983, lng: -87.653482 };
  var markC = { lat: 41.867253, lng: -87.657259 };
  var markD = { lat: 41.867797, lng: -87.636145 };

  var myStyles = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    }
  ];
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: myLatlng,
    disableDefaultUI: true,
    styles: myStyles,
    clickableIcons: false
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
    label: "A"
  });
  var markerB = new google.maps.Marker({
    position: markB,
    map: map,
    title: "Dr. Octavia",
    label: "B"
  });
  var markerC = new google.maps.Marker({
    position: markC,
    map: map,
    title: "Dr. Strange",
    label: "C"
  });
  var markerD = new google.maps.Marker({
    position: markD,
    map: map,
    title: "Dr. Doctor",
    label: "D"
  });

  marker.addListener("click", function() {});
  markerA.addListener("click", function() {
    $(".docBoxInfo").css("display", "none");
    $(".docBox").toggleClass("activeTab", false);
    if (selectedUser != null) {
      $(".saveDoctorButton").html("Assign to " + selectedUser);
    } else {
      $(".saveDoctorButton").html("Assign to...");
    }
    $("#docBoxA").toggleClass("activeTab", true);
    $("#docBoxAInfo").css("display", "flex");
  });
  markerB.addListener("click", function() {
    $(".docBoxInfo").css("display", "none");
    $(".docBox").toggleClass("activeTab", false);
    if (selectedUser != null) {
      $(".saveDoctorButton").html("Assign to " + selectedUser);
    } else {
      $(".saveDoctorButton").html("Assign to...");
    }
    $("#docBoxB").toggleClass("activeTab", true);
    $("#docBoxBInfo").css("display", "flex");
  });
  markerC.addListener("click", function() {
    $(".docBoxInfo").css("display", "none");
    $(".docBox").toggleClass("activeTab", false);
    if (selectedUser != null) {
      $(".saveDoctorButton").html("Assign to " + selectedUser);
    } else {
      $(".saveDoctorButton").html("Assign to...");
    }
    $("#docBoxC").toggleClass("activeTab", true);
    $("#docBoxCInfo").css("display", "flex");
  });
  markerD.addListener("click", function() {
    $(".docBoxInfo").css("display", "none");
    $(".docBox").toggleClass("activeTab", false);
    if (selectedUser != null) {
      $(".saveDoctorButton").html("Assign to " + selectedUser);
    } else {
      $(".saveDoctorButton").html("Assign to...");
    }
    $("#docBoxD").toggleClass("activeTab", true);
    $("#docBoxDInfo").css("display", "flex");
  });

  map.addListener("click", function() {
    $(".docBoxInfo").css("display", "none");
    $(".docBox").toggleClass("activeTab", false);
  });
}

// Reference to the Firebase database.
var firebase = new Firebase("https://runmapper.firebaseio.com/");

//Add runkeeper data to firebase so that it displays on google maps

// function mapPath(){
//   path = {};
//   for(var i = 0; i <= rundata.path.length - 1; i++){
//     if(rundata.path[i].timestamp > 0){
//       path['lat'] = rundata.path[i].latitude,
//       path['lng'] = rundata.path[i].longitude
//       firebase.push(path);
//     }
//     console.log(" entered next loop ");
//   }
//   return path
// }
// mapPath();


function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47, lng: -122},
    zoom: 8
  });

  // Add marker on user click
  map.addListener('click', function(e) {
    firebase.push({lat: e.latLng.lat(), lng: e.latLng.lng()});
  });



  firebase.on("child_added", function(snapshot, prevChildKey) {
    // Get latitude and longitude from Firebase.
    var newPosition = snapshot.val();

    // Create a google.maps.LatLng object for the position of the marker.
    // A LatLng object literal (as above) could be used, but the heatmap
    // in the next step requires a google.maps.LatLng object.
    var latLng = new google.maps.LatLng(newPosition.lat, newPosition.lng);

    // Place a marker at that location.
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  });
}

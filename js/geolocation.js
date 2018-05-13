/**
 * Created by Aleksic on 2018-05-12.
 */

var geoLocation = (function () {

    var userPosition, latitude, longitude;

getLocation = function (access_token, response) {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;
        var lat = crd.latitude;
        var lon = crd.longitude;
        $.ajax({
            type: "GET",
            //url: "https://api.vasttrafik.se/bin/rest.exe/v2/location.nearbystops?originCoordLat=57.7111136&originCoordLong=11.9860736&format=json",
            url: "https://api.vasttrafik.se/bin/rest.exe/v2/location.nearbystops?originCoordLat="+lat+"&originCoordLong="+lon+"&format=json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader( "Authorization", "Bearer " + access_token );
            },
            success: function(data){
                var name = data.LocationList.StopLocation[0].name;
                var id = data.LocationList.StopLocation[0].id;
                getFavouriteStops(response, name, id);
            }
        });
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
    document.getElementById("vasttrafikApi").innerHTML = "Hämtar...";
}

    return {
        getLocation: getLocation
    };
})();
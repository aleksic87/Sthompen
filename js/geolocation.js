/**
 * Created by Aleksic on 2018-05-12.
 */

var geoLocation = (function () {

    var userPosition, latitude, longitude;

getLocation = function () {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;
        var lat = crd.latitude;
        var lon = crd.longitude;
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}

    return {
        getLocation: getLocation
    };
})();
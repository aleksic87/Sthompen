/**
 * Created by Aleksic on 2017-02-24.
 */

var vasttrafikObj = (function () {
    var requestVapi,getLocation;

    requestVapi = function () {
        mqttCredentials.getVasttrafikToken();
    },

    getLocation = function () {
        debugLogger.debugLog("Get location");
        var x = document.getElementById("demo");

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
            debugLogger.debugLog("Get current position");
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
            debugLogger.debugLog("Geolocation is not supported by this browser.");
        }

        function showPosition(position) {
            debugLogger.debugLog("Show position");
            var latlon = position.coords.latitude + "," + position.coords.longitude;

            var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
                +latlon+"&zoom=14&size=400x300&sensor=false&key="+mqttCredentials.getgoogleApiKey();
            document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
        }

    //To use this code on your website, get a free API key from Google.
    //Read more at: https://www.w3schools.com/graphics/google_maps_basic.asp

        function showError(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    x.innerHTML = "User denied the request for Geolocation."
                    debugLogger.debugLog("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    x.innerHTML = "Location information is unavailable."
                    debugLogger.debugLog("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    x.innerHTML = "The request to get user location timed out."
                    debugLogger.debugLog("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    x.innerHTML = "An unknown error occurred."
                    debugLogger.debugLog("An unknown error occurred.");
                    break;
            }
        }
    },

    getGoogleLocation = function () {
        $.ajax({
            url: "https://www.googleapis.com/geolocation/v1/geolocate?key="+mqttCredentials.getGoogleLGeolocateKey(),
            type: 'POST',
            beforeSend : function( xhr ) {
                xhr.setRequestHeader( "Content-Type", "application/json");
            },
            success: function(response, request){
                debugLogger.debugLog("Lat: "+response.location.lat);
                debugLogger.debugLog("Lon: "+response.location.lng);
                var mapOptions = {
                    center: new google.maps.LatLng(response.location.lat, response.location.lng),
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.HYBRID
                }
                var map = new google.maps.Map(document.getElementById("map"), mapOptions);
                var marker = new google.maps.Marker({
                    position: {lat: response.location.lat, lng: response.location.lng},
                    map: map,
                    title: 'Hello World!'
                });
            }
        });
    },

    getGoogleMap = function () {
        var mapOptions = {
            center: new google.maps.LatLng(51.5, -0.12),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.HYBRID
        }
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    },

    generateTrams = function (response) {
        var trams;
        var array = response.DepartureBoard.Departure;
        for(trams in array){
            //document.getElementById("vasttrafikApi").innerHTML = document.getElementById("vasttrafikApi").innerHTML +
            document.getElementById('tramsPopover').innerHTML = document.getElementById("tramsPopover").innerHTML +
                '<span id=tramNr'+array[trams].sname+'>'+array[trams].sname+" "+
                '</span> <span id="tramTime">'+array[trams].time+'</span><br>';
        }
    },

    showPopover = function(target) {
        mqttCredentials.getVasttrafikToken();
        document.getElementById('popover').show(target);
    },

    hidePopover = function() {
        document.getElementById('popover').hide();
    }

    return {
        requestVapi: requestVapi,
        getLocation: getLocation,
        getGoogleLocation: getGoogleLocation,
        getGoogleMap: getGoogleMap,
        generateTrams: generateTrams,
        showPopover: showPopover,
        hidePopover: hidePopover
    };
})();

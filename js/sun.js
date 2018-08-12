/**
 * Created by Aleksic on 2018-05-10.
 */

var sun = (function () {

    sunriseAndSunset = function (payload) {
        var sunriseVal, sunsetVal;
        var sunriseMinute = payload.sunriseMinute;
        var sunriseHour = payload.sunriseHour;
        var sunsetMinute = payload.sunsetMinute;
        var sunsetHour = payload.sunsetHour;

        // Sunrise
        if(sunriseMinute > 9){
            sunriseVal = "0" + sunriseHour + ":" + sunriseMinute;
        }
        // Add second number if minute is below 10
        else{
            sunriseVal = "0" + sunriseHour + ":" + "0" + sunriseMinute;
        }

        // Sunset
        if(sunsetMinute > 9){
            sunsetVal = sunsetHour + ":" + sunsetMinute;
        }
        // Add second number if minute is below 10
        else{
            sunsetVal = sunsetHour + ":" + "0" + sunsetMinute;
        }

        
        document.getElementById("sunriseValue").innerHTML = sunriseVal;
        document.getElementById("sunsetValue").innerHTML = sunsetVal;
    };

    return {
        sunriseAndSunset: sunriseAndSunset
    };
})();
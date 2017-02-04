/**
 * Created by Aleksic on 2017-02-03.
 */

var temp = (function () {

    tempsens = function (payload) {
        var insideVal = payload.inside;
        document.getElementById("degreesInside").innerHTML = insideVal;
        var outsideVal = payload.outside;
        document.getElementById("degreesOutside").innerHTML = outsideVal;
        var humidityVal = payload.humidity;
        document.getElementById("humidityValue").innerHTML = humidityVal;
    };

    return {
        tempsens: tempsens
    };
})();
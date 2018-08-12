/**
 * Created by Aleksic on 2017-02-03.
 */

var temp = (function () {

    tempsens = function (payload) {
        var insideValNow = payload.insideValNow;
        document.getElementById("degreesInside").innerHTML = insideValNow;
        var humidityValNow = payload.humidityValNow;
        document.getElementById("humidityValue").innerHTML = humidityValNow;
    };

    return {
        tempsens: tempsens
    };
})();
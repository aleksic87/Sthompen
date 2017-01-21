/**
 * Created by Aleksic on 2017-01-21.
 */

var debugLogger = (function () {

    var date,div;

    debugLog = function (msg) {
        date = new Date();
        payload = msg;
        div = document.getElementById("logging");
        div.innerHTML = div.innerHTML + "<br>" + date + " : " + "<br>" + payload + "<br>";
    }

    return {
        debugLog: debugLog
    };
})();
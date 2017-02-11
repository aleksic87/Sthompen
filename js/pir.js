/**
 * Created by Aleksic on 2017-01-08.
 */

var pir = (function () {

    pirFunc = function () {
        if(payload == "1") {
            //document.getElementById("motionsensor").innerHTML = "Sann";
            //document.getElementById("motionsensor").style.backgroundColor = "#01c200";
            //plot.drawPIR();
        }
        else{
            //document.getElementById("motionsensor").innerHTML = "Falsk";
            //document.getElementById("motionsensor").style.backgroundColor = "#C20300";
        }
    };

    return {
        pirFunc: pirFunc
    };
})();
/**
 * Created by Aleksic on 2017-01-08.
 */

var led = (function () {

    var vardagsrumStatus,kokStatus,allaLamporStatus;

    allaLamporON = function () {
        allaLamporStatus = "1";
        clientMQTT.sendMessage("vardagsrum", allaLamporStatus);
        clientMQTT.sendMessage("kok", allaLamporStatus);
        document.getElementById('vardagsrum').checked = true;
        document.getElementById('kok').checked = true;
    };

    allaLamporOFF = function () {
        allaLamporStatus = "0";
        clientMQTT.sendMessage("vardagsrum", allaLamporStatus);
        clientMQTT.sendMessage("kok", allaLamporStatus);
        document.getElementById('vardagsrum').checked = false;
        document.getElementById('kok').checked = false;
    };

    vardagsrum = function () {
        if(event.value){
            vardagsrumStatus = "1";
        }
        else{
            vardagsrumStatus = "0";
        }
        clientMQTT.sendMessage("vardagsrum", vardagsrumStatus);
    };

    sovrum = function () {
        if(event.value){
            status = "1";
        }
        else{
            status = "0";
        }
        clientMQTT.sendMessage("sovrum", status);
    };

    kok = function () {
        if(event.value){
            kokStatus = "1";
        }
        else{
            kokStatus = "0";
        }
        clientMQTT.sendMessage("kok", kokStatus);
    };

    //{ "ledVardagsrum": "0", "ledKok": "1" }
    updateStatus = function (ledStatus) {
        if(ledStatus.ledVardagsrum == "0"){
            document.getElementById('vardagsrum').checked = false;
            vardagsrumStatus = "0";
        }
        else{
            document.getElementById('vardagsrum').checked = true;
            vardagsrumStatus = "1";
        }
        if(ledStatus.ledKok == "0"){
            document.getElementById('kok').checked = false;
            kokStatus = "0";
        }
        else{
            document.getElementById('kok').checked = true;
            kokStatus = "1";
        }
    };

    return {
        toggleLedAllaLamporON: allaLamporON,
        toggleLedAllaLamporOFF: allaLamporOFF,
        toggleLedVardagsrum: vardagsrum,
        toggleLedSovrum: sovrum,
        toggleLedKok: kok,
        updateLedStatus: updateStatus
    };
})();
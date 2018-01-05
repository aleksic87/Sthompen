/**
 * Created by Aleksic on 2017-01-08.
 */

var led = (function () {

    var vardagsrumStatus,vardagsrum2Status,gastrumStatus,sovrumStatus,allaLamporStatus,autotimerStatus;

    allaLamporON = function () {
        allaLamporStatus = "1";
        clientMQTT.sendMessage("vardagsrum", allaLamporStatus);
        if(document.getElementById('vardagsrum2').checked == false) {
            clientMQTT.sendMessage("vardagsrum2", allaLamporStatus);
        }
        clientMQTT.sendMessage("gastrum", allaLamporStatus);
        clientMQTT.sendMessage("sovrum", allaLamporStatus);
        document.getElementById('vardagsrum').checked = true;
        document.getElementById('vardagsrum2').checked = true;
        document.getElementById('gastrum').checked = true;
        document.getElementById('sovrum').checked = true;
    };

    allaLamporOFF = function () {
        allaLamporStatus = "0";
        clientMQTT.sendMessage("vardagsrum", allaLamporStatus);
        clientMQTT.sendMessage("vardagsrum2", allaLamporStatus);
        clientMQTT.sendMessage("gastrum", allaLamporStatus);
        clientMQTT.sendMessage("sovrum", allaLamporStatus);
        document.getElementById('vardagsrum').checked = false;
        document.getElementById('vardagsrum2').checked = false;
        document.getElementById('gastrum').checked = false;
        document.getElementById('sovrum').checked = false;
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
    vardagsrum2 = function () {
        if(event.value){
            vardagsrum2Status = "1";
        }
        else{
            vardagsrum2Status = "0";
        }
        clientMQTT.sendMessage("vardagsrum2", vardagsrum2Status);
    };
    vardagsrum2Dim = function () {
        if(document.getElementById('vardagsrum2').checked == true) {
            clientMQTT.sendMessage("vardagsrum2Dim", "1");
            if(document.getElementById('vardagsrum2Dim').style.backgroundColor != 'rgb(174, 180, 4)') {
                document.getElementById('vardagsrum2Dim').style.backgroundColor = 'rgb(174, 180, 4)';
            }
            else{
                document.getElementById('vardagsrum2Dim').style.backgroundColor = 'rgba(24, 103, 194, 0.81)';
            }
        }
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

    gastrum = function () {
        if(event.value){
            gastrumStatus = "1";
        }
        else{
            gastrumStatus = "0";
        }
        clientMQTT.sendMessage("gastrum", gastrumStatus);
    };

    autotimer = function () {
        if(event.value){
            status = "1";
        }
        else{
            status = "0";
        }
        clientMQTT.sendMessage("autotimer", status);
    };

    updateStatus = function (ledStatus) {
        if(ledStatus.ledVardagsrum == "0"){
            document.getElementById('vardagsrum').checked = false;
            vardagsrumStatus = "0";
        }
        else{
            document.getElementById('vardagsrum').checked = true;
            vardagsrumStatus = "1";
        }
        if(ledStatus.ledVardagsrum2 == "0"){
            document.getElementById('vardagsrum2').checked = false;
            vardagsrum2Status = "0";
        }
        else{
            document.getElementById('vardagsrum2').checked = true;
            vardagsrum2Status = "1";
        }
        if(ledStatus.ledGastrum == "0"){
            document.getElementById('gastrum').checked = false;
            gastrumStatus = "0";
        }
        else{
            document.getElementById('gastrum').checked = true;
            gastrumStatus = "1";
        }
        if(ledStatus.ledSovrum == "0"){
            document.getElementById('sovrum').checked = false;
            sovrumStatus = "0";
        }
        else{
            document.getElementById('sovrum').checked = true;
            sovrumStatus = "1";
        }
        if(ledStatus.autotimer == "0"){
            document.getElementById('autotimer').checked = false;
            autotimerStatus = "0";
        }
        else{
            document.getElementById('autotimer').checked = true;
            autotimerStatus = "1";
        }
    };

    return {
        toggleLedAllaLamporON: allaLamporON,
        toggleLedAllaLamporOFF: allaLamporOFF,
        toggleLedVardagsrum: vardagsrum,
        toggleLedVardagsrum2: vardagsrum2,
        toggleLedVardagsrum2Dim: vardagsrum2Dim,
        toggleLedSovrum: sovrum,
        toggleLedGastrum: gastrum,
        toggleAutotimer: autotimer,
        updateLedStatus: updateStatus
    };
})();
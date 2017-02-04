/**
 * Created by Aleksic on 2017-01-06.
 */

var clientMQTT = (function () {
    var client;
    var start, onConnect, doFail, sendMessage, onConnectionLost, onMessageArrived, getConnectionStatus, dialogAlert;
    var connected = false;

    // Cloud MQTT settings
    var hostname = 'm21.cloudmqtt.com';
    var port = 37354;
    var username = 'ggsttchk';
    var password = 'uQnoGIer-6l4';

    var clientID = "web" + Math.random();

    // connect the client
    start = function () {
        client = new Paho.MQTT.Client(hostname, port, clientID);
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;
        var options = {
            useSSL: true,
            userName: username,
            password: password,
            onSuccess: onConnect,
            onFailure: doFail
        };
        client.connect(options);
        var modal = document.querySelector('ons-modal');
        modal.show();
    };

    // called when the client connects
    onConnect = function () {
        connected = true;
        debugLogger.debugLog("Connected to MQTT");
        console.log('Connected with MQTT');
        client.subscribe("listen",0);
        client.subscribe("tempSensor",0);
        client.subscribe("motionstatus",0);
        client.subscribe("led",0);
        client.subscribe("appConnectLEDResponse",0);
        client.subscribe("appConnectPIRResponse",0);
        client.subscribe("liveUpdateLeds",0);
        document.getElementById("allaLamporOFF").addEventListener("click", led.toggleLedAllaLamporOFF);
        document.getElementById("allaLamporON").addEventListener("click", led.toggleLedAllaLamporON);
        document.getElementById("vardagsrum").addEventListener("change", led.toggleLedVardagsrum);
        document.getElementById("vardagsrum2").addEventListener("change", led.toggleLedVardagsrum2);
        document.getElementById("vardagsrum2Dim").addEventListener("click", led.toggleLedVardagsrum2Dim);
        document.getElementById("sovrum").addEventListener("change", led.toggleLedSovrum);
        document.getElementById("gastrum").addEventListener("change", led.toggleLedGastrum);

        //Init sensor status
        var obj = JSON.parse(0);
        var newMsg = JSON.stringify(obj);
        var message = new Paho.MQTT.Message(newMsg);
        message.destinationName = "appConnect";
        client.send(message);

        document.addEventListener('deviceready', function () {
            cordova.plugins.backgroundMode.enable();
        }, false);
    };

    // called when the connect to client fails
    doFail = function (e) {
        connected = false;
        debugLogger.debugLog("Failed to connect with MQTT: " + JSON.stringify(e));
        console.log("Failed to connect with MQTT: " + JSON.stringify(e));
        clientMQTT.startMQTT();
    };

    // called when send-button is pressed
    sendMessage = function (topic, msg) {
        var obj = JSON.parse(msg);
        var newMsg = JSON.stringify(obj);
        var message = new Paho.MQTT.Message(newMsg);
        message.destinationName = topic;
        debugLogger.debugLog("Send message to MQTT: " + topic + " : " + payload);
        client.send(message);
    };

    // called when the client loses its connection
    onConnectionLost = function (responseObject) {
        connected=false;
        debugLogger.debugLog("Lost connection with MQTT");
        console.log("Lost connection with MQTT");
        if (responseObject.errorCode !== 0) {
            console.log("Lost connection with MQTT" + JSON.stringify(responseObject));
        }
        clientMQTT.startMQTT();
    };

    // called when a message arrives
    onMessageArrived = function (message) {
        payload = message.payloadString;
        var jsonObj = $.parseJSON(payload);
        topic = message.destinationName;
        debugLogger.debugLog("Receive message from MQTT: " + topic + " : " + payload);
        if (topic == "motionstatus") {
            pir.pirFunc();
            //plot.drawPIR(jsonObj);
        }
        if (topic == "appConnectLEDResponse" || topic == "liveUpdateLeds") {
            led.updateLedStatus(jsonObj);
            var modal = document.querySelector('ons-modal');
            setTimeout(function() {
                modal.hide();
            }, 500);
        }
        if (topic == "appConnectPIRResponse") {
            plot.drawPIR(jsonObj);
        }
        if (topic == "tempSensor") {
            temp.tempsens(jsonObj);
        }
    }

    getConnectionStatus = function () {
        if(connected) {
            document.getElementById("isConnected").innerHTML = "Sann";
        }
        else{
            document.getElementById("isConnected").innerHTML = "Falsk";
        }
        return connected;
    };

    dialogAlert = function () {
        var message = "I am Alert Dialog!";
        var title = "ALERT";
        var buttonName = "Alert Button";

        if(navigator.notification)
            navigator.notification.alert(message, alertCallback, title, buttonName);
        else
            alert("HEJ");
        function alertCallback() {
            console.log("Alert is Dismissed!");
        }

    }

    vibration = function () {
        var time = 3000;
        navigator.vibrate(time);
    }

    return {
        startMQTT: start,
        isConnected: getConnectionStatus,
        sendMessage: sendMessage,
        dialogAlert: dialogAlert,
        vibration: vibration
    };
})();

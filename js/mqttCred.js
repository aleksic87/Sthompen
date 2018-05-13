/**
 * Created by Aleksic on 2017-02-16.
 */

var mqttCredentials = (function () {

    getmqttCred = function () {
        // Cloud MQTT settings
        var _hostname = 'm20.cloudmqtt.com';
        var _port = 33497;
        var _username = 'vkdrgygo';
        var _password = 'EI19nfbVay58';
        var cred = {
            hostname: _hostname,
            port: _port,
            username: _username,
            password: _password
        }
        return cred;
    };


    passwordLogin = function () {
        var password = document.getElementById("password").value;
        if(password == "h"){
            document.getElementById("login").style.display = "none";
            document.getElementById("wrongPW").style.display = "none";

            document.getElementById("list").style.display = "block";
            document.getElementById("tempclass").style.display = "block";
        }
        else{
            document.getElementById("wrongPW").style.display = "block";

        }

    };

    return {
        getmqttCred: getmqttCred,
        passwordLogin: passwordLogin
    };
})();
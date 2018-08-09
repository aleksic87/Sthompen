/**
 * Created by Aleksic on 2018-05-10.
 */

var strava = (function () {

    getAthlete = function (payload) {
        
        var strava = require('strava-v3');
        strava.athlete.get({},function(err,payload,limits) {
            if(!err) {
                console.log(payload);
            }
            else {
                console.log(err);
            }
        });
        
    };

    return {
        getAthlete: getAthlete
    };
})();
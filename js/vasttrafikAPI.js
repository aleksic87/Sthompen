/**
 * Created by Aleksic on 2017-02-24.
 */

var vasttrafikObj = (function () {
    var requestVapi,getLocation;
    var brunnsparken_D_id = "9022014001760004"; // Från stan
    var ullevinorra_A_id = "9022014007171001"; // Mot stan/korsvägen
    var ullevinorra_B_id = "9022014007171002"; // Mot svingeln
    var svingeln_A_id = "9022014006480001"; // Mot ullevi norra

    getVasttrafikToken = function (succes_callback, stop) {
        $.ajax({
            type: "POST",
            url: "https://api.vasttrafik.se:443/token?grant_type=client_credentials",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Basic SGRnNF9teWlSU1B4V0dXY2Q0MlFoOUxMU2NNYTpjcWlCdXJ3cUpkVzh4UWUxM0VrZ3dLNUtMdkVh');
            },
            success: function(data){
                succes_callback(data, stop)
            }
        });
    },

    getUrl = function (stop, id) {
        directionId = id;
        var d = new Date();
        if(d.getMonth()+1 < 10) {
            var month = "0"+(d.getMonth() + 1);
        }
        else{
            var month = (d.getMonth() + 1);
        }
        var date = d.getFullYear()+"-"+month+"-"+d.getDate();
        var time = d.getHours()+'%3A'+d.getMinutes();

        if(stop == "Brunnsparken"){
            id = brunnsparken_D_id;
            directionId = ullevinorra_B_id;
        }
        else if(stop == "Ullevi Norra"){
            id = svingeln_A_id;
            directionId = ullevinorra_A_id;
        }
        if(stop == "Brunnsparken" || stop == "Ullevi Norra"){
        return "https://api.vasttrafik.se/bin/rest.exe/v2/departureBoard?id="+id+"&date=" +
                date+"&time="+time+"&useVas=0&useLDTrain=0&useRegTrain=0&useBus=0&useBoat=0&timeSpan=" +
                "60maxDeparturesPerLine=3&direction="+directionId+"&format=json"
            }
            else{
                return "https://api.vasttrafik.se/bin/rest.exe/v2/departureBoard?id="+id+"&date=" +
                date+"&time="+time+"&useVas=0&useLDTrain=0&useRegTrain=0&useBus=0&useBoat=0&timeSpan=" +
                "60maxDeparturesPerLine=3&format=json"
            }
    },

    generateTrams = function (response, stop, id) {
        var trams;
        var listItems = 0;
        var array = response.DepartureBoard.Departure;
        //for(var trams=0; trams<array.length; trams++){
        for(trams in array){
            if(listItems==20){
                break;
            }
            if(stop == "Brunnsparken" && (array[trams].sname == "2" || array[trams].sname == "6" || array[trams].sname == "7" || array[trams].sname == "9")){
                continue;
            }
            else{
            // Populate page
            document.getElementById("vasttrafikApi").innerHTML = document.getElementById("vasttrafikApi").innerHTML +

                '<ons-list-item>'+
                    '<div class="left">'+
                        '<img class="list-item__thumbnail" src="img/trams/'+array[trams].sname+'.png">'+
                    '</div>'+
                    '<div class="center">'+
                        '<span class="list-item__title"><B>'+array[trams].time+"</B> "+array[trams].direction+'</span>'+
                    '</div>'+
                '</ons-list-item>';
                listItems++;
            }
        }
    },

    getNearbyStops = function (response, stop) {
        var access_token = response.access_token;
        $.ajax({
            type: "GET",
            url: "https://api.vasttrafik.se/bin/rest.exe/v2/location.nearbystops?originCoordLat=57.7111136&originCoordLong=11.9860736&format=json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader( "Authorization", "Bearer " + access_token );
            },
            success: function(data){
                var name = data.LocationList.StopLocation[0].name;
                var id = data.LocationList.StopLocation[0].id;
                getFavouriteStops(response, name, id);
            }
        });

    },

    getFavouriteStops = function (response, stop, id) {
        var access_token = response.access_token;
        document.getElementById("vasttrafikApi").innerHTML = "Från "+stop+": <br>";
            $.ajax({
                url: vasttrafikObj.getUrl(stop, id),
                type: 'GET',
                beforeSend : function( xhr ) {
                    xhr.setRequestHeader( "Authorization", "Bearer " + access_token );
                },
                success: function(response, request){
                    vasttrafikObj.generateTrams(response, stop, id);
                }
            });
    },

    bootstrapVT = function (stop) {
        if(stop == "Min Plats"){
            getVasttrafikToken(getNearbyStops, stop);
        }
        else{
            getVasttrafikToken(getFavouriteStops, stop);
        }

    },

    showPopover = function(target) {
        mqttCredentials.getVasttrafikToken();
        document.getElementById('popover').show(target);
    },

    hidePopover = function() {
        document.getElementById('popover').hide();
    }

    return {
        getVasttrafikToken: getVasttrafikToken,
        getUrl: getUrl,
        generateTrams: generateTrams,
        getNearbyStops: getNearbyStops,
        getFavouriteStops: getFavouriteStops,
        bootstrapVT: bootstrapVT,
        showPopover: showPopover,
        hidePopover: hidePopover
    };
})();
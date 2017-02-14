/**
 * Created by Aleksic on 2017-02-02.
 */

var chart = (function () {
    var containerrR, payload,timeString,hour,minute,second;
    var inneArray = [60];
    var uteArray = [60];
    var luftArray = [60];

    plotTempChart = function(msg) {
        randomNumbers();
        payload = msg;
        containerrR = document.getElementById("containerrR");
        timeString = payload.timeQueue[0];
        var hourIndex = timeString.search("h");
        var hourString = timeString.substring(hourIndex+1,hourIndex+3);
        hour = parseInt(hourString);

        Highcharts.chart('containerrR', {
            chart: {
                type: 'area',
                zoomType: 'xy'
            },
            title: {
                text: 'Temperatur/Luftfuktighet'
            },
            subtitle: {
                text: 'Senaste 24h'
            },
            xAxis: {
                allowDecimals: false,
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                }
            },
            yAxis: {
                title: {
                    text: 'Temp/%'
                },
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            plotOptions: {
                area: {
                    pointStart: 0,
                    pointInterval: 1/4,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [
                {
                    name: 'Luftfuktighet',
                    data: payload.humidityQueue

                },
                {
                    name: 'Inne',
                    data: payload.insideQueue

                },
                {
                    name: 'Ute',
                    data: payload.outsideQueue
                }]
        });
    }

    function randomIntFromInterval(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    randomNumbers = function(){
        (Math.floor(Math.random() * 25) + 18  ); // Inne
        (Math.floor(Math.random() * 8) + 1  ); // Ute
        (Math.floor(Math.random() * 38) + 22  ); // Luft

        for(i=0; i<60; i++){
            tempVal = randomIntFromInterval(19,24); // Inne
            inneArray[i] = tempVal;
        }
        for(j=0; j<60; j++){
            tempVal = randomIntFromInterval(1,12); // Ute
            uteArray[j] = tempVal;
        }
        for(k=0; k<60; k++){
            tempVal = randomIntFromInterval(24,35); // Luft
            luftArray[k] = tempVal;
        }
    }

    return {
        plotTempChart: plotTempChart
    };
})();
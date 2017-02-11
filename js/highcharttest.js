/**
 * Created by Aleksic on 2017-02-02.
 */

var chart = (function () {
    var containerr, payload;
    var inneArray = [60];
    var uteArray = [60];
    var luftArray = [60];

    ddd = function (msg) {
        payload = msg;
         containerr = document.getElementById("containerr");

        Highcharts.chart(containerr, {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Temperatur senaste 24h'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'Tid'
            },
            yAxis: {
                title: {
                    text: 'Temp'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'USD to EUR',
                data: payload
            }]
        });

    }

    eee = function(msg) {
        randomNumbers();
        payload = msg;
        containerrR = document.getElementById("containerrR");

        Highcharts.chart('containerrR', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Temperatur/Luftfuktighet'
            },
            subtitle: {
                text: 'Senaste 60h'
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
                pointFormat: '{series.name} <b>{point.y:,.0f}</b><br/> {point.x} timmar sedan '
            },
            plotOptions: {
                area: {
                    pointStart: 0,
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
                    data: luftArray

                },
                {
                    name: 'Inne',
                    data: inneArray

                },
                {
                    name: 'Ute',
                    data: uteArray
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
        ddd: ddd,
        eee: eee
    };
})();
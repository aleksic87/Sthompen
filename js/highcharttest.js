/**
 * Created by Aleksic on 2017-02-02.
 */

var chart = (function () {
    var containerrR,containerrRR,timeChart,pieChart3D,pieChart3D2, payload,timeString,hour,minute,second;

    plotInsideTempChart = function(msg) {
        payload = msg;
        containerrR = document.getElementById("containerrRR");
        var CHART_LENGTH = 25;
        var labelsFromPsql = new Array(CHART_LENGTH);
        var invertedDataInside = new Array(CHART_LENGTH);
        var i = 0;
        for(i ; i<labelsFromPsql.length; i++){
            labelsFromPsql[i] = i;
        }
        var index = 0;
        var j = 1;
        for(index ; j<=CHART_LENGTH; index++){
            invertedDataInside[index] = payload.insideQueue[payload.insideQueue.length-j];
            j++;
        }

        var ctx = document.getElementById('insideTempChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: labelsFromPsql,
                datasets: [{
                    label: "Innetemperatur senaste 24h (0 = Nu)",
                    backgroundColor: 'rgb(124, 19, 19)',
                    borderColor: 'rgb(110, 15, 15)',
                    data: invertedDataInside,
                }]
            },

            // Configuration options go here
            options: {}
        });
    }

        plotOutsideTempChart = function(msg) {
        payload = msg;
        containerrR = document.getElementById("containerrR");
        var CHART_LENGTH = 25;
        var labelsFromPsql = new Array(CHART_LENGTH);
        var invertedDataOutside = new Array(CHART_LENGTH);
        var i = 0;
        for(i ; i<labelsFromPsql.length; i++){
            labelsFromPsql[i] = i;
        }
        var index = 0;
        var j = 1;
        for(index ; j<=CHART_LENGTH; index++){
            invertedDataOutside[index] = payload.outsideQueue[payload.outsideQueue.length-j];
            j++;
        }

        var ctx = document.getElementById('outsideTempChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: labelsFromPsql,
                datasets: [{
                    label: "Utetemperatur senaste 24h",
                    backgroundColor: 'rgb(115, 161, 240)',
                    borderColor: 'rgb(53, 121, 239)',
                    data: invertedDataOutside,
                }]
            },

            // Configuration options go here
            options: {}
        });
    }

        plotHumidityTempChart = function(msg) {
        payload = msg;
        containerrR = document.getElementById("containerrR");
        var CHART_LENGTH = 25;
        var labelsFromPsql = new Array(CHART_LENGTH);
        var invertedDataHumidity = new Array(CHART_LENGTH);
        var i = 0;
        for(i ; i<labelsFromPsql.length; i++){
            labelsFromPsql[i] = i;
        }
        var index = 0;
        var j = 1;
        for(index ; j<=CHART_LENGTH; index++){
            invertedDataHumidity[index] = payload.humidityQueue[payload.humidityQueue.length-j];
            j++;
        }

        var ctx = document.getElementById('humidityChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: labelsFromPsql,
                datasets: [{
                    label: "Luftfuktighet senaste 24h (0 = Nu)",
                    backgroundColor: 'rgb(88, 200, 200)',
                    borderColor: 'rgb(70, 157, 164)',
                    data: invertedDataHumidity,
                }]
            },

            // Configuration options go here
            options: {}
        });
    }

    plotTimeChart = function(msg) {
        payload = msg;
        timeChart = document.getElementById("timeChart");

        Highcharts.chart('timeChart', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Temperatur/Tid'
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: -10,
                title: {
                    text: 'Temp'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: 'Temperatur: <b>{point.y:.1f} grader</b>'
            },
            series: [{
                name: 'Population',
                data: [
                    [payload.timeQueue[1100], payload.outsideQueue[1100]],
                    [payload.timeQueue[1101], payload.outsideQueue[1101]],
                    [payload.timeQueue[1102], payload.outsideQueue[1102]],
                    [payload.timeQueue[1103], payload.outsideQueue[1103]],
                    [payload.timeQueue[1104], payload.outsideQueue[1104]],
                    [payload.timeQueue[1105], payload.outsideQueue[1105]],
                    [payload.timeQueue[1106], payload.outsideQueue[1106]],
                    [payload.timeQueue[1107], payload.outsideQueue[1107]],
                    [payload.timeQueue[1108], payload.outsideQueue[1108]],
                    [payload.timeQueue[1109], payload.outsideQueue[1109]],
                    [payload.timeQueue[1110], payload.outsideQueue[1110]],
                    [payload.timeQueue[1111], payload.outsideQueue[1111]]
                ],
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.1f}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
        });
    }

    plotPieChart3D = function(msg) {
        payload = msg;
        pieChart3D = document.getElementById("pieChart3D");

        Highcharts.chart('pieChart3D', {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: 'Temperatur/Luftfuktighet'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 45,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: [
                    ['Luftfuktighet', payload.humidity],
                    ['Inne', payload.inside],
                    {
                        name: 'Ute',
                        y: payload.outside,
                        sliced: true,
                        selected: true
                    }
                ]
            }]
        });
    }
    plotPieChart3D2 = function(msg) {
        payload = msg;
        pieChart3D2 = document.getElementById("pieChart3D2");

        Highcharts.chart('pieChart3D2', {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: 'Temperatur/Luftfuktighet'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 45,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: [
                    ['Luftfuktighet', payload.humidity],
                    ['Inne', payload.inside],
                    {
                        name: 'Ute',
                        y: payload.outside,
                        sliced: true,
                        selected: true
                    }
                ]
            }]
        });
    }
    return {
        plotOutsideTempChart: plotOutsideTempChart,
        plotInsideTempChart: plotInsideTempChart,
        plotHumidityTempChart: plotHumidityTempChart,
        plotTimeChart: plotTimeChart,
        plotPieChart3D: plotPieChart3D,
        plotPieChart3D2: plotPieChart3D2
    };
})();

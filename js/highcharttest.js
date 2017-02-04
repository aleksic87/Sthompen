/**
 * Created by Aleksic on 2017-02-02.
 */

var chart = (function () {

    ddd = function () {
        var containerr = document.getElementById("containerr");
        var myChart = Highcharts.chart(containerr, {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Fruit Consumption'
            },
            xAxis: {
                categories: ['Apples', 'Bananas', 'Oranges']
            },
            yAxis: {
                title: {
                    text: 'Fruit eaten'
                }
            },
            series: [{
                name: 'Jane',
                data: [1, 0, 4]
            }, {
                name: 'John',
                data: [5, 7, 3]
            }]
        });
    }

    return {
        ddd: ddd
    };
})();
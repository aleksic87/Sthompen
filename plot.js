/**
 * Created by Aleksic on 2017-01-07.
 */

var plot = (function () {

    var data, drawPIR, drawChart;

    drawPIR = function (msg) {
        payload = msg;
        // Load the Visualization API and the corechart package.
        google.charts.load('current', {'packages':['corechart']});
        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChart);
    }

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    drawChart = function () {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Tid');
        data.addColumn('number', 'Rörelse');
        data.addRows(payload);
        var data1 = new google.visualization.DataTable();
        data1.addColumn('string', 'Tid');
        data1.addColumn('number', 'Temp');
        data1.addRows(payload);
        var data2 = new google.visualization.DataTable();
        data2.addColumn('string', 'Tid');
        data2.addColumn('number', 'Luft');
        data2.addRows(payload);

        // Set chart options
        var options = {'title':'Rörelsedetektor',
            'width':375,
            'height':175};
        var options1 = {'title':'Temp',
            'width':375,
            'height':175};
        var options2 = {'title':'Luftkvalité',
            'width':375,
            'height':175};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        chart.draw(data, options);
        var chart1 = new google.visualization.ScatterChart(document.getElementById('chart_div1'));
        chart1.draw(data1, options1);
        var chart2 = new google.visualization.AreaChart(document.getElementById('chart_div2'));
        chart2.draw(data2, options2);
    }

    return {
        drawPIR: drawPIR
    };
})();
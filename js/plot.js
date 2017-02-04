/**
 * Created by Aleksic on 2017-01-07.
 */

var plot = (function () {

    var dataPIR, dataTemp, drawPIR, drawTemp, drawChartPIR, drawChartTemp, payloadPIR, payloadTemp;

    drawPIR = function (msg) {
        payloadPIR = msg;
        // Load the Visualization API and the corechart package.
        google.charts.load('current', {'packages':['corechart']});
        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChartPIR);
    }
    drawTemp = function (msg) {
        payloadTemp = msg;
        // Load the Visualization API and the corechart package.
        google.charts.load('current', {'packages':['corechart']});
        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChartTemp);
    }

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    drawChartPIR = function () {

        // Create the data table.
        dataPIR = new google.visualization.DataTable();
        dataPIR.addColumn('string', 'Tid');
        dataPIR.addColumn('number', 'Rörelse');
        dataPIR.addRows(payloadPIR);

        // Set chart options
        var options = {'title':'Rörelsedetektor',
            'width':355,
            'height':175};

        // Instantiate and draw our chart, passing in some options.
        //var chart = new google.visualization.ColumnChart(document.getElementById('PIRChart_div'));
        var chart = new google.visualization.AreaChart(document.getElementById('PIRChart_div'));
        chart.draw(dataPIR, options);
    }
    drawChartTemp = function () {

        // Create the data table.
        dataTemp = new google.visualization.DataTable();
        dataTemp.addColumn('string', 'Tid');
        dataTemp.addColumn('number', '℃');
        dataTemp.addRows(payloadTemp);

        // Set chart options
        var options = {'title':'Temperatur',
            'width':375,
            'height':175};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.AreaChart(document.getElementById('tempChart_div'));
        chart.draw(dataTemp, options);
    }
    return {
        drawPIR: drawPIR,
        drawTemp: drawTemp
    };
})();
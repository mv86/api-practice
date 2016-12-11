var ColumnChart = function(chartType, title, chartName, chartData, categories, yAxisName) {
  var container = document.getElementById('graph-cell');
    var chart = new Highcharts.Chart({
      chart: {
        type: chartType,
        renderTo: container
      },
      title: {
        text: title
      },
      series: [{
        name: chartName,
        data: chartData
      }],
      xAxis: {
        categories: categories
      },
      yAxis: {
        title: {text: yAxisName}
      }
    });
};
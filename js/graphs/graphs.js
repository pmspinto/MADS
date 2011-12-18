//GRAPHS

function Burndown(project, xVars) {
	var chart;
	chart = new Highcharts.Chart({
		chart: {
			renderTo: 'graph_container',
			defaultSeriesType: 'line',
			
			marginBottom: 55
		},
		title: {
			text: 'Burndown chart',
			x: -20 //center
		},
		subtitle: {
			text: project,
			x: -20
		},
		xAxis: {
			title: {
				text: 'Sprint'
			},
			categories: xVars
		},
		yAxis: {
			title: {
				text: 'Effort Points Left'
			},
			min: 0,
			plotLines: [{
				value: 0,
				width: 1,
				color: '#808080'
			}]
		},
		tooltip: {
			formatter: function() {
					return '<b>'+ this.series.name +'</b><br/>'+
					'Task n';
			}
		},
		legend: {
			enabled: false
		},
		series: [{
			data: [ 28, 25, 23, 21, 18, 14, 10, 7, 6, 5, 3, 0]
		}]
	});	
}
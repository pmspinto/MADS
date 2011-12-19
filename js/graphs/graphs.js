//GRAPHS

function Graph(project, xVars, yVars, xLegend, yLegend, typeText, container) {
	var chart;
	chart = new Highcharts.Chart({
		chart: {
			renderTo: container,
			defaultSeriesType: 'line',
			marginBottom: 55
		},
		title: {
			text: typeText+' chart',
			x: -20 //center
		},
		subtitle: {
			text: project,
			x: -20
		},
		xAxis: {
			title: {
				text: xLegend
			},
			categories: xVars
		},
		yAxis: {
			title: {
				text: yLegend
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
					return '<b>'+ project +'</b><br/>'+
					'Task n';
			}
		},
		legend: {
			enabled: false
		},
		series: [{
			data: yVars
		}]
	});	
}
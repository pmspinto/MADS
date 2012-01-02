//GRAPHS

function Graph(project, xVars, yVars, annot, xLegend, yLegend, typeText, container) {
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
					if(this.x == 0)
						return '<b>Start</b>';
					else {
						var tex = '<b>Tasks finished:</b>';
						for(var i = 0; i<annot[this.x].length; i++)
							tex += '<br/>-'+annot[this.x][i];
						return tex;
					}
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

function VelGraph(project, xVars, yVars, xLegend, yLegend, typeText, container) {
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
				return '<b>Velocity: </b>'+this.y;	
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
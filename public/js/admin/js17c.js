$(document).ready(function() {
	'use strict';	
	
	/* Time based Charts */	
	function gd(year, month, day) {
		return new Date(year, month - 1, day).getTime();	
	};

	/* Time Chart */
	var timechart = $('#time-chart');
	var dataSetB = [
		[gd(2018, 6, 1), 353], [gd(2018, 6, 2), 457], [gd(2018, 6, 3), 412],
		[gd(2018, 6, 4), 397], [gd(2018, 6, 5), 388], [gd(2018, 6, 6), 420],
		[gd(2018, 6, 7), 452], [gd(2018, 6, 8), 364], [gd(2018, 6, 9), 411],
		[gd(2018, 6, 10), 213]
	];
	

	var dataTimeB = [{label: "Hours", data: dataSetB}];
	
	/* Define your own ticks - https://stackoverflow.com/questions/35337551/flot-displaying-correct-date-figures-on-xaxis-using-time */
	
	var optionSetB = {
		series: {
			bars: {
				show: true,
				barWidth: 0.8,
				lineWidth: 1,
				lines: { show: true },
				fill: true,
				fillColor: {
					colors: [{
						opacity: 0.8
					}, {
						opacity: 0.8
					}]
				},
				align: 'center' 

			}
		},
		shadowSize: 0,
		xaxis: {
			mode: "time",
			timezone: "browser",
			timeBase: "milliseconds",
			minTickSize: [1, "day"],
		},
		yaxis:{
			tickFormatter: function (v, axis) {
				return numeral(v).format('0,0');
			}
		},
		colors: ["#5BC3D5"],
		grid: {
            borderColor: {left: '#efefef', bottom: '#efefef'},
		    borderWidth: 1,
			hoverable: true, /* You need to set flot option hoverable to true if you want flot.tooltip plugin to work.*/
			clickable: true,
			color: "white",
		},

		/* Flot tooltip plugin required */
		
		tooltip: {
			show: true,
			content: " %x - %y hrs",
		}
		

	}
	
	$.plot(timechart, dataTimeB, optionSetB);
	
	

	
	/* Type Pie Chart */
	var typechart = $('#type-chart');
	
	var dataSetF = [
	{label: "Mobile App", data: 15, color: "#75c181"},
	{label: "Social Media", data: 10, color: "#58bbee"},
	{label: "Marketing", data: 15, color: "#8A40A7"},
	{label: "Web App", data: 35, color: "#5D6BA7"},
	{label: "Sales", data: 25, color: "#F2B542"},
	];

	var optionSetF = {
		series: {
			pie: {
				show: true,
				innerRadius: 0.5,
				highlight: {
					opacity: 0.2
				},
				
			}
		},
		grid: {
			hoverable: true /* You need to set flot option hoverable to true if you want flot.tooltip plugin to work.*/
		},
			

		/* Flot tooltip plugin required */
		tooltip: {
			show: true,
			content: "%s: %p.0%",
			shifts: {
				x: 20,
				y: 0
			}
		}
	}

	$.plot(typechart, dataSetF, optionSetF);


	/* Sales Chart */
	
	var saleschart = $('#sales-chart');
	
	var dataSetA = [

	[gd(2018, 5, 27), 3503], [gd(2018, 5, 28), 4114], [gd(2018, 5, 29), 3876],
	[gd(2018, 5, 30), 4322], [gd(2018, 5, 31), 3750], [gd(2018, 6, 1), 4118],
	[gd(2018, 6, 2), 4318], [gd(2018, 6, 3), 3821], [gd(2018, 6, 4), 4821],
	[gd(2018, 6, 5), 4618], [gd(2018, 6, 6), 4521], [gd(2018, 6, 7), 4123],
	[gd(2018, 6, 8), 4944], [gd(2018, 6, 9), 4803], [gd(2018, 6, 10), 4700],
	[gd(2018, 6, 11), 4333], [gd(2018, 6, 12), 4567], [gd(2018, 6, 13), 4760],

	];


	var dataSales = [{label: "Sales", data: dataSetA, points: { symbol: "circle"}}]

	var optionSetA = {
		series: {
			lines: {
				show: true,
				lineWidth: 1.5,
				fill: true,
				fillColor: {
					colors: [{
						opacity: 0.1
					}, {
						opacity: 0.4
					}]
				}
			},
			points: {
				radius: 2,
				fill: true,
				show: true
			}
		},
		shadowSize: 0,
		xaxis: {
			mode: "time",
			timezone: "browser",
			minTickSize: [2, "day"],
			timeBase: "milliseconds",

		},
		yaxis:{

			tickFormatter: function (v, axis) {
				return numeral(v).format('0,0');
			}

		},
		colors: ["#75c181"],
		grid: {
			color: "#efefef",
			borderWidth: 0,
			hoverable: true, /* You need to set flot option hoverable to true if you want flot.tooltip plugin to work.*/
			clickable: true,
			backgroundColor: {colors: ["#EDF5FF", "#ffffff"]}
		},

		/* Flot tooltip plugin required */
		tooltip: true,
		tooltipOpts: {
			content: "%x - $%y"
		}
	}
	$.plot(saleschart, dataSales, optionSetA);
	
	// Update the flot charts on window resize
	window.onresize = function(event) {
        $.plot(timechart, dataTimeB, optionSetB);
        $.plot(typechart, dataSetF, optionSetF);
        $.plot(saleschart, dataSales, optionSetA);
    }


	/* jQuery map */
	$('#world-map').vectorMap({
		map: 'world_mill_en',
		backgroundColor: "none",
		regionStyle: {
			initial: {
				fill: '#B8E9EE',
				"fill-opacity": 1,
				stroke: 'none',
				"stroke-width": 0,
				"stroke-opacity": 1
			},
			hover: {
				"fill-opacity": 0.9,
				cursor: 'pointer'
			},
		},
		markerStyle: {
			initial: {
				fill: '#FB866A',
				"fill-opacity": 0.9,
				"stroke-width": 2,
				"stroke-opacity": 0.3,
				stroke: '#FB866A',
				r: 5
			},
			hover: {
				fill: '#EC573A',
				"fill-opacity": 1,
				stroke: '#FB866A',
				"stroke-width": 4,
				"stroke-opacity": 0.4,
				cursor: 'pointer'
			},
			selected: {
				fill: '#FB866A'
			},
		},

		markers: [
		{latLng: [51.463700, -2.588313], name: 'Bristol'},
		{latLng: [40.717801, -74.003720], name: 'New York'},
		{latLng: [37.770044, -122.466440], name: 'San Francisco'},
		{latLng: [51.518304, -0.126323], name: 'London'},
		{latLng: [39.914323, 116.391941], name: 'Beijing'},
		{latLng: [22.287112, 114.172508], name: 'Hongkong'},
		{latLng: [1.3, 103.8], name: 'Singapore'},
		{latLng: [48.856579, 2.350302], name: 'Paris'},
		{latLng: [40.425389, -3.703571], name: 'Madrid'},
		{latLng: [43.652612, -79.381497], name: 'Toronto'},
		{latLng: [52.519995, 13.412085], name: 'Berlin'},
		{latLng: [45.507482, 12.282149], name: 'Venice'},
		{latLng: [35.675493, 139.820245], name: 'Toyko'},
		{latLng: [41.009382, 28.979214], name: 'Istanbul'},
		{latLng: [-33.861823, 151.179091], name: 'Sydney'},
		{latLng: [630.048637, 31.236491], name: 'Cairo'},
		]
	});
});
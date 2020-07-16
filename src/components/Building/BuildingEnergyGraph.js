import React, { useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as d3 from "d3";

import buildingStyles from '../../styles/buildingStyles';
import lineGraphStyles from '../../styles/lineGraphStyles';

const BuildingEnergyGraph = props => {
	const classes = buildingStyles();
	const graphClasses = lineGraphStyles();
	// const building = props.building;
	const barChartContainer = useRef(React.createRef())

	useEffect(() => {
		if (barChartContainer) {
			renderGraph();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [barChartContainer]);

	const renderGraph = () => {
		var margin = { top: 20, right: 30, bottom: 30, left: 40 },
			width = barChartContainer.current.clientWidth - margin.left - margin.right,
			height = barChartContainer.current.clientHeight - margin.top - margin.bottom;

		var y = d3.scaleLinear()
			.rangeRound([height, 0])
			.nice()

		var x = d3.scaleBand()
			.rangeRound([0, width])
			.padding(0.5)
			.align(0.1)

		var z = d3.scaleOrdinal().range(['#D48A38', '#F5D93A', '#497EB3'])

		var parseTime = d3.timeParse("%b %Y")

		d3.csv('https://raw.githubusercontent.com/LyonDataViz/MOS5.5-Dataviz/master/data/stocks.csv').then(function (raw) {
			var symbols = [];
			var data = []

			// eslint-disable-next-line array-callback-return
			raw.map((d, i) => {
				if (symbols.indexOf(d.symbol) < 0) {
					symbols.push(d.symbol)
					data[symbols.indexOf(d.symbol)] = [];
				}

				// String to INT
				d.value = +d.price;

				// Parsing time
				d.date = parseTime(d.date)
				data[symbols.indexOf(d.symbol)].push(d);
			});

			var data_nest = d3.nest()
				.key(function (d) { return d.date.getFullYear(); })
				.key(function (d) { return d.symbol; })
				.rollup(function (v) { return d3.sum(v, function (d) { return d.price; }); })
				.entries(raw);

			var years = data_nest.map(function (d) { return d.key; })

			var data_stack = []

			data_nest.forEach(function (d, i) {
				d.values = d.values.map(function (e) { return e.value; })
				var t = {}
				symbols.forEach(function (e, i) {
					t[e] = d.values[i]
				})
				t.year = d.key;
				data_stack.push(t)
			})

			var layers = d3.stack().keys(symbols)(data_stack);

			var max = d3.max(layers[layers.length - 1], function (d) { return d[1]; });

			y.domain([0, max]);
			x.domain(years);

			var svg = d3.select("#barchart")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			svg.append("g").selectAll("g")
				.data(layers)
				.enter().append("g")
				.style("fill", function (d) { return z(d.key); })
				.selectAll("rect")
				.data(function (d) { return d; })
				.enter().append("rect")
				.attr("x", function (d, i) { return x(d.data.year); })
				.attr("y", function (d) { return y(d[1]); })
				.attr("height", function (d) { return y(d[0]) - y(d[1]); })
				.attr("width", x.bandwidth());//

			let xAxis = d3.axisBottom(x).tickSize(0).tickPadding(20);
			let yAxis = d3.axisLeft().scale(y).tickSize(0)
				// yAxis.append('text')
				// 	.attr('transform', `translate(-16, ${this.margin.top})`)
				// 	.attr('class', classes.axisText)
				// 	.html(this.props.unit)

			svg.append("g")
				.attr("class", graphClasses.axisTick)
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis)
				.call(g => g.select(".domain").remove())

			svg.append("g")
				.attr("class", graphClasses.axisTick)
				.attr("transform", "translate(" + (0) + ", 0)")
				.call(yAxis)
				.call(g => g.select(".domain").remove())
				.append('text')
				.attr('transform', `translate(0, ${margin.top})`)
				.attr('class', graphClasses.axisText)
				.html('Tons')



			})
	}

	return (
		<Card className={classes.card}>
			<CardHeader
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title="Energiforbrug"
				titleTypographyProps={{ variant: 'h4' }}
			/>
			<CardContent>
				<div style={{ width: '100%', height: '100%' }}>
					<svg id="barchart" ref={barChartContainer} style={{ width: '100%', height: '500px' }}></svg>
				</div>
			</CardContent>
		</Card>
	)
}

export default BuildingEnergyGraph;

/* eslint-disable array-callback-return */
import React, { useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as d3 from "d3";

import buildingStyles from '../../styles/buildingStyles';
import barGraphStyles from '../../styles/barGraphStyles';

const BuildingEnergyGraph = props => {
	const classes = buildingStyles();
	const graphClasses = barGraphStyles();
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

		//var z = d3.scaleOrdinal().range(['#D48A38', '#F5D93A', '#497EB3'])
		let keys = ["12a15511-5cc4-414b-9a41-c307c15876d0", "07c4b5fc-53db-4d62-be70-7034414cf7ca", "a0a85c1a-7a33-424d-93d3-c61876331d54"];

		var color = d3.scaleOrdinal().domain(keys).range(['#D48A38', '#F5D93A', '#497EB3']);

		// var parseTime = d3.timeParse("%Y")
		// var parseTimeYear = d3.timeParse("%Y")


		let raw = [
			{ year: 2018, "12a15511-5cc4-414b-9a41-c307c15876d0": 1234, "07c4b5fc-53db-4d62-be70-7034414cf7ca": 500, "a0a85c1a-7a33-424d-93d3-c61876331d54": 800, "sum": 2534 },
			{ year: 2019, "12a15511-5cc4-414b-9a41-c307c15876d0": 1555, "07c4b5fc-53db-4d62-be70-7034414cf7ca": 300, "a0a85c1a-7a33-424d-93d3-c61876331d54": 200, "sum": 2055 },
			{ year: 2020, "12a15511-5cc4-414b-9a41-c307c15876d0": 734, "07c4b5fc-53db-4d62-be70-7034414cf7ca": 600, "a0a85c1a-7a33-424d-93d3-c61876331d54": 700, "sum": 2034 }
		];

		let years = [2018, 2019, 2020];

		var layers = d3.stack().keys(keys)(raw);
		// var layers = d3.stack().keys(symbols)(data_stack);
		// console.log(layers);
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
			.style("fill", function (d) { return color(d.key); })
			.selectAll("rect")
			.data(function (d) { return d; })
			.enter().append("rect")
			.attr("x", function (d, i) { return x(d.data.year); })
			.attr("y", function (d) { return y(d[1]); })
			.attr("height", function (d) { return y(d[0]) - y(d[1]); })
			.attr("width", x.bandwidth());

		let xAxis = d3.axisBottom(x).tickSize(0).tickPadding(20);
		let yAxis = d3.axisLeft().scale(y).tickSize(0);

		svg.append("g")
			.attr("class", graphClasses.axisTick)
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.call(g => g.select(".domain").remove());

		svg.append("g")
			.attr("class", graphClasses.axisTick)
			.attr("transform", "translate(" + (0) + ", 0)")
			.call(yAxis)
			.call(g => g.select(".domain").remove())
			.append('text')
			.attr('transform', `translate(0, ${margin.top - 20})`)
			.attr('class', graphClasses.axisText)
			.html('Tons');


		var line = d3.line()
			.x(function (d) { return x(d.data.year) + x.bandwidth() / 2; })
			.y(function (d) { return y(d.data.sum); });

		svg.append("path")
			.data(layers)
			.attr("class", graphClasses.line)
			.attr("d", line);

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

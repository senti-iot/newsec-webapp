/* eslint-disable array-callback-return */
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardContent, IconButton, Box, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as d3 from "d3";
import { useDispatch, useSelector } from 'react-redux';

import buildingStyles from '../../styles/buildingStyles';
import barGraphStyles from '../../styles/barGraphStyles';
import { getEnergyDataByYear } from 'redux/data';

const BenchmarkEnergyGraph = props => {
	const dispatch = useDispatch();
	const classes = buildingStyles();
	const graphClasses = barGraphStyles();
	const buildings = props.buildings;
	const barChartContainer = useRef(React.createRef());
	const [devices, setDevices] = useState(null);
	// const [years, setYears] = useState(null);

	const energyBarData = useSelector(s => s.data.energyBarData);

	useEffect(() => {
		if (buildings && !devices) {
			let d = [];
			buildings.map(building => {
				if (building.devices && building.devices.length) {
					building.devices.map(device => {
						if (device.type === 'fjernvarme' || device.type === 'vand' || device.type === 'el') {
							d.push(device.uuid);
						}
					});
				}
			});

			setDevices(d);
		}
	}, [buildings, devices]);

	useEffect(() => {
		if (!energyBarData && buildings && devices) {
			dispatch(getEnergyDataByYear(devices));
		}
	}, [dispatch, energyBarData, buildings, devices]);

	useEffect(() => {
		if (barChartContainer && energyBarData && devices) {
			renderGraph();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [barChartContainer, energyBarData, devices]);

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

		let keys = ['Fjernvarme', 'Vand', 'Elektricitet'];

		var color = d3.scaleOrdinal().domain(keys).range(['#214C6F', '#B3CDE3', '#497EB3']);

		//TODO: get from data
		let years = [2018, 2019, 2020];

		var layers = d3.stack().keys(keys)(energyBarData);
		var max = d3.max(layers[layers.length - 1], function (d) { return d[1]; });

		y.domain([0, max + 10]);
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
			.attr('transform', `translate(0, ${margin.top - 25})`)
			.attr('class', graphClasses.axisText)
			.html('Ton');


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
				title="CO2-aftryk"
				titleTypographyProps={{ variant: 'h4' }}
			/>
			<CardContent>
				<div style={{ width: '100%', height: '100%' }}>
					<svg id="barchart" ref={barChartContainer} style={{ width: '100%', height: '330px' }}></svg>
				</div>

				<Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: 30, marginBottom: 30 }}>
					<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" className={graphClasses.legendWrapper}>
						<div className={graphClasses.legend1}></div>
						<div><Typography>CO2 varme</Typography></div>
					</Box>

					<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" className={graphClasses.legendWrapper}>
						<div className={graphClasses.legend2}></div>
						<div><Typography>CO2 el</Typography></div>
					</Box>

					<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" className={graphClasses.legendWrapper}>
						<div className={graphClasses.legend3}></div>
						<div><Typography>CO2 vand</Typography></div>
					</Box>

					<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" className={graphClasses.legendWrapper}>
						<div className={graphClasses.legend4}></div>
						<div><Typography>Total</Typography></div>
					</Box>

					<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" className={graphClasses.legendWrapper}>
						<div className={graphClasses.legend5}></div>
						<div><Typography>Målsætning</Typography></div>
					</Box>
				</Box>
			</CardContent>
		</Card>
	)
}

export default BenchmarkEnergyGraph;

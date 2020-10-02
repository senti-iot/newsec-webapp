/* eslint-disable array-callback-return */
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardContent, Box, Typography } from '@material-ui/core';
import * as d3 from "d3";
import { useDispatch, useSelector } from 'react-redux';

import buildingStyles from '../../styles/buildingStyles';
import barGraphStyles from '../../styles/barGraphStyles';
import { getEnergyDataByGroup } from 'redux/data';
import CircularLoader from 'components/CircularLoader';

const OverviewEnergyGraph = props => {
	const dispatch = useDispatch();
	const classes = buildingStyles();
	const graphClasses = barGraphStyles();
	// const buildings = props.buildings;
	const group = props.group;
	const barChartContainer = useRef(React.createRef());
	// const [devices, setDevices] = useState(null);
	// const [years, setYears] = useState(null);
	const [didRenderGraph, setDidRenderGraph] = useState(false);
	const [loading, setLoading] = useState(true);

	const energyBarData = useSelector(s => s.data.energyBarData);

	// useEffect(() => {
	// 	if (buildings && !devices) {
	// 		let d = [];
	// 		buildings.map(building => {
	// 			if (building.devices && building.devices.length) {
	// 				building.devices.map(device => {
	// 					if (device.type === 'fjernvarme' || device.type === 'vand' || device.type === 'el') {
	// 						d.push(device.uuid);
	// 					}
	// 				});
	// 			}
	// 		});

	// 		setDevices(d);
	// 	}
	// }, [buildings, devices]);

	useEffect(() => {
		setLoading(true);
		dispatch(getEnergyDataByGroup(group));
	}, [dispatch, group]);

	useEffect(() => {
		if (barChartContainer && energyBarData) {
			renderGraph();
			setLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [barChartContainer, energyBarData]);

	const make_y_gridlines = (y) => {
		return d3.axisLeft(y).ticks(5);
	}

	const renderGraph = () => {
		const margin = { top: 20, right: 30, bottom: 40, left: 50 },
			width = barChartContainer.current.clientWidth - margin.left - margin.right,
			height = barChartContainer.current.clientHeight - margin.top - margin.bottom;

		if (didRenderGraph) {
			d3.select("#barchart").selectAll("*").remove();
		}

		const y = d3.scaleLinear()
			.rangeRound([height, 0])
			.nice()

		const x = d3.scaleBand()
			.rangeRound([0, width])
			.padding(0.5)
			.align(0.1)

		const keys = ['Varme', 'Vand', 'Elektricitet', 'Affald', 'Renovering'];

		const color = d3.scaleOrdinal().domain(keys).range(['#214C6F', '#B3CDE3', '#497EB3', '#90999E', '#5D6A70']);

		//TODO: get from data
		let years = [2018, 2019, 2020];

		const layers = d3.stack().keys(keys)(energyBarData);
		const max = d3.max(layers[layers.length - 1], function (d) { return d[1]; });

		y.domain([0, max + 100]);
		x.domain(years);

		const svg = d3.select("#barchart")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		svg.append("g")
			.attr("class", graphClasses.gridline)
			.call(make_y_gridlines(y)
				.tickSize(-width)
				.tickFormat("")
			);

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

		const xAxis = d3.axisBottom(x).tickSize(0).tickPadding(20);
		const yAxis = d3.axisLeft().scale(y).ticks(5).tickSize(0).tickFormat(function (d) {
			return d;
		});

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

		// const line = d3.line()
		// 	.x(function (d) { return x(d.data.year) + x.bandwidth() / 2; })
		// 	.y(function (d) { return y(d.data.sum); });

		// svg.append("path")
		// 	.data(layers)
		// 	.attr("class", graphClasses.line)
		// 	.attr("d", line);

		setDidRenderGraph(true);
	}

	return (
		<Card className={classes.card}>
			<CardHeader
				title="CO₂ udledning"
				titleTypographyProps={{ variant: 'h4' }}
			/>
			<CardContent>
				{loading ? <CircularLoader fill /> : ""}

				<div style={{ width: '100%', height: '100%' }}>
					<svg id="barchart" ref={barChartContainer} style={{ visibility: loading ? 'hidden' : 'visible', width: '100%', height: '325px' }}></svg>
				</div>

				{!loading ?
					<div className={graphClasses.legendTotalWrapper}>
						<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" className={graphClasses.legendWrapper}>
							<div className={graphClasses.legend1}></div>
							<div><Typography variant="body2">Varme</Typography></div>
						</Box>

						<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" className={graphClasses.legendWrapper}>
							<div className={graphClasses.legend2}></div>
							<div><Typography variant="body2">El</Typography></div>
						</Box>

						<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" className={graphClasses.legendWrapper}>
							<div className={graphClasses.legend3}></div>
							<div><Typography variant="body2">Vand</Typography></div>
						</Box>

						<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" className={graphClasses.legendWrapper}>
							<div className={graphClasses.legend7}></div>
							<div><Typography variant="body2">Affald</Typography></div>
						</Box>

						<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" className={graphClasses.legendWrapper}>
							<div className={graphClasses.legend6}></div>
							<div><Typography variant="body2">Renovering</Typography></div>
						</Box>
					</div> : ""}
			</CardContent>
		</Card>
	)
}

export default OverviewEnergyGraph;

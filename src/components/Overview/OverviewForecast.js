import React, { useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import * as d3 from 'd3';

import buildingStyles from '../../styles/buildingStyles';

const OverviewForecast = () => {
	const classes = buildingStyles();
	const chartContainer = useRef(React.createRef())

	useEffect(() => {
		if (chartContainer) {
			renderGraph();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chartContainer]);

	const renderGraph = () => {
		var value = 0.3
		var data = [value, 1 - value]

		// Settings
		var width = chartContainer.current.clientWidth
		var height = chartContainer.current.clientHeight
		var anglesRange = 0.5 * Math.PI
		var radis = Math.min(width, 2 * height) / 2
		var thickness = 30
		// Utility 
		//     var colors = d3.scale.category10();
		var colors = ["#214C6F", "#c8d0d8"]

		var pies = d3.pie()
			.value(d => d)
			.sort(null)
			.startAngle(anglesRange * -1)
			.endAngle(anglesRange)

		var arc = d3.arc()
			.outerRadius(radis)
			.innerRadius(radis - thickness)

		var translation = (x, y) => `translate(${x}, ${y})`

		// Feel free to change or delete any of the code you see in this editor!
		var svg = d3.select("#forecast")
			.attr("width", width)
			.attr("height", height)
			.attr("class", "half-donut")
			.append("g")
			.attr("transform", translation(width / 2, height))


		svg.selectAll("path")
			.data(pies(data))
			.enter()
			.append("path")
			.attr("fill", (d, i) => colors[i])
			.attr("d", arc)



	}

	return (
		<Card className={classes.card} style={{ minHeight: 370 }}>
			<CardHeader
				title="Prognose 2020"
				titleTypographyProps={{ variant: 'h5' }}
			/>
			<CardContent>
				<div style={{ width: '100%', height: '100%', marginBottom: 50 }}>
					<svg id="forecast" ref={chartContainer} style={{ width: '100%' }}></svg>
				</div>
				<Typography style={{ marginTop: 10 }}>Forventning til slutresultat for portefølje (84 ejendomme)</Typography>
			</CardContent>
		</Card>
	)
}

export default OverviewForecast;

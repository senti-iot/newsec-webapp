import React, { useEffect } from 'react';
import { Card, CardHeader, CardContent, IconButton, Typography, Grid, Box } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as d3 from "d3";

import buildingStyles from '../../styles/buildingStyles';

const BuildingForecast = props => {
	const classes = buildingStyles();
	const building = props.building;

	useEffect(() => {
		renderGraph();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	const data = [
		{ value: 50, color: '#8B2979' },
		{ value: 100, color: '#C8D0D8' },
		{ value: 80, color: '#365979' },
	];

	const renderGraph = () => {
		// console.log('renderGraph');
		const width = 230;
		const arcSize = (8 * width / 100);
		const innerRadius = arcSize * 3;

		let svg = d3.select('#forecastgraph').attr('width', width).attr('height', width);

		let arcs = data.map((obj, i) => {
			return d3.arc().innerRadius(i * arcSize + innerRadius).outerRadius((i + 1) * arcSize - (width / 100) + innerRadius);
		});
		let arcsGrey = data.map((obj, i) => {
			return d3.arc().innerRadius(i * arcSize + (innerRadius + ((arcSize / 2) - 2))).outerRadius((i + 1) * arcSize - ((arcSize / 2)) + (innerRadius));
		});

		let pieData = data.map((obj, i) => {
			return [
				{ value: obj.value * 0.75, arc: arcs[i], object: obj },
				{ value: (100 - obj.value) * 0.75, arc: arcsGrey[i], object: obj },
				{ value: 100 * 0.25, arc: arcs[i], object: obj }];
		});

		let pie = d3.pie().sort(null).value((d) => {
			return d.value;
		});

		let g = svg.selectAll('g').data(pieData).enter()
			.append('g')
			.attr('transform', 'translate(' + width / 2 + ',' + width / 2 + ') rotate(180)');

		g.selectAll('path').data((d) => {
			return pie(d);
		}).enter().append('path')
			.attr('d', (d) => {
				return d.data.arc(d);
			}).attr('fill', (d, i) => {
				return i === 0 ? d.data.object.color : i === 1 ? 'none' : 'none';
			});
	}

	return (
		<>
			{building ?
				<Card className={classes.card} style={{ minHeight: 470 }}>
					<CardHeader
						action={
							<IconButton aria-label="settings">
								<MoreVertIcon />
							</IconButton>
						}
						title="CO2 udledning"
						titleTypographyProps={{ variant: 'h4' }}
					/>
					<CardContent>
						<div style={{ width: "50%", height: "250px", margin: "0 auto" }}>
							<svg id='forecastgraph'></svg>
						</div>

						<div style={{ width: "50%", height: "50px", margin: "0 auto" }}>
							<Grid container
								alignItems="center"
								justify="center">
								<Grid item xs={3}>
									<Box display="flex" justifyContent="center" alignItems="center">
										<div className={classes.ledgendCurrent}></div>
									</Box>
									<Box display="flex" justifyContent="center" alignItems="center">
										Aktuel
									</Box>
								</Grid>
								<Grid item xs={3}>
									<Box display="flex" justifyContent="center" alignItems="center">
										<div className={classes.ledgendForecast}></div>
									</Box>
									<Box display="flex" justifyContent="center" alignItems="center">
										Prognose
									</Box>
								</Grid>
								<Grid item xs={3}>
									<Box display="flex" justifyContent="center" alignItems="center">
										<div className={classes.legendGoal}></div>
									</Box>
									<Box display="flex" justifyContent="center" alignItems="center">
										Målsætning
									</Box>
								</Grid>
							</Grid>
						</div>

						<Typography variant="h5">Målsætning</Typography>
						<Typography>Der er i forhold til forrige uge udledt mindre CO2 end målsætningen</Typography>
					</CardContent>
				</Card>
				: ""}
		</>
	)
}

export default BuildingForecast;

/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import { Card, CardHeader, CardContent, IconButton, Typography, Grid, Box } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as d3 from "d3";
import { useSelector } from 'react-redux'

import buildingStyles from '../../styles/buildingStyles';

const BuildingForecast = props => {
	const classes = buildingStyles();
	const building = props.building;

	const deviceData = useSelector(s => s.lineData)

	useEffect(() => {
		if (deviceData && deviceData.graph && !deviceData.loading) {
			let actual = 0;
			deviceData.graph[0].data.map(d => {
				actual += d.value;
			});

			let goal = 0;
			deviceData.graph[1].data.map(d => {
				goal += d.value;
			});

			let forecast = 0;

			const data = [
				{ value: goal * 100, color: '#1F3B54' },
				{ value: forecast, color: '#B3CDE3' },
				{ value: actual * 100, color: '#377EB8' },
			];

			renderGraph(data);
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [deviceData]);

	const renderGraph = (data) => {
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
				<Card className={classes.card} style={{ minHeight: 500 }}>
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
						<div className={classes.forecastgraphwrapper}>
							<svg id='forecastgraph'></svg>
						</div>

						<div className={classes.forecastgraphlegendwrapper}>
							<Grid container
								alignItems="center"
								justify="center">
								<Grid item xs={3}>
									<Box display="flex" justifyContent="center" alignItems="center">
										<div className={classes.ledgendCurrent}></div>
									</Box>
									<Box display="flex" justifyContent="center" alignItems="center">
										<Typography variant="body2">Aktuel</Typography>
									</Box>
								</Grid>
								<Grid item xs={3}>
									<Box display="flex" justifyContent="center" alignItems="center">
										<div className={classes.ledgendForecast}></div>
									</Box>
									<Box display="flex" justifyContent="center" alignItems="center">
										<Typography variant="body2">Prognose</Typography>
									</Box>
								</Grid>
								<Grid item xs={3}>
									<Box display="flex" justifyContent="center" alignItems="center">
										<div className={classes.legendGoal}></div>
									</Box>
									<Box display="flex" justifyContent="center" alignItems="center">
										<Typography variant="body2">Målsætning</Typography>
									</Box>
								</Grid>
							</Grid>
						</div>

						<Typography variant="h4">Målsætning</Typography>
						<Typography variant="body2">***Der er i forhold til forrige periode udledt mindre CO2 end målsætningen</Typography>
					</CardContent>
				</Card>
				: ""}
		</>
	)
}

export default BuildingForecast;

/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Box } from '@material-ui/core';
import * as d3 from "d3";
import moment from 'moment';

import buildingStyles from 'styles/buildingStyles';

const BuildingForecast = props => {
	const classes = buildingStyles();
	const building = props.building;

	useEffect(() => {
		if (building && building.emissionToDate) {
			const data = [
				{ value: building.emissionToDate.goal, color: '#1F3B54' },
				{ value: building.emissionToDate.co2Budget, color: '#B3CDE3' },
				{ value: building.emissionToDate.co2, color: '#377EB8' },
			];

			renderGraph(data);
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderGraph = (data) => {
		const width = 230;
		const arcSize = (8 * width / 100);
		const innerRadius = arcSize * 3;

		let svg = d3.select('#forecastgraph').attr('width', width).attr('height', width);

		let arcs = data.map((obj, i) => {
			return d3.arc().innerRadius(i * arcSize + innerRadius).outerRadius((i + 1) * arcSize - (width / 100) + innerRadius);
		});

		let pieData = data.map((obj, i) => {
			return [
				{ value: obj.value * 0.75, arc: arcs[i], object: obj },
				{ value: (100 - obj.value) * 0.75, arc: arcs[i], object: obj },
				{ value: 100 * 0.25, arc: arcs[i], object: obj }];
		});

		let pie = d3.pie().sort(null).value((d) => {
			return d.value;
		});

		let g = svg.selectAll('g')
			.data(pieData)
			.enter()
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
				<Card className={classes.card}>
					<CardHeader
						title="CO₂ udledning"
						titleTypographyProps={{ variant: 'h4' }}
						subheader={"Årlig sum " + moment().format('YYYY')}
						subheaderTypographyProps={{ variant: 'h5' }}
					/>
					<CardContent>
						<div className={classes.forecastgraphwrapper}>
							<svg id='forecastgraph'></svg>
						</div>

						<div className={classes.forecastgraphlegendwrapper}>
							<Grid container
								alignItems="center"
								justify="center"
								spacing={5}>
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

						{/* <Typography variant="h4">Målsætning</Typography>
						<Typography variant="body2">***Der er i forhold til forrige periode udledt mindre CO₂ end målsætningen</Typography> */}
					</CardContent>
				</Card>
				: ""}
		</>
	)
}

export default BuildingForecast;

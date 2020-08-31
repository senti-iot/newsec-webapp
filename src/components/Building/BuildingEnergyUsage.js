import React, { useEffect } from 'react';
import { Card, CardHeader, CardContent, IconButton, Grid, Typography, Box } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import * as d3 from "d3";

import buildingStyles from 'styles/buildingStyles';

const BuildingEnergyUsage = props => {
	const classes = buildingStyles();
	// const building = props.building;

	useEffect(() => {
		let data = [
			{ value: 50 },
			{ value: 50 },
		];

		renderGraph(data);
	});

	const renderGraph = data => {
		let width = 230;
		let height = 230;
		let thickness = 30;

		let radius = Math.min(width, height) / 2;
		let color = d3.scaleOrdinal(['#377EB8', '#1F3B54']);

		let svg = d3.select("#energyconsumptionchart")
			.attr('class', 'pie')
			.attr('width', width)
			.attr('height', height);

		let g = svg.append('g')
			.attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

		let arc = d3.arc()
			.innerRadius(radius - thickness)
			.outerRadius(radius);

		let pie = d3.pie()
			.value(function (d) { return d.value; })
			.sort(null);

		g.selectAll('path')
			.data(pie(data))
			.enter()
			.append("g")
			.append('path')
			.attr('d', arc)
			.attr('fill', (d, i) => color(i))
			.each(function (d, i) { this._current = i; });
	}

	return (
		<Card className={classes.card} style={{ minHeight: 500 }}>
			<CardHeader
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title="Energiforbrug"
				titleTypographyProps={{ variant: 'h4' }}
				subheader={"Årlig sum " + moment().format('YYYY')}
				subheaderTypographyProps={{ variant: 'h5' }}
			/>
			<CardContent>
				<Grid container>
					<Grid item xs={12} xl={5}>
						<Grid container spacing={4}>
							<Grid item xs={12}>
								<Typography variant="h4" style={{ color: '#848484' }}>El pr. m2</Typography>
								<Typography variant="h3" style={{ color: '#377EB8' }}>XXX kWh</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography variant="h4" style={{ color: '#848484' }}>Varme pr. m2</Typography>
								<Typography variant="h3" style={{ color: '#1F3B54' }}>XXX kWh</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography variant="h4" style={{ color: '#848484' }}>Total energiforbrug</Typography>
								<Typography variant="h3">XXX kWh</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} xl={7}>
						<div className={classes.energyconsumptiongraphwrapper}>
							<svg id='energyconsumptionchart'></svg>
						</div>

						<div className={classes.forecastgraphlegendwrapper}>
							<Grid container
								alignItems="center"
								justify="center"
								spacing={5}>
								<Grid item xs={3}>
									<Box display="flex" justifyContent="center" alignItems="center">
										<div className={classes.legendEl}></div>
									</Box>
									<Box display="flex" justifyContent="center" alignItems="center">
										<Typography variant="body2">El</Typography>
									</Box>
								</Grid>
								<Grid item xs={3}>
									<Box display="flex" justifyContent="center" alignItems="center">
										<div className={classes.legendHeat}></div>
									</Box>
									<Box display="flex" justifyContent="center" alignItems="center">
										<Typography variant="body2">Varme</Typography>
									</Box>
								</Grid>
							</Grid>
						</div>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}

export default BuildingEnergyUsage;

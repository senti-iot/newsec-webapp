import React, { useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, Grid, Typography, Box } from '@material-ui/core';
import moment from 'moment';
import * as d3 from "d3";
import NumberFormat from 'react-number-format';

import buildingStyles from 'styles/buildingStyles';

const BuildingEnergyUsage = props => {
	const classes = buildingStyles();
	const building = props.building;
	const chartContainer = useRef(React.createRef())

	useEffect(() => {
		if (chartContainer && building && building.usage) {
			let data = [
				{ value: building.usage.elP },
				{ value: building.usage.fjernvarmeP },
			];

			renderGraph(data);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderGraph = data => {
		// let width = 230;
		// let height = 230;
		let width = chartContainer.current.clientWidth;
		let height = chartContainer.current.clientHeight;
		// let thickness = 30;
		// let radius = Math.min(width, height) / 2;
		let outerRadius = Math.min(width, height) / 2;
		let innerRadius = (outerRadius / 5) * 4;
		let color = d3.scaleOrdinal(['#377EB8', '#1F3B54']);

		let svg = d3.select("#energyconsumptionchart")
			.attr('class', 'pie')
			.attr('width', '100%')
			// .attr('height', '100%')
			.attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
	        .attr('preserveAspectRatio', 'xMinYMin');

		let g = svg.append('g')
		// .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
			.attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) / 2 + ")");

		// let arc = d3.arc()
		// 	.innerRadius(radius - thickness)
		// 	.outerRadius(radius);

		let arc = d3.arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius);

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
			//.each(function (d, i) { this._current = i; });
	}

	return (
		<>
			{building && building.usage ?
				<Card className={classes.card}>
					<CardHeader
						title="Energiforbrug"
						titleTypographyProps={{ variant: 'h4' }}
						subheader={"Årlig sum " + moment().format('YYYY')}
						subheaderTypographyProps={{ variant: 'h5' }}
					/>
					<CardContent>
						<Grid container>
							<Grid item xs={7} xl={5}>
								<Grid container spacing={4}>
									<Grid item xs={12}>
										<Typography variant="body2" style={{ fontSize: '17px', fontWeight: 'bold', color: '#848484' }}>
											El pr. m2
										</Typography>
										<Typography variant="body2" style={{ fontSize: '19px', fontWeight: 'bold', color: '#377EB8' }}>
											<NumberFormat value={building.usage.el} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} /> kWh
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography variant="body2" style={{ fontSize: '17px', fontWeight: 'bold', color: '#848484' }}>
											Varme pr. m2
										</Typography>
										<Typography variant="body2" style={{ fontSize: '19px', fontWeight: 'bold', color: '#1F3B54' }}>
											<NumberFormat value={building.usage.fjernvarme} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} /> kWh
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography variant="body2" style={{ fontSize: '17px', fontWeight: 'bold', color: '#848484' }}>
											Total energiforbrug
										</Typography>
										<Typography variant="body2" style={{ fontSize: '19px', fontWeight: 'bold', color: '#000000' }}>
											<NumberFormat value={building.usage.total} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} /> kWh
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={5} xl={7}>
								<div className={classes.energyconsumptiongraphwrapper}>
									<svg id='energyconsumptionchart' ref={chartContainer}></svg>

									<div className={classes.forecastgraphlegendwrapper}>
										<Grid container
											alignItems="center"
											justify="center"
											spacing={5}>
											<Grid item xs={6}>
												<Box display="flex" justifyContent="center" alignItems="center">
													<div className={classes.legendEl}></div>
												</Box>
												<Box display="flex" justifyContent="center" alignItems="center">
													<Typography variant="body2">El</Typography>
												</Box>
											</Grid>
											<Grid item xs={6}>
												<Box display="flex" justifyContent="center" alignItems="center">
													<div className={classes.legendHeat}></div>
												</Box>
												<Box display="flex" justifyContent="center" alignItems="center">
													<Typography variant="body2">Varme</Typography>
												</Box>
											</Grid>
										</Grid>
									</div>
								</div>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
				: ""}
		</>
	)
}

export default BuildingEnergyUsage;

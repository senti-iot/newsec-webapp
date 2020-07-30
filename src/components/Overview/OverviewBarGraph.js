import React, { useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, IconButton, Typography, Box, Button } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import * as d3 from 'd3';
import { useHistory } from 'react-router';
import moment from 'moment';

import barGraphStyles from '../../styles/barGraphStyles';
import buildingStyles from '../../styles/buildingStyles';
import { changeDate } from 'redux/dateTime';
import { useDispatch, useSelector } from 'hooks';

const OverviewScore = () => {
	const barChartContainer = useRef(React.createRef())
	const classes = buildingStyles();
	const graphClasses = barGraphStyles();
	const history = useHistory();
	const dispatch = useDispatch();

	const period = useSelector(s => s.dateTime.period);

	useEffect(() => {
		if (barChartContainer) {
			renderGraph();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [barChartContainer]);

	const handleSetDate = (id, to, from, timeType) => dispatch(changeDate(id, to, from, timeType))

	const make_y_gridlines = (y) => {
		return d3.axisLeft(y).ticks(5);
	}

	let data = [
		{ uuid: '04bb8316-e645-4670-a91f-c9648731928f', label: 15946, value: 60 },
		{ uuid: '04bb8316-e645-4670-a91f-c9648731928f', label: 15947, value: 40 },
		{ uuid: '04bb8316-e645-4670-a91f-c9648731928f', label: 15948, value: 30 },
		{ uuid: '04bb8316-e645-4670-a91f-c9648731928f', label: 15949, value: 70 },
		{ uuid: '04bb8316-e645-4670-a91f-c9648731928f', label: 15950, value: 20 },
	];

	const renderGraph = () => {
		let margin = { top: 20, right: 20, bottom: 70, left: 40 };
		let width = barChartContainer.current.clientWidth - margin.left - margin.right;
		let height = barChartContainer.current.clientHeight - margin.top - margin.bottom;

		var x = d3.scaleBand().rangeRound([0, data.length * 30]).padding(.5);
		var y = d3.scaleLinear().range([height, 0]);

		let xAxis = d3.axisBottom(x).tickSize(0).tickPadding(10);
		let yAxis = d3.axisLeft(y).tickSize(0);

		var svg = d3.select("#overviewGraph")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		x.domain(data.map(function (d) { return d.label; }));
		y.domain([0, d3.max(data, function (d) { return d.value; })]);

		svg.append("g")
			.attr("class", graphClasses.axisTick)
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.selectAll("text")
			.style("text-anchor", "end")
			.attr("dx", "-.8em")
			.attr("dy", "-.55em")
			.attr("transform", "rotate(-90)");

		svg.append("g")
			.attr("class", graphClasses.axisTick)
			.call(yAxis)
			// .append("text")
			// .attr("transform", "rotate(-90)")
			// .attr("y", 6)
			// .attr("dy", ".71em")
			// .style("text-anchor", "end")
			// .text("Value ($)");

		svg.append("g")
			.attr("class", graphClasses.gridline)
			.call(make_y_gridlines(y)
				.tickSize(-width)
				.tickFormat("")
			);
	
		svg.selectAll("bar")
			.data(data)
			.enter().append("rect")
			.style("fill", "#497EB3")
			.style("cursor", "pointer")
			.attr("x", function (d) { return x(d.label); })
			.attr("width", x.bandwidth())
			.attr("y", function (d) { return y(d.value); })
			.attr("height", function (d) { return height - y(d.value); })
			.on("mouseover", function () {
				d3.select(this).style("fill", "#D48A38");
			})
			.on("mouseout", function (d, i) {
				d3.select(this).transition().duration(300).style("fill", "#497EB3");
			})
			.on("click", function (d, i) {
				history.push('/building/' + d.uuid);
			});
	}

	const generatePeriodDesc = () => {
		return (
			<>
				{moment(period.from).format('ll')}
				&nbsp;&nbsp;&nbsp;
				{` — `}
				&nbsp;&nbsp;&nbsp;
				{ moment(period.to).format('ll')}
			</>
		)
	}

	const handlePrevPeriod = () => {
		let from, to;
		if (period.menuId === 2) {
			from = moment(period.from).subtract(6, 'day').startOf('day');
			to = moment(period.from);
		} else if (period.menuId === 4) {
			from = moment(period.from).subtract(365, 'day').startOf('day');
			to = moment(period.from);
		} else if (period.menuId === 7) {
			from = moment(period.from).subtract(30, 'day').startOf('day');
			to = moment(period.from);
		}

		handleSetDate(period.timeType, to, from, period.timeType);
	}

	const handleNextPeriod = () => {
		let from, to;
		if (period.menuId === 2) {
			from = moment(period.to);
			to = futureTester(to, 'day') ? moment(period.to).add(6, 'day') : moment().subtract(1, 'day');
		} else if (period.menuId === 4) {
			from = moment(period.from).add(365, 'month').startOf('month');
			to = !futureTester(to, 'day') ? moment(from).endOf('month') : moment().subtract(365, 'day');
		} else if (period.menuId === 7) {
			from = moment(period.from).add(30, 'month').startOf('month');
			to = !futureTester(to, 'day') ? moment(from).endOf('month') : moment().subtract(30, 'day');
		}

		handleSetDate(period.timeType, to, from, period.timeType);
	}

	const handlePeriodTypeChange = (type) => {
		let from, to;
		if (type === 2) {
			from = moment().subtract(7, 'day').startOf('day');
			to = moment().subtract(1, 'day').startOf('day');
		} else if (type === 4) {
			from = moment().subtract(365, 'day').startOf('day');
			to = moment().subtract(1, 'day').startOf('day');
		} else if (type === 7) {
			from = moment().subtract(30, 'day').startOf('day');
			to = moment().subtract(1, 'day').startOf('day');
		}

		handleSetDate(type, to, from, type);
	}

	const futureTester = (date, unit) => {
		return moment().subtract(1, 'day').diff(date, unit) <= 0;
	}

	return (
		<Card className={classes.card}>
			<CardHeader
				action={
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				}
				title="Benchmark"
				titleTypographyProps={{ variant: 'h5' }}
			/>
			<CardContent>
				<Box display="flex" justifyContent="center" alignItems="center" className={classes.graphDatePickers}>
					<IconButton onClick={handlePrevPeriod}><ArrowBackIosIcon /></IconButton> <Typography>{generatePeriodDesc()}</Typography><IconButton disabled={futureTester(period.to, 'day')} onClick={handleNextPeriod}><ArrowForwardIosIcon /></IconButton>
					<Button className={(period.timeType === 2 ? classes.periodButtonActive : classes.periodButton)} onClick={() => handlePeriodTypeChange(2)}>7 dage</Button>
					<Button className={(period.timeType === 7 ? classes.periodButtonActive : classes.periodButton)} onClick={() => handlePeriodTypeChange(7)}>30 dage</Button>
					<Button className={(period.timeType === 4 ? classes.periodButtonActive : classes.periodButton)} onClick={() => handlePeriodTypeChange(4)}>År</Button>
					{/* <Button className={(period.timeType === 6 ? classes.periodButtonActive : classes.periodButton)}><CalendarTodayIcon /></Button> */}
				</Box>

				<div style={{ width: '100%', height: '100%' }}>
					<svg id="overviewGraph" ref={barChartContainer} style={{ width: '100%', height: '350px' }}></svg>
				</div>
				<Typography>Vælg en ejendom for at se detajler.</Typography>
			</CardContent>
		</Card>
	)
}

export default OverviewScore;

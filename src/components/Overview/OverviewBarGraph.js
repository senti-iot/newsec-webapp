import React, { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardContent, IconButton, Typography, Box, Popover } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import * as d3 from 'd3';
import moment from 'moment';

import BuildingDetailsPopup from 'components/Overview/BuildingDetailsPopup';
import YearPicker from 'components/ui/YearPicker';
import barGraphStyles from '../../styles/barGraphStyles';
import buildingStyles from '../../styles/buildingStyles';
import { changeBenchmarkDate } from 'redux/dateTime';
import { getBuildingsEmission } from 'redux/buildings';
import { useDispatch, useSelector } from 'hooks';
import { ReactComponent as ArrowPrev } from "assets/icons/arrow_prev_blue.svg";
import { ReactComponent as ArrowPrevDisabled } from "assets/icons/arrow_prev_grey.svg";
import { ReactComponent as ArrowNext } from "assets/icons/arrow_next_blue.svg";
import { ReactComponent as ArrowNextDisabled } from "assets/icons/arrow_next_grey.svg";

const OverviewBarGraph = props => {
	const barChartContainer = useRef(React.createRef());
	const classes = buildingStyles();
	const graphClasses = barGraphStyles();
	const dispatch = useDispatch();
	const buildings = props.buildings;
	const [didRenderGraph, setDidRenderGraph] = useState(false);
	const [selectedDate, setSelectedDate] = useState(moment());
	const [datePickerOpen, setDatepickerOpen] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [selectedBuilding, setSelectedBuilding] = React.useState(null);

	const emissionData = useSelector(s => s.buildingsReducer.emissionData);
	const benchkmarkPeriod = useSelector(s => s.dateTime.benchmarkPeriod);

	useEffect(() => {
		if (barChartContainer && buildings && emissionData) {
			renderGraph();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [barChartContainer, buildings, emissionData]);

	useEffect(() => {
		dispatch(getBuildingsEmission(benchkmarkPeriod));
		setSelectedDate(moment(benchkmarkPeriod.to));
	}, [dispatch, benchkmarkPeriod]);

	const renderGraph = () => {
		let margin = { top: 20, right: 20, bottom: 70, left: 40 };
		let width = barChartContainer.current.clientWidth - margin.left - margin.right;
		let height = barChartContainer.current.clientHeight - margin.top - margin.bottom;

		if (didRenderGraph) {
			d3.select("#overviewGraph").selectAll("*").remove();
		}

		let svgg = d3.select("#overviewGraph")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		let x = d3.scaleBand().rangeRound([0, emissionData.length * 30]).padding(.5);
		let y = d3.scaleLinear().range([height, 0]);

		let max = d3.max(emissionData, function (d) { return parseFloat(d.value); }) + 9;

		// let tickValues = [0];
		// for (let i = 0; i < max; i++) {
		// 	i += Math.round(max / 5);
		// 	if (i < max) {
		// 		tickValues.push(i);
		// 	}
		// }

		// tickValues.push(max);

		let xAxis = d3.axisBottom(x).tickSize(0).tickPadding(10);
		let yAxis = d3.axisLeft(y).tickSize(0).ticks(5);

		x.domain(emissionData.map(function (d) { return d.buildingNo; }));
		y.domain([0, max]);

		svgg.append("g")
			.attr("class", graphClasses.axisTick)
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.selectAll("text")
			.style("text-anchor", "end")
			.attr("dx", "-.8em")
			.attr("dy", "-.55em")
			.attr("transform", "rotate(-90)");

		svgg.append("g")
			.attr("class", graphClasses.axisTick)
			.call(yAxis)
			// .append("text")
			// .attr("transform", "rotate(-90)")
			// .attr("y", 6)
			// .attr("dy", ".71em")
			// .style("text-anchor", "end")
			// .text("Value ($)");
			.append('text')
			.attr('transform', `translate(40, ${margin.top - 28})`)
			.attr('class', graphClasses.axisText)
			.html('kg pr. m2 TEST2');

		svgg.append("g")
			.attr("class", graphClasses.gridline)
			.call(make_y_gridlines(y)
				.tickSize(-width)
				.tickFormat("")
			);

		svgg.selectAll("bar")
			.data(emissionData)
			.enter().append("rect")
			.style("fill", "#377EB8")
			.style("cursor", "pointer")
			.attr("x", function (d) { return x(d.buildingNo); })
			.attr("width", x.bandwidth())
			.attr("y", function (d) { return y(d.value); })
			.attr("height", function (d) { return height - y(d.value); })
			.on("mouseover", function () {
				d3.select(this).style("fill", "#1F3B54");
			})
			.on("mouseout", function (d, i) {
				d3.select(this).transition().duration(300).style("fill", "#377EB8");
			})
			.on("click", function (d, i) {
				//history.push('/building/' + d.buildingUuid);
				console.log(d3.event.currentTarget);
				console.log(d);
				setSelectedBuilding(d);
				setAnchorEl(anchorEl ? null : d3.event.currentTarget);
			});

		setDidRenderGraph(true);
	}

	const make_y_gridlines = (y) => {
		return d3.axisLeft(y).ticks(5);
	}

	const generatePeriodDesc = () => {
		return (
			<>
				{moment(benchkmarkPeriod.from).format('YYYY')}
			</>
		)
	}

	const handleSetDate = (to, from) => {
		setSelectedDate(to);
		dispatch(changeBenchmarkDate(to, from));
	}

	const handlePrevPeriod = () => {
		let from, to;
		from = moment(benchkmarkPeriod.from).subtract(1, 'year').startOf('year');
		to = moment(from).endOf('year');

		setSelectedDate(to);
		handleSetDate(to, from);
	}

	const handleNextPeriod = () => {
		let from, to;
		from = moment(benchkmarkPeriod.from).add(1, 'year').startOf('year');
		to = moment(from).endOf('year');

		setSelectedDate(to);
		handleSetDate(to, from);
	}

	const futureTesterNext = (date) => {
		return moment().year() === moment(date).year() ? true : false;
	}

	const futureTesterPrev = (date) => {
		return moment(date).year() === 2018 ? true : false;
	}

	const handleDateChange = (date) => {
		let to = moment(date).endOf('year').endOf('day');
		let from = moment(date).startOf('year').startOf('day');

		handleSetDate(to, from);

		setDatepickerOpen(false);
	}

	const handleOpenDatepicker = () => {
		setDatepickerOpen(true);
	}

	const handleDatepickerClose = () => {
		setDatepickerOpen(false);
	}

	const handlePopoverClose = () => {
		setAnchorEl(null);
	}

	return (
		<>
			<Card className={classes.card}>
				<CardHeader
					action={
						<IconButton>
							<MoreVertIcon />
						</IconButton>
					}
					title="Benchmark"
					titleTypographyProps={{ variant: 'h4' }}
				/>
				<CardContent>
					<Box display="flex" justifyContent="center" alignItems="center" className={classes.graphDatePickers}>
						<IconButton onClick={handlePrevPeriod} disabled={futureTesterPrev(benchkmarkPeriod.to)}>
							{futureTesterPrev(benchkmarkPeriod.to) ? <ArrowPrevDisabled /> : <ArrowPrev />}
						</IconButton> 
						<Typography variant="body2">{generatePeriodDesc()}</Typography>
						<IconButton disabled={futureTesterNext(benchkmarkPeriod.to)} onClick={handleNextPeriod}>
							{futureTesterNext(benchkmarkPeriod.to) ? <ArrowNextDisabled /> : <ArrowNext />}
						</IconButton>
						<IconButton onClick={handleOpenDatepicker}><CalendarTodayIcon style={{ color: '#377EB8' }} /></IconButton>
					</Box>

					<div style={{ width: '100%', height: '100%' }}>
						<svg id="overviewGraph" ref={barChartContainer} style={{ width: '100%', height: '350px' }}></svg>
					</div>
					<Typography variant="body2">Vælg en ejendom for at se detajler.</Typography>
				</CardContent>
			</Card>

			<YearPicker datePickerOpen={datePickerOpen} selectedDate={selectedDate} handleDateChange={handleDateChange} handleDatepickerClose={handleDatepickerClose} />

			<Popover
				id="popover-building"
				open={Boolean(anchorEl)}
				onClose={handlePopoverClose}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<BuildingDetailsPopup building={selectedBuilding} />
			</Popover>
		</>
	)
}

export default OverviewBarGraph;

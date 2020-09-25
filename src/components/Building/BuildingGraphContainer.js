import React, { useEffect } from 'react';
import { Card, CardHeader, IconButton, Box, Typography, Button, Grid } from '@material-ui/core';
import moment from 'moment';
import NumberFormat from 'react-number-format';

import buildingStyles from 'styles/buildingStyles';
import BuildingLineGraph from './BuildingLineGraph';
// import CircularLoader from '../CircularLoader'
import { getDeviceData } from 'redux/lineData'
import { changeDate } from 'redux/dateTime';
import { useDispatch, useSelector } from 'hooks'
import { ReactComponent as GraphCurrentIcon } from "assets/graph/current.svg";
import { ReactComponent as GraphGoalIcon } from "assets/graph/goal.svg";
import { ReactComponent as GraphLastIcon } from "assets/graph/last.svg";
import { ReactComponent as GraphBenchmarkIcon } from "assets/graph/benchmark.svg";
import { ReactComponent as ArrowPrev } from "assets/icons/arrow_prev_blue.svg";
import { ReactComponent as ArrowPrevDisabled } from "assets/icons/arrow_prev_grey.svg";
import { ReactComponent as ArrowNext } from "assets/icons/arrow_next_blue.svg";
import { ReactComponent as ArrowNextDisabled } from "assets/icons/arrow_next_grey.svg";
import { ReactComponent as ArrowDown } from "assets/icons/green_arrow_down.svg";
import { ReactComponent as ArrowUp } from "assets/icons/red_arrow_up.svg";

const BuildingGraphContainer = props => {
	//Hooks
	const dispatch = useDispatch();
	const classes = buildingStyles();

	//Redux
	const period = useSelector(s => s.dateTime.period);
	const graphLines = useSelector(s => s.appState.lines);
	const emissionStats = useSelector(s => s.lineData.emissionStats);

	const handleSetDate = (id, to, from, timeType) => dispatch(changeDate(id, to, from, timeType))

	//State

	//Const
	const building = props.building;

	//useCallbacks

	//useEffects

	//Handlers

	// const use
	useEffect(() => {
		// if (prevId !== deviceId) {
		if (building && building.devices) {
			let deviceUuid = null;
			building.devices.map(device => {
				if (device.type === 'emission') {
					deviceUuid = device.uuid;
				}
				return null;
			});

			if (deviceUuid) {
				dispatch(getDeviceData(building.uuid, deviceUuid, period, 'co2'));
			}
		}
		// }
		/**
		 * MOVED FROM BuildingLineGraph.js
		 * With no function to check if the data is here this UseEffect might loop forever and ever because:
		 * 1. Will get the data normally which redux and useSelector will trigger a rerender to LineGraph.js because the data changed
		 * 2. Rerendering means the component will run the useEffect AGAIN resulting in starting from step 1
		 */
	}, [dispatch, period, building]);

	const handlePeriodTypeChange = (type) => {
		let from, to;
		if (type === 2) {
			from = moment().subtract(7, 'day').startOf('day');
			to = moment().subtract(1, 'day').endOf('day');
		} else if (type === 4) {
			from = moment().startOf('year').startOf('day');
			to = moment().endOf('year').endOf('day');
		} else if (type === 7) {
			from = moment().subtract(30, 'day').startOf('day');
			to = moment().subtract(1, 'day').endOf('day');
		}
 
		handleSetDate(type, to, from, type);
	}

	const futureTester = (date, unit) => {
		return moment().subtract(1, 'day').diff(date, unit) <= 0;
	}

	const futureTesterPrev = (date) => {
		return moment(date).year() <= 2018 ? true : false;
	}

	const handlePrevPeriod = () => {
		let from, to;
		if (period.menuId === 2) { // day
			from = moment(period.from).subtract(6, 'day').startOf('day');
			to = moment(period.from).endOf('day');
		} else if (period.menuId === 4) { //year
			from = moment(period.from).subtract(1, 'year').startOf('year').startOf('day');
			to = moment(from).endOf('year').endOf('day');
		} else if (period.menuId === 7) { //month
			from = moment(period.from).subtract(1, 'month').startOf('day');
			to = moment(period.from).endOf('day');
		}

		handleSetDate(period.timeType, to, from, period.timeType);
	}

	const handleNextPeriod = () => {
		let from, to;
		if (period.menuId === 2) { //day
			from = moment(period.to);
			to = futureTester(to, 'day') ? moment(period.to).add(6, 'day') : moment().subtract(1, 'day');
		} else if (period.menuId === 4) { //year
			from = moment(period.to).add(1, 'year').startOf('year').startOf('day');
			to = moment(from).endOf('year').endOf('day');
			if (moment(to).isAfter(moment())) {
				to = moment().subtract(1, 'day').endOf('day');
			}
		} else if (period.menuId === 7) { //month
			from = moment(period.to).startOf('day');
			to = moment(from).add(1, 'month').endOf('day');
			if (moment(to).isAfter(moment())) {
				to = moment().subtract(1, 'day').endOf('day');
			}
		}

		handleSetDate(period.timeType, to, from, period.timeType);
	}

	const generatePeriodDesc = () => {
		return (
			<>
				{ moment(period.from).format('ll') }
				&nbsp;&nbsp;&nbsp;
				{` — `}
				&nbsp;&nbsp;&nbsp;
				{ moment(period.to).format('ll') }
			</>
		)
	}

	return (
		<Card className={classes.card}>
			<CardHeader
				title="CO₂ udledning"
				titleTypographyProps={{ variant: 'h4' }}
			/>

			<Box display="flex" justifyContent="center" alignItems="center" className={classes.graphDatePickers}>
				<Box display="flex" justifyContent="center" alignItems="center" style={{ marginRight: 80 }}>
					<IconButton onClick={handlePrevPeriod}>
						{futureTesterPrev(period.to) ? <ArrowPrevDisabled /> : <ArrowPrev />}
					</IconButton> 
					<Typography variant="body2">{generatePeriodDesc()}</Typography>
					<IconButton disabled={futureTester(period.to, 'day')} onClick={handleNextPeriod}>
						{futureTester(period.to, 'day') ? <ArrowNextDisabled /> : <ArrowNext />}
					</IconButton>
				</Box>
				<Box display="flex" justifyContent="center" alignItems="center">
					<Button className={(period.timeType === 2 ? classes.periodButtonActive : classes.periodButton)} onClick={() => handlePeriodTypeChange(2)}>7 dage</Button>
					<Button className={(period.timeType === 7 ? classes.periodButtonActive : classes.periodButton)} onClick={() => handlePeriodTypeChange(7)}>30 dage</Button>
					<Button className={(period.timeType === 4 ? classes.periodButtonActive : classes.periodButton)} onClick={() => handlePeriodTypeChange(4)}>År</Button>
					{/* <Button className={(period.timeType === 6 ? classes.periodButtonActive : classes.periodButton)}><CalendarTodayIcon /></Button> */}
				</Box>
			</Box>
			<Box display="flex" justifyContent="center" alignItems="center" className={classes.graphRibbon}>
				{emissionStats &&
					<Grid container alignItems="center" className={classes.graphRibbonGrid}>
						<Grid item xs={3} style={{ textAlign: 'center' }}>
							<Typography style={{ fontFamily: 'interstateBold', fontSize: '1.1rem', color: '#fff' }}>
								Gnsntl. daglig udledning <NumberFormat value={emissionStats.averageSum} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={1} /> g
							</Typography>
						</Grid>
						<Grid item xs={3} style={{ textAlign: 'center' }}>
							<Typography style={{ fontFamily: 'interstateBold', fontSize: '1.1rem', color: '#fff' }}>
							Udvikling <span style={{ fontFamily: 'interstateBold', fontSize: '1.1rem', color: (emissionStats.reduction > 0 ? '#C60018' : '#B3DC10') }}><NumberFormat value={emissionStats.reduction} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={1} />%</span> {emissionStats.reduction > 0 ? <ArrowUp style={{ width: 14, paddingTop: 2 }} /> : <ArrowDown style={{ width: 14, paddingTop: 2 }} />}
							</Typography>
						</Grid>
						<Grid item xs={3} style={{ textAlign: 'center' }}>
							<Typography style={{ fontFamily: 'interstateBold', fontSize: '1.1rem', color: '#fff' }}>
								Akkumuleret sum <NumberFormat value={emissionStats.actualSum} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={1} /> {emissionStats.unit}
							</Typography>
						</Grid>
						<Grid item xs={3} style={{ textAlign: 'center' }}>
							<Typography style={{ fontFamily: 'interstateBold', fontSize: '1.1rem', color: '#fff' }}>
								Forrige periode <NumberFormat value={emissionStats.previousSum} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={1} /> {emissionStats.unit}
							</Typography>
						</Grid>
					</Grid>
				}
			</Box>

			 <BuildingLineGraph id="graph" building={building} />
			{/**
			 * d3Line.js -> GenerateLegend function generates the onClick callback based on the button ID
			 * Because in Senti Waterworks the legend is a checkbox + text combo the id is LegendCheckbox + line.name
			 * So our first line in lineData.js reducer is "Actual" the id for it will be LegendCheckboxActual
			*/}
			<Box display="flex" justifyContent="center" alignItems="center" style={{ marginBottom: 30 }}>
				<Button
					id={'LegendCheckboxActual'}
					classes={{ root: classes.graphIconButton, label: classes.graphIconButtonLabel }}
					style={{ marginRight: 20, border: 'solid 1px ' + (!graphLines['LActual'] ? '#497EB3' : 'transparent') }}
				>
					<GraphCurrentIcon className={classes.graphIconButtonIcon} />
					<Typography className={classes.graphIconButtonLabelText} variant="body2">Aktuel</Typography>
				</Button>
				<Button
					id={'LegendCheckboxGoal'}
					classes={{ root: classes.graphIconButton, label: classes.graphIconButtonLabel }}
					style={{ marginRight: 20, border: 'solid 1px ' + (!graphLines['LGoal'] ? '#1F3B54' : 'transparent') }}
				>
					<GraphGoalIcon className={classes.graphIconButtonIcon} />
					<Typography className={classes.graphIconButtonLabelText} variant="body2">Målsætning</Typography>
				</Button>
				<Button
					id={'LegendCheckboxPreviousPeriod'}
					classes={{ root: classes.graphIconButton, label: classes.graphIconButtonLabel }}
					style={{ marginRight: 20, border: 'solid 1px ' + (!graphLines['LPreviousPeriod'] ? '#B3CDE3' : 'transparent') }}
				>
					<GraphLastIcon className={classes.graphIconButtonIcon} />
					<Typography className={classes.graphIconButtonLabelText} variant="body2">Forrige periode</Typography>
				</Button>
				<Button
					id={'LegendCheckboxBenchmark'}
					classes={{ root: classes.graphIconButton, label: classes.graphIconButtonLabel }}
					style={{ border: 'solid 1px ' + (!graphLines['LBenchmark'] ? '#F97F0A' : 'transparent') }}
				>
					<GraphBenchmarkIcon className={classes.graphIconButtonIcon} />
					<Typography className={classes.graphIconButtonLabelText} variant="body2">Benchmark</Typography>
				</Button>
			 </Box>
		</Card>
	)
}
let MemoBGraphContainer = React.memo(BuildingGraphContainer)
export default MemoBGraphContainer;

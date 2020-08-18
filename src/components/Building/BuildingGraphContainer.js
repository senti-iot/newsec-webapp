import React, { useEffect } from 'react';
import { Card, CardHeader, IconButton, Box, Typography, Button } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import moment from 'moment';

import buildingStyles from '../../styles/buildingStyles';
import BuildingLineGraph from './BuildingLineGraph';
// import CircularLoader from '../CircularLoader'
import { getDeviceData } from '../../redux/lineData'
import { changeDate } from 'redux/dateTime';
import { useDispatch, useSelector } from 'hooks'
import { ReactComponent as GraphCurrentIcon } from "assets/graph/current.svg";
import { ReactComponent as GraphGoalIcon } from "assets/graph/goal.svg";
import { ReactComponent as GraphLastIcon } from "assets/graph/last.svg";
import { ReactComponent as GraphBenchmarkIcon } from "assets/graph/benchmark.svg";

const BuildingGraphContainer = props => {
	//Hooks
	const dispatch = useDispatch()
	const classes = buildingStyles();

	//Redux
	const period = useSelector(s => s.dateTime.period)
	const graphLines = useSelector(s => s.appState.lines)

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
			let deviceId = null;
			building.devices.map(device => {
				if (device.type === 'emission') {
					deviceId = device.deviceId;
				}
				return null;
			});

			if (deviceId) {
				dispatch(getDeviceData(deviceId, building, period, 'co2'));
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
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title="CO2 udledning"
				titleTypographyProps={{ variant: 'h4' }}
			/>

			<Box display="flex" justifyContent="center" alignItems="center" className={classes.graphDatePickers}>
				<IconButton onClick={handlePrevPeriod}>
					<ArrowBackIosIcon style={{ color: '#377EB8' }} />
				</IconButton> 
				<Typography variant="body2">{generatePeriodDesc()}</Typography>
				<IconButton disabled={futureTester(period.to, 'day')} onClick={handleNextPeriod}>
					<ArrowForwardIosIcon style={{ color: '#377EB8' }} />
				</IconButton>
				<Button className={(period.timeType === 2 ? classes.periodButtonActive : classes.periodButton)} onClick={() => handlePeriodTypeChange(2)}>7 dage</Button>
				<Button className={(period.timeType === 7 ? classes.periodButtonActive : classes.periodButton)} onClick={() => handlePeriodTypeChange(7)}>30 dage</Button>
				<Button className={(period.timeType === 4 ? classes.periodButtonActive : classes.periodButton)} onClick={() => handlePeriodTypeChange(4)}>År</Button>
				{/* <Button className={(period.timeType === 6 ? classes.periodButtonActive : classes.periodButton)}><CalendarTodayIcon /></Button> */}
			</Box>
			<Box display="flex" justifyContent="center" alignItems="center" className={classes.graphRibbon}>
				<Box>
					<Typography variant="body2" style={{ color: '#fff' }}>Daglig udledning: X tons</Typography>
				</Box>
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
					style={{ border: 'solid 1px ' + (!graphLines['LBenchmark'] ? '#377EB8' : 'transparent') }}
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

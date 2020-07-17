import React, { useEffect } from 'react';
import { Card, CardHeader, IconButton, Box, Typography, Button } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import moment from 'moment';

import buildingStyles from '../../styles/buildingStyles';
import BuildingLineGraph from './BuildingLineGraph';
// import CircularLoader from '../CircularLoader'
import { getDeviceData } from '../../redux/lineData'
import { useDispatch, useSelector } from 'hooks'
import { ReactComponent as GraphCurrentIcon } from "assets/graph/current.svg";
import { ReactComponent as GraphGoalIcon } from "assets/graph/goal.svg";
import { ReactComponent as GraphLastIcon } from "assets/graph/last.svg";
import { ReactComponent as GraphBenchmarkIcon } from "assets/graph/benchmark.svg";

let deviceId = 2641

const BuildingGraphContainer = () => {
	//Hooks
	const dispatch = useDispatch()
	const classes = buildingStyles();

	//Redux
	const period = useSelector(s => s.dateTime.period)
	const graphLines = useSelector(s => s.appState.lines)
	//State

	//Const

	//useCallbacks

	//useEffects

	//Handlers



	// const use
	useEffect(() => {
		// if (prevId !== deviceId) {
		dispatch(getDeviceData(deviceId, period, 'co2'))
		// }
		/**
		 * MOVED FROM BuildingLineGraph.js
		 * With no function to check if the data is here this UseEffect might loop forever and ever because:
		 * 1. Will get the data normally which redux and useSelector will trigger a rerender to LineGraph.js because the data changed
		 * 2. Rerendering means the component will run the useEffect AGAIN resulting in starting from step 1
		 */
	}, [dispatch, period]);

	const handleWeekPrev = () => {
	}

	const handleWeekNext = () => {
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
				<IconButton onClick={handleWeekPrev}><ArrowBackIosIcon /></IconButton> <Typography>Uge {moment().week()}</Typography><IconButton onClick={handleWeekNext}><ArrowForwardIosIcon /></IconButton>
				<Button className={classes.periodButtonActive}>Uge</Button>
				<Button className={classes.periodButton}>Måned</Button>
				<Button className={classes.periodButton}>År</Button>
				<Button className={classes.periodButton}><CalendarTodayIcon /></Button>
			</Box>
			<Box display="flex" justifyContent="center" alignItems="center" className={classes.graphRibbon}>
				<Box>
					<Typography>Daglig udledning: X tons</Typography>
				</Box>
			</Box>

			 <BuildingLineGraph id="graph" />
			{/**
			 * d3Line.js -> GenerateLegend function generates the onClick callback based on the button ID
			 * Because in Senti Waterworks the legend is a checkbox + text combo the id is LegendCheckbox + line.name
			 * So our first line in lineData.js reducer is "Actual" the id for it will be LegendCheckboxActual
			*/}
			<Box display="flex" justifyContent="center" alignItems="center" style={{ marginBottom: 30 }}>
				<Button
					id={'LegendCheckboxActual'}
					classes={{ root: classes.graphIconButton, label: classes.graphIconButtonLabel }}
					style={{ marginRight: 20, backgroundColor: !graphLines['LActual'] ? '#365979' : 'transparent' }}
				>
					<GraphCurrentIcon className={classes.graphIconButtonIcon} />
					<Typography className={classes.graphIconButtonLabelText} style={{ color: !graphLines['LActual'] ? 'white' : 'black' }}>Aktuel</Typography>
				</Button>
				<Button
					id={'LegendCheckboxGoal'}
					classes={{ root: classes.graphIconButton, label: classes.graphIconButtonLabel }}
					style={{ marginRight: 20, backgroundColor: !graphLines['LGoal'] ? 'purple' : 'transparent' }}
				>
					<GraphGoalIcon className={classes.graphIconButtonIcon} />
					<Typography className={classes.graphIconButtonLabelText} style={{ color: !graphLines['LGoal'] ? 'white' : 'black' }}>Målsætning</Typography>
				</Button>
				<Button
					id={'LegendCheckboxPreviousPeriod'}
					classes={{ root: classes.graphIconButton, label: classes.graphIconButtonLabel }}
					style={{ marginRight: 20, backgroundColor: !graphLines['LPreviousPeriod'] ? '#005500' : 'transparent' }}
				>
					<GraphLastIcon className={classes.graphIconButtonIcon} />
					<Typography className={classes.graphIconButtonLabelText} style={{ color: !graphLines['LPreviousPeriod'] ? 'white' : 'black' }}>Sidste uge</Typography>
				</Button>
				<Button
					id={'LegendCheckboxBenchmark'}
					classes={{ root: classes.graphIconButton, label: classes.graphIconButtonLabel }}
					style={{ backgroundColor: !graphLines['LBenchmark'] ? 'red' : 'transparent' }}
				>
					<GraphBenchmarkIcon className={classes.graphIconButtonIcon} />
					<Typography className={classes.graphIconButtonLabelText} style={{ color: !graphLines['LBenchmark'] ? 'white' : 'black' }}>Benchmark</Typography>
				</Button>
			 </Box>
		</Card>
	)
}
let MemoBGraphContainer = React.memo(BuildingGraphContainer)
export default MemoBGraphContainer;

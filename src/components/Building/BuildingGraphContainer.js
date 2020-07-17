import React, { useEffect } from 'react';
import { Card, CardHeader, IconButton, Box, Typography, Button, Icon } from '@material-ui/core';
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
	const dispatch = useDispatch()
	const classes = buildingStyles();
	const period = useSelector(s => s.dateTime.period)

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

	const toggleCurrentLine = () => {
	}

	const togglGoalLine = () => {
	}

	const togglLastLine = () => {
	}

	const togglBenchmarkLine = () => {
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

			<Box display="flex" justifyContent="center" alignItems="center" style={{ marginBottom: 30 }}>
				<Button
					classes={{ root: classes.graphIconButton, label: classes.graphIconButtonLabel }}
					style={{ marginRight: 20, backgroundColor: 'transparent' }}
					onClick={toggleCurrentLine}
				>
					<GraphCurrentIcon className={classes.graphIconButtonIcon} />
					<Typography className={classes.graphIconButtonLabelText}>Aktuel</Typography>
				</Button>
				<Button
					classes={{ root: classes.graphIconButton, label: classes.graphIconButtonLabel }}
					style={{ marginRight: 20, backgroundColor: 'transparent' }}
					onClick={togglGoalLine}
				>
					<GraphGoalIcon className={classes.graphIconButtonIcon} />
					<Typography className={classes.graphIconButtonLabelText}>Målsætning</Typography>
				</Button>
				<Button
					classes={{ root: classes.graphIconButton, label: classes.graphIconButtonLabel }}
					style={{ marginRight: 20, backgroundColor: 'transparent' }}
					onClick={togglLastLine}
				>
					<GraphLastIcon className={classes.graphIconButtonIcon} />
					<Typography className={classes.graphIconButtonLabelText}>Sidste uge</Typography>
				</Button>
				<Button
					classes={{ root: classes.graphIconButton, label: classes.graphIconButtonLabel }}
					style={{ backgroundColor: 'transparent' }}
					onClick={togglBenchmarkLine}
				>
					<GraphBenchmarkIcon className={classes.graphIconButtonIcon} />
					<Typography className={classes.graphIconButtonLabelText}>Benchmark</Typography>
				</Button>
			 </Box>
		</Card>
	)
}
let MemoBGraphContainer = React.memo(BuildingGraphContainer)
export default MemoBGraphContainer;

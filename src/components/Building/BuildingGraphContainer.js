import React, { useEffect } from 'react';
import { Card, CardHeader, IconButton, Box, Typography, Button } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import moment from 'moment';

import buildingStyles from '../../styles/buildingStyles';
import BuildingLineGraph from './BuildingLineGraph';
import CircularLoader from '../CircularLoader'
import { getDeviceData } from '../../redux/lineData'
import { useDispatch, useSelector } from 'hooks'
let deviceId = 2641

const BuildingGraphContainer = () => {
	const dispatch = useDispatch()
	const classes = buildingStyles();
	const loading = useSelector(s => s.lineData.loading)
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
				<Button>Uge</Button>
			</Box>
			<Box display="flex" justifyContent="center" alignItems="center" className={classes.graphRibbon}>
				<Box>
					<Typography>Daglig udledning: X tons</Typography>
				</Box>
			</Box>

			{loading ? <CircularLoader /> : <BuildingLineGraph id="graph" />}
		</Card>
	)
}
let MemoBGraphContainer = React.memo(BuildingGraphContainer)
export default MemoBGraphContainer;

import React from 'react';
import { Card, CardHeader, IconButton, Box, Typography, Button } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import moment from 'moment';

import buildingStyles from '../../styles/buildingStyles';
import BuildingLineGraph from './BuildingLineGraph';

const BuildingGraphContainer = () => {
	const classes = buildingStyles();

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

			<BuildingLineGraph id="graph" />
		</Card>
	)
}

export default BuildingGraphContainer;

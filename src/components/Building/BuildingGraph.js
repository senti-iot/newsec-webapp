import React from 'react';
import { Card, CardHeader, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import buildingStyles from '../../styles/buildingStyles';

const BuildingGraph = () => {
	const classes = buildingStyles();

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
		</Card>
	)
}

export default BuildingGraph;

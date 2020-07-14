import React from 'react';
import { Card, CardHeader, CardContent, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import buildingStyles from '../../styles/buildingStyles';

const BuildingEnergy = props => {
	const classes = buildingStyles();
	// const building = props.building;

	return (
		<Card className={classes.card} style={{ minHeight: 470 }}>
			<CardHeader
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title="Relativ energi"
				titleTypographyProps={{ variant: 'h4' }}
			/>
			<CardContent>
			</CardContent>
		</Card>
	)
}

export default BuildingEnergy;

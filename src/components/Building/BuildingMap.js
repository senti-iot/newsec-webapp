import React from 'react';
import { Card, CardHeader, CardContent, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import buildingStyles from '../../styles/buildingStyles';

const BuildingMap = props => {
	const classes = buildingStyles();
	// const building = props.building;

	return (
		<Card className={classes.card}>
			<CardHeader
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title="Kort"
				titleTypographyProps={{ variant: 'h4' }}
			/>
			<CardContent>
			</CardContent>
		</Card>
	)
}

export default BuildingMap;

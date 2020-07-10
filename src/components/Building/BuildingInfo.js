import React from 'react';
import { Card, CardHeader, Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import buildingStyles from '../../styles/buildingStyles';

const BuildingInfo = props => {
	const classes = buildingStyles();
	const building = props.building;
	console.log(building);
	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar className={classes.avatar}>
          			</Avatar>
				}
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title={building.name}
				subheader="September 14, 2016"
				titleTypographyProps={{ variant: 'h4' }}

			/>
		</Card>
	)
}

export default BuildingInfo;

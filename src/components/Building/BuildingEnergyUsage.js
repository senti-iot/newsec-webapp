import React from 'react';
import { Card, CardHeader, CardContent, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';

import buildingStyles from 'styles/buildingStyles';

const BuildingEnergyUsage = props => {
	const classes = buildingStyles();
	// const building = props.building;

	return (
		<Card className={classes.card} style={{ minHeight: 500 }}>
			<CardHeader
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title="Energiforbrug"
				titleTypographyProps={{ variant: 'h4' }}
				subheader={"Årlig sum " + moment().format('YYYY')}
				subheaderTypographyProps={{ variant: 'h5' }}
			/>
			<CardContent>
			</CardContent>
		</Card>
	)
}

export default BuildingEnergyUsage;

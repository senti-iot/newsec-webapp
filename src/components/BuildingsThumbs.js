import React from 'react';
import { Grid, Card, CardHeader, CardContent, Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import buildingStyles from '../styles/buildingStyles';

const BuildingsThumbs = props => {
	const buildings = props.buildings;
	const classes = buildingStyles();

	return (
		<Grid container spacing={3}>
			{buildings.map(building => {
				return (
					<Grid item xs={12} md={3}>
						<Card>
							<CardHeader
								avatar={
									<Avatar aria-label="recipe" className={classes.avatar}>
          							</Avatar>
								}
								action={
									<IconButton>
										<MoreVertIcon />
									</IconButton>
								}
								title={building.name}
								subheader={building.no}
							/>
							<CardContent>

							</CardContent>
						</Card>
					</Grid>
				)
			})}
		</Grid>
	)
}

export default BuildingsThumbs;

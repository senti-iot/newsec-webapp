import React from 'react';
import { Grid, Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Button, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useHistory } from 'react-router';

import buildingStyles from '../styles/buildingStyles';

const BuildingsThumbs = props => {
	const buildings = props.buildings;
	const classes = buildingStyles();
	const history = useHistory();

	const handleClick = uuid => {
		history.push('/building/' + uuid);
	}

	return (
		<Grid container spacing={3}>
			{buildings.map(building => {
				return (
					<Grid item xs={12} md={3} key={building.uuid}>
						<Card>
							<CardHeader
								avatar={
									<Avatar aria-label="recipe" className={classes.avatar}>
          							</Avatar>
								}
								action={
									<>
										<IconButton>
											<StarBorderIcon />
										</IconButton>
										<IconButton>
											<MoreVertIcon />
										</IconButton>
									</>
								}
								title={building.name}
								subheader={building.no}
								titleTypographyProps={{ variant: 'h6' }}
								subheaderTypographyProps={{ variant: 'h6' }}
							/>
							<CardContent>
								<Typography>{building.grouptype}</Typography>

								<CardActions disableSpacing={true}>
									<Button
										size="small"
										color="primary"
										endIcon={<ArrowForwardIosIcon />}
										style={{ marginLeft: 'auto' }}
										onClick={() => handleClick(building.uuid)}>
										SE MERE
        							</Button>
								</CardActions>
							</CardContent>
						</Card>
					</Grid>
				)
			})}
		</Grid>
	)
}

export default BuildingsThumbs;

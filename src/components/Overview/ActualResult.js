import React from 'react';
import { Card, CardHeader, CardContent, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import buildingStyles from '../../styles/buildingStyles';

const ActualResult = () => {
	const classes = buildingStyles();

	return (
		<Card className={classes.card}>
			<CardHeader
				action={
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				}
				title="Aktuelt resultat"
				titleTypographyProps={{ variant: 'h5' }}
			/>
			<CardContent>
			</CardContent>
		</Card>
	)
}

export default ActualResult;
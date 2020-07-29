import React from 'react';
import { Card, CardHeader, CardContent, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const OverviewScore = () => {
	return (
		<Card>
			<CardHeader
				action={
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				}
				title="Relativ CO2 score"
				titleTypographyProps={{ variant: 'h5' }}
			/>
			<CardContent>
			</CardContent>
		</Card>
	)
}

export default OverviewScore;

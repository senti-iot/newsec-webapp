import React from 'react';
import { Card, CardHeader, CardContent, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const OverviewForecast = () => {
	return (
		<Card>
			<CardHeader
				action={
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				}
				title="Prognose 2020"
				titleTypographyProps={{ variant: 'h5' }}
			/>
			<CardContent>
			</CardContent>
		</Card>
	)
}

export default OverviewForecast;

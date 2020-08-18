import React from 'react';
import { Card, CardHeader, CardContent, IconButton, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import mainStyles from 'styles/mainStyles';
import buildingStyles from 'styles/buildingStyles';
import ArrowDownIcon from 'assets/icons/green_arrow_down.png';

const OverviewCurrentResult = () => {
	const classes = buildingStyles();
	const mainClasses = mainStyles();

	return (
		<Card className={classes.card}>
			<CardHeader
				action={
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				}
				title="Aktuelt resultat"
				titleTypographyProps={{ variant: 'h4' }}
			/>
			<CardContent>
				<div className={mainClasses.currentResultWrapper}>
					<div>
						<Typography variant="h2" style={{ color: '#377EB8' }}>14.5%</Typography>
					</div>
					<div>
						<img src={`${ArrowDownIcon}`} alt="" className={mainClasses.currentResultArrow} />
					</div>
				</div>
				<Typography variant="h4">FALD I <span style={{ color: '#377EB8', fontWeight: 'bold' }}>CO2 FORBRUG</span> SIDEN 2018</Typography>
			</CardContent>
		</Card>
	)
}

export default OverviewCurrentResult;

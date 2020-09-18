import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import mainStyles from 'styles/mainStyles';
import buildingStyles from 'styles/buildingStyles';
import ArrowDownIcon from 'assets/icons/green_arrow_down.png';

const OverviewCurrentResult = () => {
	const classes = buildingStyles();
	const mainClasses = mainStyles();

	return (
		<Card className={classes.card}>
			<CardContent style={{ paddingTop: '0px !important' }}>
				<Typography variant="h3">Aktuelt resultat</Typography>
				<div className={mainClasses.currentResultWrapper}>
					<div>
						<Typography variant="h2" style={{ color: '#377EB8' }}>14.5%</Typography>
					</div>
					<div>
						<img src={`${ArrowDownIcon}`} alt="" className={mainClasses.currentResultArrow} />
					</div>
				</div>
				<Typography variant="h3">FALD I <span style={{ color: '#377EB8', fontWeight: 'bold' }}>CO₂ FORBRUG</span> SIDEN 2018</Typography>
			</CardContent>
		</Card>
	)
}

export default OverviewCurrentResult;

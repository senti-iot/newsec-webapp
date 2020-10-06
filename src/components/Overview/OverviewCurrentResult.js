import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';

import mainStyles from 'styles/mainStyles';
import buildingStyles from 'styles/buildingStyles';
import ArrowDownIcon from 'assets/icons/green_arrow_down.png';
import { getCurrentResult } from 'redux/data';
import CircularLoader from 'components/CircularLoader';

const OverviewCurrentResult = props => {
	const classes = buildingStyles();
	const mainClasses = mainStyles();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	const group = props.group;

	const currentResult = useSelector(s => s.data.currentResult);

	useEffect(() => {
		if (currentResult) {
			setLoading(false);
		}
	}, [currentResult]);

	useEffect(() => {
		setLoading(true);
		dispatch(getCurrentResult(group));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [group]);

	return (
		<Card className={classes.card}>
			<CardContent style={{ paddingTop: '0px !important' }}>
				<Typography variant="h3">Aktuelt resultat</Typography>

				{!loading ?
					<>
						<div className={mainClasses.currentResultWrapper}>
							<div>
								<Typography variant="h2" style={{ color: '#377EB8' }}><NumberFormat value={Math.abs(currentResult.result)} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={1} />%</Typography>
							</div>
							<div>
								<img src={`${ArrowDownIcon}`} alt="" className={mainClasses.currentResultArrow} />
							</div>
						</div>
						{currentResult.result < 0 ?
							<Typography variant="h3">FALD I <span style={{ color: '#377EB8', fontWeight: 'bold' }}>CO₂ FORBRUG</span> SIDEN 2018</Typography>
							: 
							<Typography variant="h3">STIGNING I <span style={{ color: '#377EB8', fontWeight: 'bold' }}>CO₂ FORBRUG</span> SIDEN 2018</Typography>
						}
					</>
					: <CircularLoader fill /> }
			</CardContent>
		</Card>
	)
}

export default OverviewCurrentResult;

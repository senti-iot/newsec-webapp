import React from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/da';
import NumberFormat from 'react-number-format';

import lineGraphStyles from 'styles/lineGraphStyles';

const Tooltip = (props) => {
	const classes = lineGraphStyles();

	const renderTooltipType = () => {
		let text = '';
		if (props.tooltipType === 'Actual') {
			text = 'Aktuel CO₂ udledning';
		} else if (props.tooltipType === 'Goal') {
			text = 'Målsætning CO₂ udledning';
		} else if (props.tooltipType === 'PreviousPeriod') {
			text = 'Forrige periode CO₂ udledning';
		} else if (props.tooltipType === 'Benchmark') {
			text = 'Benchmark CO₂ udledning';
		}

		return text;
	}

	const renderNumber = () => {
		let number = props.tooltip.value;
		let numDecimals = 1;
		if (number >= 1000) { // if over 1000 g show in kg
			number /= 1000;
			numDecimals = 2;
		}

		return <NumberFormat value={number} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={numDecimals} />;
	}

	return (
		<Card id={props.fs ? 'tooltipfsLG' + props.id : 'tooltip' + props.id} className={classes.tooltip}>
			<CardContent>
				<Grid container>
					<Grid item xs={12}>
						<Typography variant={'h5'} style={{ color: '#7A7A7A' }}>{renderTooltipType()}</Typography>
					</Grid>
					<Grid item xs={12}>
						<div style={{ display: 'flex', alignItems: 'flex-end' }}>
							<div style={{ marginRight: 10 }}><Typography style={{ fontSize: '2.6rem', color: '#497EB3', lineHeight: '3.2rem' }}>{renderNumber()}</Typography></div>
							<div><Typography style={{ fontSize: '1.8rem', color: '#497EB3' }}>{props.tooltip.value >= 1000 ? 'kg' : 'g'} pr. m2</Typography></div>
						</div>
					</Grid>
					<Grid item xs={12}>
						<Typography variant={'h5'} style={{ color: '#7A7A7A' }}>{moment(props.tooltip.date).locale('da').format('ll')}</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}

export default Tooltip;

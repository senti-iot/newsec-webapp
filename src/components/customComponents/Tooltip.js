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
			text = 'Aktuel CO2 udledning';
		} else if (props.tooltipType === 'Goal') {
			text = 'Målsætning CO2 udledning';
		} else if (props.tooltipType === 'PreviousPeriod') {
			text = 'Forrige period CO2 udledning';
		} else if (props.tooltipType === 'Benchmark') {
			text = 'Benchmark CO2 udledning';
		}

		return text;
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
							<div style={{ marginRight: 10 }}><Typography style={{ fontSize: '2.6rem', color: '#497EB3', lineHeight: '3.2rem' }}><NumberFormat value={props.tooltip.value} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={3} /></Typography></div>
							<div><Typography style={{ fontSize: '1.8rem', color: '#497EB3' }}>kg pr. m2</Typography></div>
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

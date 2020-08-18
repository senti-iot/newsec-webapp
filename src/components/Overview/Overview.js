import React from 'react';
import moment from 'moment';
import { Grid, Typography, Box } from '@material-ui/core';
import { useSelector } from 'react-redux';

import OverviewCurrentResult from './OverviewCurrentResult';
import OverviewBarGraph from './OverviewBarGraph';
import BenchmarkEnergyGraph from 'components/Benchmark/BenchmarkEnergyGraph';
import CircularLoader from 'components/CircularLoader';
import mainStyles from 'styles/mainStyles';

const Overview = props => {
	const user = useSelector(s => s.user.user);
	const buildings = props.buildings;
	const classes = mainStyles();

	const getWelcomeTime = () => {
		let string = "";
		const hour = moment().hour();

		if (hour >= 0 && hour < 6) {
			string = "God nat";
		} else if (hour >= 6 && hour < 9) {
			string = "God morgen";
		} else if (hour >= 9 && hour < 12) {
			string = "God formiddag";
		} else if (hour >= 12 && hour < 14) {
			string = "God middag";
		} else if (hour >= 14 && hour < 18) {
			string = "God eftermiddag";
		} else if (hour >= 18 && hour <= 23) {
			string = "God aften";
		}

		return string;
	}

	return (
		<>
			{user && buildings ?
				<Grid container spacing={5}>
					<Grid item xs={12} lg={7}>
						<Box className={classes.overviewWelcome}>
							<Typography variant="h4" style={{ color: '#000', marginBottom: 20 }}>{getWelcomeTime()} {`${user.firstName}`}</Typography>
							<Typography style={{ color: '#000', fontFamily: 'interstateLight' }}>Brug benchmark for at gå direkte til den ejendom hvor du ønske at aflæse energiforbrug og CO2. Du kan også via menuen få vist ejendomme som kort, liste eller miniaturer. Til højre på menuen kan du filtrere dine visning.</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} lg={5}>
						<OverviewCurrentResult />
					</Grid>
					<Grid item xs={12} lg={7} xl={7}>
						<OverviewBarGraph buildings={buildings} />
					</Grid>
					<Grid item xs={12} lg={5} xl={5}>
						<BenchmarkEnergyGraph buildings={buildings} />
					</Grid>
				</Grid>
				: <CircularLoader fill style={{ marginTop: 500 }} />}
		</>
	)
}

export default Overview;

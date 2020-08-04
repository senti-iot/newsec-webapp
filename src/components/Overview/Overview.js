import React from 'react';
import moment from 'moment';
import { Grid, Typography, Box } from '@material-ui/core';
import { useSelector } from 'react-redux';

import ActualResult from './OverviewCurrentResult';
import OverviewBarGraph from './OverviewBarGraph';
import OverviewScore from './OverviewScore';
import OverviewForecast from './OverviewForecast';
import CircularLoader from 'components/CircularLoader';

const Overview = props => {
	const user = useSelector(s => s.user.user);
	const buildings = props.buildings;

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
					<Grid item xs={12} lg={8}>
						<Box style={{ maxWidth: '50%' }}>
							<Typography variant="h5" style={{ color: '#000', marginBottom: 20 }}>{getWelcomeTime()} {`${user.firstName} ${user.lastName}`}</Typography>
							<Typography style={{ color: '#000', fontWeight: 300 }}>Brug benchmark for at gå direkte til den ejendom hvor du ønske at aflæse energiforbrug og CO2. Du kan også via menuen få vist ejendomme som kort, liste eller miniaturer. Til højre på menuen kan du filtrere dine visning.</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} lg={4}>
						<ActualResult />
					</Grid>
					<Grid item xs={12} lg={8}>
						<OverviewBarGraph buildings={buildings} />
					</Grid>
					<Grid item xs={12} lg={2}>
						<OverviewScore />
					</Grid>
					<Grid item xs={12} lg={2}>
						<OverviewForecast />
					</Grid>
				</Grid>
				: <CircularLoader fill style={{ marginTop: 500 }} />}
		</>
	)
}

export default Overview;

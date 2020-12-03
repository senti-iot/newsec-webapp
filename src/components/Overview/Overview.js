import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Grid, Typography, Box, Select, FormControl, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import OverviewCurrentResult from './OverviewCurrentResult';
import OverviewBarGraph from './OverviewBarGraph';
import OverviewEnergyGraph from 'components/Overview/OverviewEnergyGraph';
import CircularLoader from 'components/CircularLoader';
import mainStyles from 'styles/mainStyles';
import { changeMainView, changeHeaderTitle, toogleFilterIcon, closeFilterBar } from 'redux/appState';

const Overview = props => {
	const dispatch = useDispatch();
	const user = useSelector(s => s.user.user);
	const buildings = props.buildings;
	const classes = mainStyles();
	const [selectedGroup, setSelectedGroup] = useState(0);

	useEffect(() => {
		dispatch(changeMainView('overview'));
		dispatch(changeHeaderTitle('Benchmark'));
		dispatch(closeFilterBar(true));
		dispatch(toogleFilterIcon(false));
	}, [dispatch]);

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

	const handleGroupChange = event => {
		setSelectedGroup(event.target.value);
	}

	return (
		<>
			{user && buildings ?
				<Grid container spacing={5}>
					<Grid item xs={12} lg={7}>
						<Box className={classes.overviewWelcome}>
							<Typography variant="h3" style={{ color: '#000', marginBottom: 20, textTransform: 'uppercase' }}>{getWelcomeTime()} {`${user.firstName}`}</Typography>
							<Typography variant="body2">Brug benchmark for at gå direkte til den ejendom hvor du ønske at aflæse energiforbrug og CO₂. Du kan også via menuen få vist ejendomme som kort, liste eller miniaturer. Til højre på menuen kan du filtrere dine visninger.</Typography>

							<Grid container style={{ marginTop: 20 }}>
								<Grid item style={{ display: 'flex', alignItems: 'center' }}>
									<Typography variant="body2">Vis data for:</Typography>
								</Grid>
								<Grid item>
									<FormControl variant="outlined" className={classes.formControl}>
										<Select
											labelId="demo-simple-select-outlined-label"
											id="demo-simple-select-outlined"
											value={selectedGroup}
											onChange={handleGroupChange}
											style={{ height: 40, marginLeft: 10 }}
										>
											<MenuItem value="0">Alle grupper</MenuItem>
											<MenuItem value="1">Gruppe 1 - Boliger</MenuItem>
											<MenuItem value="2">Gruppe 2 - Boliger og Erhverv</MenuItem>
											<MenuItem value="3">Gruppe 3 - Erhverv med ventilation og med køl</MenuItem>
											<MenuItem value="4">Gruppe 4 - Erhverv med ventilation og uden køl</MenuItem>
											<MenuItem value="5">Gruppe 5 - Erhverv uden ventilation og uden køl</MenuItem>
										</Select>
									</FormControl>
								</Grid>
							</Grid>
						</Box>
					</Grid>
					<Grid item xs={12} lg={5}>
						<OverviewCurrentResult group={selectedGroup} />
					</Grid>
					<Grid item xs={12} lg={7} xl={7} style={{ display: 'flex' }}>
						<OverviewBarGraph buildings={buildings} group={selectedGroup} />
					</Grid>
					<Grid item xs={12} lg={5} xl={5} style={{ display: 'flex' }}>
						<OverviewEnergyGraph buildings={buildings} group={selectedGroup} />
					</Grid>
				</Grid>
				: <CircularLoader fill style={{ marginTop: 500 }} />}
		</>
	)
}

export default Overview;

import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

import BuildingInfo from './BuildingInfo';
import BuildingImages from './BuildingImages';
import BuildingGraphContainer from './BuildingGraphContainer';
import BuildingForecast from './BuildingForecast';
import BuildingEnergyUsage from './BuildingEnergyUsage';
import BuildingScore from './BuildingScore';
import BuildingEnergyGraph from './BuildingEnergyGraph';
import BuildingMap from './BuildingMap';
import { getBuilding } from 'redux/buildings';
import CircularLoader from 'components/CircularLoader';

const Building = props => {
	const dispatch = useDispatch();
	const { uuid } = useParams();

	const building = useSelector(s => s.buildingsReducer.building);
	const loading = useSelector(s => s.buildingsReducer.loadingExtended);

	useEffect(() => {
		dispatch(getBuilding(uuid));
	}, [dispatch, uuid]);

	return (
		<>
			{!loading ?
				<Grid container spacing={5}>
					<Grid item xs={12} lg={7} style={{ display: 'flex' }}>
						<BuildingInfo building={building} />
					</Grid>
					<Grid item xs={12} lg={5} style={{ display: 'flex' }}>
						<BuildingImages building={building} />
					</Grid>
					<Grid item xs={12}>
						<BuildingGraphContainer building={building} />
					</Grid>
					<Grid item xs={12} lg={4} style={{ display: 'flex' }}>
						<BuildingForecast building={building} />
					</Grid>
					<Grid item xs={12} lg={4} style={{ display: 'flex' }}>
						<BuildingEnergyUsage building={building} />
					</Grid>
					<Grid item xs={12} lg={4} style={{ display: 'flex' }}>
						<BuildingScore building={building} />
					</Grid>
					<Grid item xs={12}>
						<BuildingEnergyGraph building={building} />
					</Grid>
					<Grid item xs={12}>
						<BuildingMap building={building} />
					</Grid>
				</Grid>
				: <CircularLoader fill style={{ marginTop: 200 }} />}
		</>
	)
}

// Building.whyDidYouRender = true

export default Building;

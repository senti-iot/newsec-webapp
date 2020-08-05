import React from 'react';
import { Grid } from '@material-ui/core';

import OverviewBarGraph from 'components/Overview/OverviewBarGraph';
import OverviewScore from 'components/Overview/OverviewScore';
import OverviewForecast from 'components/Overview/OverviewForecast';
import BenchmarkEnergyGraph from 'components/Benchmark/BenchmarkEnergyGraph';

const Benchmark = props => {
	return (
		<>
			<Grid container spacing={5}>
				<Grid item xs={12}>
					<OverviewBarGraph buildings={props.buildings} />
				</Grid>
				<Grid item xs={12} lg={9}>
					<BenchmarkEnergyGraph buildings={props.buildings} />
				</Grid>
				<Grid item xs={12} lg={3}>
					<OverviewForecast />
				</Grid>
				<Grid item xs={12} lg={3}>
					<OverviewScore />
				</Grid>
				<Grid item xs={12} lg={9}>
				</Grid>
			</Grid>
		</>
	)
}

export default Benchmark;
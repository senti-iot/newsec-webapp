import React from 'react';
import { Grid } from '@material-ui/core';

// import buildingStyles from '../../styles/buildingStyles';
import BuildingInfo from './BuildingInfo';

const Building = props => {
	// const classes = buildingStyles();
	const uuid = 'faa2c5c2-fbee-4fef-b938-87994c392357';
	console.log(props.buildings);
	let building = null;
	if (props.buildings) {
		building = props.buildings.filter(item => { return item.uuid === uuid })[0];
		console.log(building);
	}

	return (
		<>
			{building ?
				<Grid container spacing={3}>
					<Grid item xs={12} lg={8}>
						<BuildingInfo building={building} />
					</Grid>
					<Grid item xs={12} lg={4}>

					</Grid>
				</Grid>
				: ""}
		</>
	)
}

export default Building;

import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router';

import buildingStyles from 'styles/buildingStyles';

const BuildingDetailsPopup = props => {
	const building = props.building;
	const history = useHistory();
	const classes = buildingStyles();

	const handleClick = () => {
		history.push('/building/' + building.buildingUuid);
	}

	return (
		<div className={classes.detailsPopup}>
			<Typography variant="h4">{building.name}</Typography>
			<Typography variant="h5" style={{ color: '#979797' }}>{building.buildingNo}</Typography>

			<Button onClick={handleClick} style={{ width: '100%', marginTop: 30, color: '#fff', backgroundColor: '#214C6F' }}>Se detaljer</Button>
		</div>
	)
}

export default BuildingDetailsPopup;

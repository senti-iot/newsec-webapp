import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router';

const BuildingsMapPopup = props => {
	const building = props.building;
	const history = useHistory();

	const handleClick = () => {
		history.push('/building/' + building.uuid);
	}

	return (
		<>
			<Typography variant="h4">{building.name}</Typography>
			<Typography variant="h5" style={{ color: '#979797' }}>{building.no}</Typography>

			<Button onClick={handleClick} style={{ width: '100%', marginTop: 30, color: '#fff', backgroundColor: '#214C6F' }}>Se detaljer</Button>
		</>
	)
}

export default BuildingsMapPopup;

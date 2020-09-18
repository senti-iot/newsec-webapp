import React from 'react';
import { Button, Card, CardHeader, CardContent } from '@material-ui/core';
import { useHistory } from 'react-router';

import BuildingsThumbsImage from 'components/BuildingsThumbsImage';

const BuildingDetailsMapPopup = props => {
	const building = props.building;
	const history = useHistory();

	const handleClick = () => {
		history.push('/building/' + building.uuid);
	}

	return (
		<Card elevation={0}>
			<CardHeader
				avatar={
					<BuildingsThumbsImage building={building} />
				}
				title={building.no}
				subheader={building.name}
				titleTypographyProps={{ variant: 'h4' }}
				subheaderTypographyProps={{ variant: 'h5' }}
				style={{ padding: 0 }}
			/>
			<CardContent style={{ padding: 0 }}>
				<Button onClick={handleClick} style={{ width: '100%', marginTop: 30, color: '#fff', backgroundColor: '#214C6F' }}>Se detaljer</Button>
			</CardContent>
		</Card>
	)
}

export default BuildingDetailsMapPopup;

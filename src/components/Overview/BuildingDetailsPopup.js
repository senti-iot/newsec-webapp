import React from 'react';
import { Card, CardHeader, CardContent, Button } from '@material-ui/core';
import { useHistory } from 'react-router';

import BuildingsThumbsImage from 'components/BuildingsThumbsImage';

const BuildingDetailsPopup = props => {
	const building = props.building;
	const history = useHistory();

	const handleClick = () => {
		history.push('/building/' + building.buildingUuid);
	}

	return (
		<Card elevation={0}>
			<CardHeader
				avatar={
					<BuildingsThumbsImage building={building} />
				}
				title={building.buildingNo}
				subheader={building.name}
				titleTypographyProps={{ variant: 'h4' }}
				subheaderTypographyProps={{ variant: 'h5' }}
			/>
			<CardContent>
				<Button onClick={handleClick} style={{ width: '100%', marginTop: 30, color: '#fff', backgroundColor: '#214C6F' }}>Se detaljer</Button>
			</CardContent>
		</Card>
	)
}

export default BuildingDetailsPopup;

import React from 'react';
import { Card, CardHeader, CardContent, Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';

import BuildingsThumbsImage from 'components/BuildingsThumbsImage';
import { groupTypeLabel } from 'variables/functions';

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
				title={building.name}
				subheader={building.no}
				titleTypographyProps={{ variant: 'h4' }}
				subheaderTypographyProps={{ variant: 'h5' }}
			/>
			<CardContent>
				<Typography>{groupTypeLabel(building.grouptype)}</Typography>

				<Button onClick={handleClick} style={{ width: '100%', marginTop: 30, color: '#fff', backgroundColor: '#214C6F' }}>Se detaljer</Button>
			</CardContent>
		</Card>
	)
}

export default BuildingDetailsPopup;

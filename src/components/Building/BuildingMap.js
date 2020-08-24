import React, { useEffect } from 'react';
import { Card, CardHeader, CardContent, IconButton, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Map, Marker, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

import buildingStyles from '../../styles/buildingStyles';

const BuildingMap = props => {
	const classes = buildingStyles();
	const building = props.building;

	useEffect(() => {
		//leaflet hack to fix marker images
		delete L.Icon.Default.prototype._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
			iconUrl: require('leaflet/dist/images/marker-icon.png'),
			shadowUrl: require('leaflet/dist/images/marker-shadow.png')
		});
	}, []);

	const markerIcon = L.Icon.extend({
		options: {
			iconSize: [50, 84],
			iconAnchor: [25, 84],
			popupAnchor: [-3, -76]
		}
	});

	const findPinFromBuildingScore = score => {
		let pin;
		if (score <= 14.29) {
			pin = 1;
		} else if (score > 14.29 && score <= 28.58) {
			pin = 2;
		} else if (score > 28.58 && score <= 42.87) {
			pin = 3;
		} else if (score > 42.87 && score <= 57.16) {
			pin = 4;
		} else if (score > 57.16 && score <= 71.45) {
			pin = 5;
		} else if (score > 71.45 && score <= 85.74) {
			pin = 6;
		} else if (score > 85.74) {
			pin = 7;
		}

		return pin;
	}

	return (
		<>
			{building && building.lat && building.lon ? 
				<Card className={classes.card}>
					<CardHeader
						action={
							<IconButton aria-label="settings">
								<MoreVertIcon />
							</IconButton>
						}
						title="Kort"
						titleTypographyProps={{ variant: 'h4' }}
					/>
					<CardContent>
						<Map
							center={[building.lat, building.lon]}
							zoom={8}
							scrollWheelZoom={false}
							style={{ width: '100%', height: 400 }}
						>
							<TileLayer
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
							/>

							<Marker position={[building.lat, building.lon]} icon={new markerIcon({ iconUrl: '/assets/pins/pin_' + findPinFromBuildingScore(building.relativeCO2Score) + '.svg' })} />
						</Map>

						<Typography style={{ marginTop: 20 }} variant="body2">Koordinater: {building.lat} {building.lon}</Typography>
					</CardContent>
				</Card>
				: "" }
		</>
	)
}

export default BuildingMap;

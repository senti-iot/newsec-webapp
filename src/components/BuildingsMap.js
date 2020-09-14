import React, { useEffect, useRef, useCallback } from 'react';
import { Map, Marker, TileLayer, FeatureGroup, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { useSelector, useDispatch } from 'react-redux';

import BuildingDetailsMapPopup from 'components/BuildingDetailsMapPopup';
import { customFilterItems } from 'variables/filters';
import buildingStyles from 'styles/buildingStyles';
import { findPinFromBuildingScore } from 'variables/functions';
import { changeHeaderTitle, changeMainView, toogleFilterIcon } from 'redux/appState';

const BuildingsMap = props => {
	const filters = useSelector(s => s.appState.filters.buildings);
	const buildings = customFilterItems(props.buildings, filters);
	const mapRef = useRef(null);
	const groupRef = useRef(null);
	const classes = buildingStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(changeHeaderTitle('Kort'));
		dispatch(changeMainView('map'));
		dispatch(toogleFilterIcon(true));
	}, [dispatch]);

	const zoomToFitMarkers = useCallback(() => {
		if (!mapRef.current || !groupRef.current) {
			setTimeout(function () {
				zoomToFitMarkers();
			}, 500);
		} else {
			const map = mapRef.current.leafletElement;
			const group = groupRef.current.leafletElement;

			try {
				map.fitBounds(group.getBounds());
			} catch (e) {
				console.log('Could not fit bouds: ', e);
			}
		}
	}, []);

	useEffect(() => {
		zoomToFitMarkers();
	}, [filters, zoomToFitMarkers]);

	useEffect(() => {
		//leaflet hack to fix marker images
		delete L.Icon.Default.prototype._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
			iconUrl: require('leaflet/dist/images/marker-icon.png'),
			shadowUrl: require('leaflet/dist/images/marker-shadow.png')
		});

		zoomToFitMarkers();
	}, [zoomToFitMarkers]);

	const markerIcon = L.Icon.extend({
		options: {
			iconSize: [50, 84],
			iconAnchor: [25, 84],
			popupAnchor: [-3, -76]
		}
	});

	return (
		<>
			<Map
				ref={mapRef}
				center={[0, 0]}
				zoom={8}
				scrollWheelZoom={false}
				className={classes.buildingsMap}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
				/>

				<FeatureGroup ref={groupRef}>
					{buildings && buildings.map(building => {
						if (building.lat && building.lon) {
							return (
								<Marker key={building.uuid} position={[building.lat, building.lon]} icon={new markerIcon({ iconUrl: '/assets/pins/pin_' + findPinFromBuildingScore(building.relativeCO2Score) + '.svg' })}>
									<Popup closeButton={false}>
										<BuildingDetailsMapPopup building={building} />
									</Popup>
								</Marker>
							)
						}
						return null;
					})}
				</FeatureGroup>
			</Map>
		</>
	)
}

export default BuildingsMap;

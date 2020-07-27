import React, { useEffect, useRef } from 'react';
import { Map, Marker, TileLayer, FeatureGroup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { useHistory } from 'react-router';

const BuildingsMap = props => {
	const buildings = props.buildings;
	const mapRef = useRef(null);
	const groupRef = useRef(null);
	const history = useHistory();

	useEffect(() => {
		//leaflet hack to fix marker images
		delete L.Icon.Default.prototype._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
			iconUrl: require('leaflet/dist/images/marker-icon.png'),
			shadowUrl: require('leaflet/dist/images/marker-shadow.png')
		});

		const zoomToFitMarkers = () => {
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
		}

		zoomToFitMarkers();
	}, []);

	const goToBuilding = uuid => {
		history.push('/building/' + uuid);
	}

	return (
		<>
			<Map
				ref={mapRef}
				center={[0, 0]}
				zoom={8}
				scrollWheelZoom={false}
				style={{ width: '100%', height: 800 }}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
				/>

				<FeatureGroup ref={groupRef}>
					{buildings.map(building => {
						if (building.lat && building.lon) {
							return <Marker key={building.uuid} position={[building.lat, building.lon]} onclick={() => goToBuilding(building.uuid)} />;
						}
						return null;
					})}
				</FeatureGroup>
			</Map>
		</>
	)
}

export default BuildingsMap;

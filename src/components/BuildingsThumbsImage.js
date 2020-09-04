import React, { useEffect, useState } from 'react';

import buildingStyles from 'styles/buildingStyles';
import { getBuildingImageWithSize } from 'data/newsecApi';

const BuildingsThumbsImage = props => {
	const classes = buildingStyles();
	const building = props.building;
	const [imageData, setImageData] = useState(null);
	const [imageIsLoaded, setImageIsLoaded] = useState(false);

	useEffect(() => {
		const getImageData = async () => {
			console.log('getImageData: ' + building.uuid);
			let data = await getBuildingImageWithSize(building.uuid, building.images[0].filename, 100);

			if (data) {
				setImageData(data);
				setImageIsLoaded(true);
			}
		}

		if (!imageIsLoaded && building.images && building.images.length) {
			getImageData();
		}
	}, [building, imageIsLoaded]);

	return (
		<>
			{imageData ? 
				<div className={classes.thumbsImage} style={{ backgroundImage: 'url("' + imageData + '")' }}></div>
				:
				<div className={classes.thumbsImage} style={{ backgroundColor: '#ccc' }}></div>
			}
		</>
	)
}

export default BuildingsThumbsImage;

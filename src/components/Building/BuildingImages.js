/* eslint-disable array-callback-return */
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, Button, Grid } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

import { getBuildingImage } from 'data/newsecApi';
import CircularLoader from 'components/CircularLoader';

const BuildingImages = props => {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);

	const carouselRef = useRef(null);

	const building = props.building;

	useEffect(() => {
		async function fetchData() {
			let images = [];
			if (building && building.images) {
				setLoading(true);

				await Promise.all(
					building.images.map(async (imageObj) => {
						let data = await getBuildingImage(building.uuid, imageObj);
						images.push(data);
					})
				);

				let newItems = [];
				images.map(image => {
					newItems.push(<img src={`${image}`} alt="" style={{ width: '100%', maxHeight: 500 }} />);
				});

				setItems(newItems);
				setLoading(false);
			} else {
				setLoading(false);
			}
		}

		fetchData();
	}, [building]);

	return (
		<Card style={{ backgroundColor: '#F5F5F5', width: '100%' }}>
			<CardHeader
				title="Billeder"
				titleTypographyProps={{ variant: 'h4' }}
			/>
			<CardContent>
				{!loading ?
					<>
						{items.length ?
							<>
								<AliceCarousel
									ref={carouselRef}
									disableButtonsControls={true}
									items={items}
									// slideToIndex={currentIndex}
									disableDotsControls={items.length > 1 ? false : true}
								/>

								{items.length > 1 ?
									<Grid container justify="space-between">
										<Grid item>
											<Button
												variant="outlined"
												startIcon={<ArrowBackIosIcon />}
												onClick={() => carouselRef.slidePrev()}
												style={{ fontFamily: 'interstate', fontSize: '1.1rem', border: 'none', color: '#497EB3' }}
											>
												FORRIGE
											</Button>
										</Grid>
										<Grid item>
											<Button
												variant="outlined"
												endIcon={<ArrowForwardIosIcon />}
												onClick={() => carouselRef.slideNext()}
												style={{ fontFamily: 'interstate', fontSize: '1.1rem', border: 'none', color: '#497EB3' }}
											>
												NÆSTE
											</Button>
										</Grid>
									</Grid>
									: ""}
							</>
							: ""}
					</>
					: <CircularLoader fill style={{ minHeight: 500 }} />}
			</CardContent>
		</Card>
	)
}

export default BuildingImages;

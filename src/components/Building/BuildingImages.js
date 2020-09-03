/* eslint-disable array-callback-return */
import React from 'react';
import { Card, CardHeader, CardContent, IconButton, Button, Grid } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

import { getBuildingImage } from 'data/newsecApi';
import CircularLoader from 'components/CircularLoader';

class BuildingImages extends React.Component {
	state = {
		currentIndex: 0,
		items: [],
		loading: true
	}

	async componentDidMount() {
		let images = [];
		if (this.props.building) {
			this.setState({ loading: true });
			await Promise.all(
				this.props.building.images.map(async (imageObj) => {
					let data = await getBuildingImage(this.props.building.uuid, imageObj.filename);
					images.push(data);
				})
			);

			let newItems = [];
			images.map(image => {
				newItems.push(<img src={`${image}`} alt="" style={{ width: '100%', maxHeight: 500 }} />);
			});

			this.setState({ items: newItems });
			this.setState({ loading: false });
		}
		// return this.props.building.images.map((i) => {
		// 	return <img src={require('assets/building.jpg')} alt="" style={{ width: '100%', maxHeight: 500 }} />
		// });
	}

	render () {
		const { items, currentIndex, loading } = this.state

		return (
			<Card style={{ backgroundColor: '#F5F5F5', width: '100%' }}>
				<CardHeader
					action={
						<IconButton aria-label="settings">
							<MoreVertIcon />
						</IconButton>
					}
					title="Billeder"
					titleTypographyProps={{ variant: 'h4' }}
				/>
				<CardContent>
					{!loading ?
						<>
							{items.length ?
								<>
									<AliceCarousel
										ref={(el) => (this.Carousel = el)}
										buttonsDisabled={true}
										items={items}
										slideToIndex={currentIndex}
										dotsDisabled={items.length > 1 ? false : true}
									/>

									{items.length > 1 ?
										<Grid container justify="space-between">
											<Grid item>
												<Button
													variant="outlined"
													startIcon={<ArrowBackIosIcon />}
													onClick={() => this.Carousel.slidePrev()}
													style={{ fontFamily: 'interstate', fontSize: '1.1rem', border: 'none', color: '#497EB3' }}
												>
													FORRIGE
												</Button>
											</Grid>
											<Grid item>
												<Button
													variant="outlined"
													endIcon={<ArrowForwardIosIcon />}
													onClick={() => this.Carousel.slideNext()}
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
}

export default BuildingImages;

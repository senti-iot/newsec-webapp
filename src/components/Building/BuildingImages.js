import React from 'react';
import { Card, CardHeader, CardContent, IconButton, Button, Grid } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

class BuildingImages extends React.Component {
	items = [1, 2, 3, 4, 5]

	state = {
		currentIndex: 0,
		galleryItems: this.galleryItems(),
	}

	galleryItems() {
		return this.items.map((i) => <img src={require('assets/building.jpg')} alt="" style={{ width: '100%', maxHeight: 500 }} />)
	}

	render () {
		const { galleryItems, currentIndex } = this.state

		return (
			<Card style={{ backgroundColor: '#F5F5F5', height: 700 }}>
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
					<AliceCarousel
						ref={(el) => (this.Carousel = el)}
						buttonsDisabled={true}
						items={galleryItems}
						slideToIndex={currentIndex}
					/>

					<Grid container justify="space-between">
						<Grid item>
							<Button
								variant="outlined"
								startIcon={<ArrowBackIosIcon />}
								onClick={() => this.Carousel.slidePrev()}
								style={{ border: 'none', color: '#497EB3' }}
							>
								FORRIGE
							</Button>
						</Grid>
						<Grid item>
							<Button
								variant="outlined"
								endIcon={<ArrowForwardIosIcon />}
								onClick={() => this.Carousel.slideNext()}
								style={{ border: 'none', color: '#497EB3' }}
							>
								NÆSTE
							</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		)
	}
}

export default BuildingImages;

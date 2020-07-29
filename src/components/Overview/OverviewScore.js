import React from 'react';
import { Card, CardHeader, CardContent, IconButton, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReactSpeedometer from 'react-d3-speedometer';

import buildingStyles from '../../styles/buildingStyles';

const OverviewScore = () => {
	const classes = buildingStyles();

	return (
		<Card className={classes.card}>
			<CardHeader
				action={
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				}
				title="Relativ CO2 score"
				titleTypographyProps={{ variant: 'h5' }}
			/>
			<CardContent>
				<div style={{ width: "100%", height: "200px", margin: "0 auto" }}>
					<ReactSpeedometer
						value={50}
						minValue={0}
						maxValue={100}
						segments={13}
						valueTextFontSize="24"
						fluidWidth={true}
						needleColor="#33434b"
						needleHeightRatio={0.7}
						segmentColors={['#617850', 'transparent', '#779A60', 'transparent', '#BBD9A7', 'transparent', '#FED460', 'transparent', '#EF9663', 'transparent', '#CF7B4C', 'transparent', '#BF373D']}
						maxSegmentLabels={3}
						customSegmentStops={[
							0,
							14.2,
							15.2,
							28.4,
							29.4,
							42.6,
							43.6,
							56.8,
							57.8,
							71,
							72,
							85.2,
							86.2,
							100,
						]}
						customSegmentLabels={
							[
								{
									text: "Lav",
									position: "OUTSIDE",
									color: "#000",
								},
								{
									text: "",
									position: "INSIDE",
									color: "transparent",
								},
								{
									text: "",
									position: "INSIDE",
									color: "transparent",
								},
								{
									text: "",
									position: "INSIDE",
									color: "transparent",
								},
								{
									text: "",
									position: "INSIDE",
									color: "transparent",
								},
								{
									text: "",
									position: "INSIDE",
									color: "transparent",
								},
								{
									text: "Middel",
									position: "OUTSIDE",
									color: "#000",
								},
								{
									text: "",
									position: "INSIDE",
									color: "transparent",
								},
								{
									text: "",
									position: "INSIDE",
									color: "transparent",
								},
								{
									text: "",
									position: "INSIDE",
									color: "transparent",
								},
								{
									text: "",
									position: "INSIDE",
									color: "transparent",
								},
								{
									text: "",
									position: "INSIDE",
									color: "transparent",
								},
								{
									text: "Høj",
									position: "OUTSIDE",
									color: "#50005",
								}
							]}
					/>
				</div>

				<Typography>Porteføljen ligger under middel i CO2 belastning.</Typography>
			</CardContent>
		</Card>
	)
}

export default OverviewScore;

import React from 'react';
import { Card, CardHeader, CardContent, IconButton, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReactSpeedometer from 'react-d3-speedometer';

import buildingStyles from '../../styles/buildingStyles';

const BuildingScore = props => {
	const classes = buildingStyles();
	const building = props.building;

	return (
		<>
			{building ?
				<>
					<Card className={classes.card} style={{ minHeight: 470 }}>
						<CardHeader
							action={
								<IconButton aria-label="settings">
									<MoreVertIcon />
								</IconButton>
							}
							title="Relativ CO2 score"
							titleTypographyProps={{ variant: 'h4' }}
						/>
						<CardContent>
							<div className={classes.scoregraphwrapper}>
								<ReactSpeedometer
									value={building.relativeCO2Score}
									minValue={0}
									maxValue={100}
									segments={13}
									valueTextFontSize="1.8rem"
									paddingVertical={30}
									labelFontSize="1.1rem"
									textColor="#000"
									fluidWidth={true}
									needleColor="#33434b"
									needleHeightRatio={0.7}
									segmentColors={['#4A5131', 'transparent', '#6B840A', 'transparent', '#B3DC10', 'transparent', '#FFD600', 'transparent', '#F97F0A', 'transparent', '#C60018', 'transparent', '#9B0011']}
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

							<Typography style={{ marginTop: 100 }} variant="body2">Ejendommen ligger under middel i CO2 belastning</Typography>
						</CardContent>
					</Card>
				</>
				: ""}
		</>
	)
}

export default BuildingScore;

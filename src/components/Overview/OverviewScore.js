import React, { useEffect } from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import ReactSpeedometer from 'react-d3-speedometer';
import { useDispatch, useSelector } from 'react-redux';

import buildingStyles from '../../styles/buildingStyles';
import { getbuildingsScore } from 'redux/data';
import CircularLoader from 'components/CircularLoader';

const OverviewScore = () => {
	const classes = buildingStyles();
	const dispatch = useDispatch();

	const buildingsScoreData = useSelector(s => s.data.buildingsScoreData);

	useEffect(() => {
		dispatch(getbuildingsScore())
	}, [dispatch]);

	const renderText = value => {
		let text = '';
		if (value < 30) {
			text = 'Porteføljen ligger under middel i CO₂ belastning.';
		} else if (value >= 30 && value < 60) {
			text = 'Porteføljen ligger middel i CO₂ belastning.';
		} else {
			text = 'Porteføljen ligger over middel i CO₂ belastning.';
		}

		return text;
	}

	return (
		<>
			{buildingsScoreData ?
				<Card className={classes.card} style={{ minHeight: 370 }}>
					<CardHeader
						title="Relativ CO₂ score"
						titleTypographyProps={{ variant: 'h5' }}
					/>
					<CardContent>
						<div style={{ width: "100%", height: "200px", margin: "0 auto" }}>
							<ReactSpeedometer
								value={parseFloat(buildingsScoreData.co2score)}
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

						<Typography style={{ marginTop: 10 }}>{renderText(buildingsScoreData.co2score)}</Typography>
					</CardContent>
				</Card>
				: <CircularLoader fill /> }
		</>
	)
}

export default OverviewScore;

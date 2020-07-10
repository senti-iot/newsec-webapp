import React, { useEffect } from 'react';
import cookie from 'react-cookies';
import { useDispatch, useSelector } from 'react-redux';

import { getBuildings } from '../redux/buildings';
import buildingStyles from '../styles/buildingStyles';
import Header from './Header';
import Footer from './Footer';
import CircularLoader from '../components/CircularLoader';

const Building = () => {
	const classes = buildingStyles();
	const dispatch = useDispatch();

	const buildings = useSelector(s => s.buildingsReducer.buildings);
	const loading = useSelector(s => s.buildingsReducer.loading);
	console.log(buildings);
	useEffect(() => {
		dispatch(getBuildings());
	}, [dispatch]);
	console.log(cookie.load('SESSION'));

	return (
		<>
			<Header title={''} />
			<div className={classes.appBackground}>
				{!loading ?
					<></>
					: <CircularLoader fill style={{ marginTop: 500 }} />}
			</div>
			<Footer />
		</>
	)
}

export default Building;

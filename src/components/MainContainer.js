import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import cookie from 'react-cookies';

import mainStyles from '../styles/mainStyles';
import Header from './Header';
import Footer from './Footer';
import BuildingsList from './BuildingsList';
import Building from './Building';
import { getBuildings } from '../redux/buildings';
import CircularLoader from '../components/CircularLoader';

const MainContainer = props => {
	const classes = mainStyles();
	const dispatch = useDispatch();

	const buildings = useSelector(s => s.buildingsReducer.buildings);
	const loading = useSelector(s => s.buildingsReducer.loading);

	useEffect(() => {
		dispatch(getBuildings());
	}, [dispatch]);

	const onChangeView = () => {
		console.log('onChangeView');
	};

	return (
		cookie.load('SESSION') ?
			<>
				<Header title="Overblik" onChangeView={onChangeView} enableSecondary={true} />
				<div className={classes.appBackground}>
					{!loading ?
						<Switch>
							<Route path={'/building/:uuid'}>
								<Building />
							</Route>
							<Route path={'/'}>
								<BuildingsList buildings={buildings} />
							</Route>
							<Redirect path={'*'} to={'/'}></Redirect>
						</Switch>
						: <CircularLoader fill style={{ marginTop: 500 }} />}
				</div>
				<Footer />
			</>
			: <Redirect from={window.location.pathname} to={{
				pathname: '/login', state: {
					prevURL: window.location.pathname
				}
			}} />
	)
}

export default MainContainer;

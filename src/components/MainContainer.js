import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import cookie from 'react-cookies';

import mainStyles from '../styles/mainStyles';
import Header from './Header';
import Footer from './Footer';
import BuildingsList from './BuildingsList';
import BuildingsThumbs from './BuildingsThumbs';
import BuildingsMap from './BuildingsMap';
import Building from './Building/Building';
import { getBuildings } from '../redux/buildings';
import CircularLoader from '../components/CircularLoader';
import { changeSecondaryBarShown } from 'redux/appState';

const MainContainer = props => {
	const classes = mainStyles();
	const dispatch = useDispatch();

	const buildings = useSelector(s => s.buildingsReducer.buildings);
	const loading = useSelector(s => s.buildingsReducer.loading);
	const headerTitle = useSelector(s => s.appState.headerTitle);
	const secondaryBarVisible = useSelector(s => s.appState.secondaryBarVisible);
	const activeView = useSelector(s => s.appState.mainView);

	useEffect(() => {
		dispatch(getBuildings());
	}, [dispatch]);

	useEffect(() => {
		console.log('show');
		dispatch(changeSecondaryBarShown(true));
	}, [dispatch]);

	const onChangeView = () => {
		// console.log('onChangeView');
	};

	return (
		cookie.load('SESSION') ?
			<>
				<Header title={headerTitle} onChangeView={onChangeView} enableSecondary={secondaryBarVisible} />
				<div className={classes.appBackground}>
					{!loading ?
						<Switch>
							<Route path={'/building/:uuid'}>
								<Building buildings={buildings} />
							</Route>
							<Route path={'/'}>
								{activeView === 'list' ? <BuildingsList buildings={buildings} /> : ""}
								{activeView === 'map' ? <BuildingsMap buildings={buildings} /> : ""}
								{activeView === 'thumbs' ? <BuildingsThumbs buildings={buildings} /> : ""}
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

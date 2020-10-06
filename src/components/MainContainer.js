import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import cookie from 'react-cookies';

import mainStyles from 'styles/mainStyles';
import Header from './Header';
import Footer from './Footer';
import Overview from './Overview/Overview';
import BuildingsList from './BuildingsList';
import BuildingsThumbs from './BuildingsThumbs';
import BuildingsMap from './BuildingsMap';
import Building from './Building/Building';
import { getBuildings } from 'redux/buildings';
import { getUserData } from 'redux/user';
import CircularLoader from 'components/CircularLoader';
import FavoritesList from 'components/FavoritesList';
import UserList from 'components/UserList';
import OrgList from 'components/OrgList';
import Profile from 'components/User/Profile';
import Account from 'components/User/Account';
import Settings from 'components/User/Settings';

const MainContainer = props => {
	const classes = mainStyles();
	const dispatch = useDispatch();

	const buildings = useSelector(s => s.buildingsReducer.buildings);
	const loading = useSelector(s => s.buildingsReducer.loading);
	const secondaryBarVisible = useSelector(s => s.appState.secondaryBarVisible);

	useEffect(() => {
		dispatch(getBuildings());
		dispatch(getUserData());
	}, [dispatch]);

	const onChangeView = () => {
		// console.log('onChangeView');
	};

	return (
		cookie.load('SESSION') ?
			<>
				<Header onChangeView={onChangeView} enableSecondary={secondaryBarVisible} />
				<div className={classes.appBackground}>
					{!loading ?
						<Switch>
							<Route path={'/building/:uuid'}>
								<Building buildings={buildings} />
							</Route>
							<Route path={'/favorites'}>
								<FavoritesList />
							</Route>
							<Route path={'/users'}>
								<UserList />
							</Route>
							<Route path={'/customers'}>
								<OrgList />
							</Route>
							<Route path={'/list'}>
								<BuildingsList buildings={buildings} />
							</Route>
							<Route path={'/map'}>
								<BuildingsMap buildings={buildings} />
							</Route>
							<Route path={'/thumbs'}>
								<BuildingsThumbs buildings={buildings} />
							</Route>
							<Route path={'/profile'}>
								<Profile />
							</Route>
							<Route path={'/account'}>
								<Account />
							</Route>
							<Route path={'/settings'}>
								<Settings />
							</Route>
							<Route path={'/'}>
								<Overview buildings={buildings} />
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

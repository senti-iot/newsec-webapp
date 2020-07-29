import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import MainContainer from '../components/MainContainer';
import Login from './Login';
import Demo from './demo/Demo'
// import ForgotPassword from './ForgotPassword';
import NewContent from 'components/NewContent';
import { getUserData } from 'redux/user';

// <NewContent />
const Main = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserData());
	}, [dispatch]);

	return (
		<>
			<NewContent />

			<Switch>
				{/* <Route path={'/password/reset/:lang/:token?'}>
					<ForgotPassword />
				</Route> */}
				<Route path={'/login'}>
					<Login />
				</Route>
				<Route path={'/demo'}>
					<Demo/>
				</Route>
				<Route path={'/'}>
					<MainContainer />
				</Route>
			</Switch>
		</>
	)
}

export default Main

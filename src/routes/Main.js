import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainContainer from '../components/MainContainer';
import Login from './Login';
// import ForgotPassword from './ForgotPassword';
import NewContent from 'components/NewContent';

// <NewContent />
const Main = () => {
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
				<Route path={'/'}>
					<MainContainer />
				</Route>
			</Switch>
		</>
	)
}

export default Main

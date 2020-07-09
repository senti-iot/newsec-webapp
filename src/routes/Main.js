import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainContainer from '../components/MainContainer';
import Login from './Login';
import Demo from './demo/Demo'
// import ForgotPassword from './ForgotPassword';
//import NewContent from 'Components/Loaders/NewContent';

// <NewContent />
function Main() {
	return (
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
	)
}

export default Main

import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import cookie from 'react-cookies';

import mainStyles from '../styles/mainStyles';
import Header from './Header';
import Footer from './Footer';
import CircularLoader from '../components/CircularLoader';

function MainContainer(props) {
	const [loading, setLoading] = useState(true);
	const classes = mainStyles();

	return (
		cookie.load('SESSION') ?
			<>
				<Header title={props.title} />
				<div className={classes.appBackground}>
					{!loading ?
						<Switch>
							<Route exact path={'/'}>
								{/* <MapContainer /> */}
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

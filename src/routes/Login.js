import React, { useState } from 'react';
import moment from 'moment';
import cookie from 'react-cookies';
import { useHistory, useLocation } from 'react-router';
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';

import loginStyles from '../styles/loginStyles';
import useEventListener from '../hooks/useEventListener';
import { setToken } from '../data/api';
import { loginUser } from '../data/coreApi';

const Login = () => {
	const classes = loginStyles();
	const location = useLocation();
	const history = useHistory();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loggingIn, setLoggingIn] = useState(false);
	const [error, setError] = useState(false);

	const hangleLogin = async () => {
		setLoggingIn(true);

		await loginUser(username, password).then(async rs => {
			if (rs) {
				let exp = moment().add('1', 'day');
				cookie.save('SESSION', rs, { path: '/', expires: exp.toDate() });

				if (setToken()) {
					var prevURL = location.state ? location.state.prevURL : null;
					history.push(prevURL ? prevURL : '/');
				}
			} else {
				setError(true);
				setLoggingIn(false);
			}
		});
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			hangleLogin();
		}
	};

	useEventListener('keypress', handleKeyPress);

	return (
		<Grid container className={classes.root}>
			<Grid item className={classes.loginWrapper} sm={12} md={4} lg={3}>
				<div className={classes.topwrapper}>
					<div className={classes.logo}>
						<img src="/assets/logo.png" alt="" />
					</div>
					<div className={classes.header}>Newsec Property Knowledge Center</div>

					<TextField
						id="username"
						autoFocus
						onChange={(event) => setUsername(event.target.value)}
						className={classes.textfield}
						label="Brugernavn"
						variant="outlined"
						error={error}
					/>

					<TextField
						id="password"
						type="password"
						onChange={(event) => setPassword(event.target.value)}
						className={classes.textfield}
						label="Kodeord"
						variant="outlined"
						error={error}
					/>

					<div className={classes.buttonWrapper}>
						<Button
							variant="contained"
							color="primary"
							className={classes.button}
							disabled={loggingIn}
							onClick={hangleLogin}>
							LOG IND
						</Button>
						{loggingIn && <CircularProgress size={24} className={classes.buttonProgress} />}
					</div>

					<div className={classes.forgotpassword}><a href="/password/reset/da">Glemt kodeord?</a></div>
				</div>

				<div className={classes.bottomwrapper}>
					<div className={classes.copyright}>© 2016–{moment().year()} Alle rettigheder forbeholdt. Newsec Property Knowledge Center is powered by <a className={classes.copyright} href="https://senti.io/" target="_new">Senti</a>.</div>
					{/* <div className={classes.bottomLinksWrapper}><a href="/" className={classes.bottomLink}>Cookie politik</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="/" className={classes.bottomLink}>Persondatapolitik</a></div> */}
				</div>
			</Grid>
			<Grid item className={classes.loginImage} sm={false} md={8} lg={9}>
			</Grid>
		</Grid>
	)
}

export default Login;
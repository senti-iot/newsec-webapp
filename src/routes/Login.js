import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';

import loginStyles from '../styles/loginStyles';

const Login = () => {
	const classes = loginStyles();

	return (
		<Grid container className={classes.root}>
			<Grid item className={classes.loginWrapper} xs={3}>
				<div className={classes.logo}>
					<img src="/assets/logo.png" alt="" />
				</div>
				<div className={classes.header}>Newsec Property Knowledge Center</div>
				<div className={classes.needaccount}>Brug for en konto? <a href="/">Opret en konto</a></div>

				<TextField id="username" className={classes.textfield} label="Brugernavn" variant="outlined" />

				<TextField id="password" type="password" className={classes.textfield} label="Kodeord" variant="outlined" />

				<Button variant="contained" color="primary" className={classes.button}>
					LOG IND
				</Button>
			</Grid>
			<Grid item className={classes.loginImage} xs={9}>
			</Grid>
		</Grid>
	)
}

export default Login;
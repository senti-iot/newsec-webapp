import React, { useState } from 'react';
import moment from 'moment';
import { Grid, TextField, Button, CircularProgress, Typography } from '@material-ui/core';

import loginStyles from 'styles/loginStyles';
import useEventListener from 'hooks/useEventListener';
import { resetPassword } from 'data/coreApi';

const ForgotPassword = () => {
	const classes = loginStyles();

	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [sent, setSent] = useState(false);

	const handleReset = async () => {
		setLoading(true);

		await resetPassword(email).then(async rs => {
			setSent(true);

			if (rs === 200) {
				setLoading(false);
				setError(false);
			} else {
				if (rs === 404) {
					setErrorMsg('En bruger med den indtastede e-mail findes ikke');
				} else if (rs === 400) {
					setErrorMsg('Du skal indtaste din e-mail!');
				} else {
					setErrorMsg('En ukendt fejl opstod, prøv venligst igen!');
				}
				setError(true);
				setLoading(false);
			}
		});
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			handleReset();
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

					{sent && !error ?
						<Typography style={{ marginTop: 40 }}>En e-mail er er blevet sendt med instruktioner for hvordan du nulstiller dit kodeord!</Typography>
						: (
							<>
								<Typography style={{ marginTop: 40, marginBottom: 20 }}>Nulstil dit kodeord ved at indtaste din E-mail adresse</Typography>

								<TextField
									id="email"
									autoFocus
									value={email}
									onChange={(event) => setEmail(event.target.value)}
									className={classes.textfield}
									label="E-mail"
									variant="outlined"
									error={error}
									helperText={errorMsg}
								/>

								<div className={classes.buttonWrapper}>
									<Button
										variant="contained"
										color="primary"
										className={classes.button}
										disabled={loading}
										onClick={handleReset}>
										NULSTIL KODEORD
									</Button>
									{loading && <CircularProgress size={24} className={classes.buttonProgress} />}
								</div>
							</>
						) }

					<div className={classes.forgotpassword}><a href="/login">Gå til log ind</a></div>
				</div>

				<div className={classes.bottomwrapper}>
					<div className={classes.copyright}>© 2016–{moment().year()} Alle rettigheder forbeholdt. Newsec Property Knowledge Center is powered by Senti.</div>
					<div className={classes.bottomLinksWrapper}><a href="/" className={classes.bottomLink}>Cookie politik</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="/" className={classes.bottomLink}>Persondatapolitik</a></div>
				</div>
			</Grid>
			<Grid item className={classes.loginImage} sm={false} md={8} lg={9}>
			</Grid>
		</Grid>
	)
}

export default ForgotPassword;
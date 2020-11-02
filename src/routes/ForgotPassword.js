import React, { Fragment, useState, /* useRef,  useEffect, */ useCallback } from 'react'
import { Collapse, Button, Paper, Hidden, Typography } from '@material-ui/core'
import { Link, useParams, useHistory } from 'react-router-dom'

import { resetPassword, confirmPassword as bConfirmPass } from 'data/coreApi'
import logo from 'assets/logo.png'
import { useEventListener } from 'hooks'
import Danger from 'components/customComponents/Danger'
import ItemG from 'components/customComponents/ItemG'
import Success from 'components/customComponents/Success'
import TextF from 'components/customComponents/TextF'
import forgotPasswordPageStyles from 'styles/forgotPasswordStyles'

const ForgotPassword = props => {
	//Hooks
	const params = useParams()
	const classes = forgotPasswordPageStyles()
	const history = useHistory()
	//Redux
	// const dispatch = useDispatch()

	//State
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	// const [loggingIn, setLoggingIn] = useState(false)
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState([])
	// const [score, setScore] = useState(0)
	const [passwordRequest, setPasswordRequest] = useState(false)
	const [passwordReset, setPasswordReset] = useState(false)

	const errorMessages = useCallback(code => {
		switch (code) {
			case 0:
				return "Kodeord må ikke være blankt!"
			case 1:
				return "Kodeord skal være på mindst 8 tegn!"
			case 2:
				return "De indtastede kodeord er ikke ens!"
			case 404:
				return "Den indtastede E-mail er ikke tilknyttet en eksisterende konto!"
			case 404.1:
				return "Brugeren eksisterer ikke længere, eller adgangen er udløbet eller spærret!"
			default:
				return ''
		}
	}, [])

	const handleValidation = useCallback(() => {
		let errorCode = []
		if (password === '' && confirmPassword === '') {
			errorCode.push(0)
		}
		if (password.length < 8) {
			errorCode.push(1)
		}
		if (password !== confirmPassword) {
			errorCode.push(2)
		}
		if (errorCode.length === 0) {
			return true
		} else {
			setError(true)
			setErrorMessage(errorCode.map(c => (
				<Danger key={c}>{errorMessages(c)}</Danger>
			)))
			return false
		}
	}, [confirmPassword, errorMessages, password])

	const confirmPass = useCallback(async () => {
		if (handleValidation()) {
			let session = await bConfirmPass({
				newPassword: password,
				passwordToken: params.token,
			})
			if (session === 200) {
				setPasswordReset(true)
			} else {
				setError(true)
				setErrorMessage([<Danger>{errorMessages(404.1)}</Danger>])
			}
		}
	}, [errorMessages, handleValidation, params.token, password])
	const keyPressHandler = useCallback(
		(event) => {
			if (params.token)
				if (event.key === 'Enter') {
					confirmPass()
				}

		},
		[confirmPass, params.token]
	);

	useEventListener('keypress', keyPressHandler);

	const resetPass = async () => {
		let session = await resetPassword(email)
		console.log(session);
		if (session === 200) {
			setPasswordRequest(true)
		} else {
			setError(true)
			setErrorMessage([<Danger>{errorMessages(session)}</Danger>])
		}
	}

	const handleChangePassword = e => {
		setPassword(e.target.value)
		if (error) {
			setError(false)
			setErrorMessage([])
		}
	}
	const handleChangeEmail = e => {
		setEmail(e.target.value)
		if (error) {
			setError(false)
			setErrorMessage([])
		}
	}

	const handleChangeConfirmPassword = e => {
		setConfirmPassword(e.target.value)
		if (error) {
			setError(false)
			setErrorMessage([])
		}
	}

	return (
		<div className={classes.wrapper}>
			<ItemG xs={12} sm={12} md={4} lg={4} xl={3} container>
				<div className={classes.mobileContainer}>
					<Paper className={classes.paper}>
						<div className={classes.paperContainer}>
							<ItemG xs={12} container justify={'center'}>
								<img
									className={classes.logo}
									src={logo}
									alt=''
								/>
							</ItemG>
							<ItemG xs={12} container justify={'center'}>
								<Typography
									className={
										classes.loginButton +
										' ' +
										classes.needAccount
									}
								>
									{params.token
										? "Bekræft nyt kodeord"
										: "Nulstil dit kodeord ved at indtaste din E-mail adresse"}
								</Typography>
							</ItemG>
							<ItemG xs={12} container justify={'center'}>
								<ItemG container justify={'center'} xs={12}>
									<Collapse in={passwordReset}>
										{params.token ? (
											<Success
												className={
													classes.loginButton +
													' ' +
													classes.needAccount
												}
											>
												{"Din adgangskode er blevet ændret!"}
											</Success>
										) : null}
									</Collapse>
									<Collapse in={error}>
										{errorMessage}
									</Collapse>
								</ItemG>

								<ItemG container xs={12}>
									<ItemG container xs={12}>
										{!passwordRequest &&
											params.token ? null : (
												<TextF
													id={'email'}
													autoFocus
													label="E-mail"
													value={email}
													onChange={handleChangeEmail}
													margin="normal"
													fullWidth
													className={classes.loginButton}
													error={error}
												/>
											)}
									</ItemG>

									{params.token ? (
										<Fragment>
											<ItemG container xs={12}>
												<TextF
													fullWidth
													id={'password'}
													label="Kodeord"
													value={password}
													className={
														classes.loginButton
													}
													onChange={handleChangePassword}
													margin="normal"
													error={error}
													type={'password'}
												/>
											</ItemG>
											<ItemG container xs={12}>
												<TextF
													fullWidth
													id={'confirmpassword'}
													label="Bekræft kodeord"
													value={confirmPassword}
													className={
														classes.loginButton
													}
													onChange={handleChangeConfirmPassword}
													margin="normal"
													error={error}
													type={'password'}
												/>
											</ItemG>
										</Fragment>
									) : null}
									<Collapse in={passwordRequest}>
										<ItemG
											xs={12}
											className={classes.loginButton}
										>
											<Success>
												En E-mail er er blevet sendt med instruktioner for hvordan du nulstiller dit kodeord!
											</Success>
										</ItemG>
									</Collapse>
								</ItemG>
								<ItemG xs={12} container justify={'center'}>
									<Collapse in={!passwordRequest}>
										{!params.token ? (
											<Button
												className={classes.loginButton}
												variant={'outlined'}
												color={'primary'}
												onClick={resetPass}
											>
												Nulstil kodeord
											</Button>
										) : !passwordReset ? (
											<Button
												className={classes.loginButton}
												variant={'outlined'}
												color={'primary'}
												onClick={confirmPass}
											>
												Skift kodeord
											</Button>
										) : (<Button
											className={classes.loginButton}
											variant={'outlined'}
											color={'primary'}
											onClick={() =>
												history.push('/login')
											}
										>
											Gå til log ind
										</Button>)}
									</Collapse>
								</ItemG>
								<ItemG
									xs={12}
									container
									justify={'center'}
									style={{ margin: '32px 0px' }}
								>
									<ItemG
										xs={12}
										container
										justify={'space-around'}
									>
										<Collapse in={!passwordReset}>
											<Link to={`/login`}>
												Gå til log ind
											</Link>
										</Collapse>
									</ItemG>
								</ItemG>
							</ItemG>
						</div>
					</Paper>
				</div>
			</ItemG>
			<Hidden smDown>
				<ItemG md={8} lg={8} xl={9}>
				</ItemG>
			</Hidden>
		</div >
	)
}

export default ForgotPassword
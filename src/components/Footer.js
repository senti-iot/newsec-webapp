import React from 'react';
import { ButtonBase } from '@material-ui/core';
import { useHistory } from 'react-router'

import mainStyles from '../styles/mainStyles';
import logo from '../assets/logo.png';

const Footer = () => {
	const classes = mainStyles();
	const history = useHistory();

	return (
		<div className={classes.footer}>
			<div className={classes.logoContainer}>
				<ButtonBase
					focusRipple
					className={classes.image}
					focusVisibleClassName={classes.focusVisible}
					onClick={() => history.push('/')}
				>
					<img src={`${logo}`} alt="Newsec logo" className={classes.logo} />
				</ButtonBase>
			</div>
		</div>
	);
}

export default Footer;

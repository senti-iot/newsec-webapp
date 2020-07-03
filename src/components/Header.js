import React from 'react';
//, Toolbar, ButtonBase, Grid 
import { AppBar} from '@material-ui/core';
// import HeaderLinks from './HeaderLinks';
import mainStyles from '../styles/mainStyles';
// import logo from 'assets/logo.png'
// import { useHistory } from 'react-router'
// import { useLocalization } from 'Hooks';
// import { ItemG } from 'Components';

function Header({ ...props }) {
	const classes = mainStyles();
	// const history = useHistory();

	// const goHome = () => history.push('/');

	// var brand = (
	// 	<ButtonBase
	// 		focusRipple
	// 		className={classes.image}
	// 		focusVisibleClassName={classes.focusVisible}
	// 		onClick={goHome}
	// 	>
	// 		<img src={`${logo}`} alt="Logo" className={classes.imageSrc} />
	// 	</ButtonBase>
	// );

	return (
		<AppBar className={classes.appBar}>
			{/* <Toolbar className={classes.container}>
				<Grid container justify={'center'} alignItems={'center'} spacing={1}>
					<ItemG xs={3}>
						<div className={classes.logoContainer}>
							{brand}
							<div className={classes.logotext}>INSIGHT</div>
						</div>
					</ItemG>
					<ItemG xs={9}>
						<HeaderLinks t={t} history={history} />
					</ItemG>
				</Grid>
			</Toolbar> */}
		</AppBar>
	);
}

export default Header;
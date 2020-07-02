import { makeStyles } from '@material-ui/styles';

const loginStyles = makeStyles(theme => ({
	root: {
		height: '100vh',
	},
	loginWrapper: {
		textAlign: 'center',
	},
	loginImage: {
		backgroundImage: `url(${"/assets/loginbg.png"})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center'
	},
	logo: {
		textAlign: 'right',
		marginTop: '40px',
		marginRight: '40px'
	},
	header: {
		marginTop: '50px',
		fontFamily: 'Helvetica',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: '20px',
		lineHeight: '23px',
		textTransform: 'uppercase'
	},
	needaccount: {
		marginTop: '50px',
		fontFamily: 'Roboto',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: '17px',
		lineHeight: '20px',
	},
	textfield: {
		width: '80%',
		marginTop: '20px'
	},
	button: {
		width: '80%',
		height: '50px',
		marginTop: '20px',
		fontSize: '18px',
	}
}));

export default loginStyles;
import { makeStyles } from '@material-ui/styles';

const mainStyles = makeStyles(theme => ({
	root: {
		height: '100vh',
	},
	appBackground: {
		marginTop: 120,
		minHeight: 1100,
		overflowX: 'hidden',
	},
	appBar: {
		backgroundColor: 'red',
		//boxShadow: "none",
		borderBottom: "0",
		marginBottom: "0",
		position: 'fixed',
		// padding: "0 !important",
		// [theme.breakpoints.down('xs')]: {
		// 	height: 48
		// },
		height: "120px",
		zIndex: "1029",
		color: "#ffffff",
		border: "0",
		// transition: "all 150ms ease 0s",
		minHeight: "48px",
		display: "block",
	}
}));

export default mainStyles;
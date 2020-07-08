import { fade, makeStyles } from '@material-ui/core/styles';

const mainStyles = makeStyles(theme => ({
	root: {
		height: '100vh',
	},
	appBackground: {
		marginTop: 120,
		minHeight: 1100,
		overflowX: 'hidden',
	},
	appVBarWrapper: {
		flexGrow: 1,
	},
	appBarPrimary: {
		backgroundColor: '#D1D7DA !important',
	},
	appBarSecondary: {
		position: 'absolute',
		top: 72,
		left: 0,
		backgroundColor: '#365979 !important',
		width: '100%',
		height: 50,
		paddingTop: 2,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	logoContainer: {
		marginRight: theme.spacing(2),
	},
	logo: {
		maxWidth: '80px',
		marginLeft: 20,
	},
	appbarTitle: {
		flexGrow: 1,
		color: '#365979',
		fontWeight: '400 !important',
		paddingLeft: 100,
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.85),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.50),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '240px',
		// [theme.breakpoints.up('sm')]: {
		// 	marginLeft: theme.spacing(3),
		// 	width: 'auto',
		// },
	},
	searchIcon: {
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: '10px',
		color: '#979797',
	},
	searchInputRoot: {
		color: '#797979 !important',
	},
	searchInput: {
		width: '100%',
		paddingLeft: '40px !important',
		color: '#797979 !important',
	},
	notificationsBadge: {
		backgroundColor: '#E54C2A !important',
		color: '#fff !important',
	},
	notificationsIcon: {
		color: '#365979 !important',
	},
	username: {
		float: 'left',
		color: '#365979',
		fontSize: 16,
		marginTop: 25,
		marginLeft: 20,
		userSelect: 'none'
	},
	userimage: {
		float: 'left',
		borderRadius: '50%',
		height: 60,
		width: 60,
	},
	filterButton: {
		color: '#fff !important',
	},
	dimmedButton: {
		color: '#afbdc9 !important'
	}
}));

export default mainStyles;
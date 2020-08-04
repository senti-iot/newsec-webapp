import { fade, makeStyles } from '@material-ui/core/styles';

const mainStyles = makeStyles(theme => ({
	root: {
		height: '100vh',
	},
	appBackground: {
		marginTop: 156,
		marginLeft: 40,
		marginRight: 40,
		marginBottom: 40,
		// minHeight: 1100,
		// overflowX: 'hidden',
	},
	appBarWrapper: {
		display: 'flex',
	},
	appBarPrimary: {
		backgroundColor: '#D1D7DA !important',
		zIndex: theme.zIndex.drawer + 1,
	},
	appBarSecondary: {
		position: 'absolute',
		top: 67,
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
		height: 55,
		width: 55,
	},
	usermenuIcon: {
		marginRight: 10,
	},
	filterButton: {
		color: '#fff !important',
	},
	dimmedButton: {
		color: '#afbdc9 !important'
	},
	footer: {
		width: '100%',
		height: 90,
		backgroundColor: '#525B60',
		paddingLeft: 60,
		paddingTop: 25,
	},
	drawer: {
		flexShrink: 0,
		width: 250,
	},
	drawerPaper: {
		color: '#fff !important',
		backgroundColor: "#525B60 !important",
		width: 250,
	},
	drawerContainer: {
		overflow: 'auto',
	},
	drawerListItem: {
		marginBottom: '10px !important',
	},
	drawerListIcon: {
		minWidth: '40px !important',
	},
	drawerIcon: {
		color: '#fff !important',
		fontSize: '30px !important',
	},
	newContent: {
		background: '#ff9800 !important',
	},
	refreshButton: {
		color: '#ffffff !important',
	},
	currentResultWrapper: {
		display: 'flex',
		alignItems: 'center',
	},
	currentResultArrow: {
		marginLeft: 15,
	},
}));

export default mainStyles;
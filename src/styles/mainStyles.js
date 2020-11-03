import { makeStyles } from '@material-ui/core/styles';

const mainStyles = makeStyles(theme => ({
	root: {
		height: '100vh',
	},
	appBackground: {
		marginTop: 40,
		marginLeft: 40,
		marginRight: 40,
		marginBottom: 40,
		minHeight: 'calc(100vh - 75px - 60px - 90px - 60px)',
		// overflowX: 'hidden',
	},
	appBarWrapper: {
		display: 'flex',
	},
	appBarPrimary: {
		backgroundColor: '#D1D7DA !important',
		zIndex: theme.zIndex.drawer + 1,
		height: 75,
		paddingTop: 5,
	},
	appBarSecondary: {
		backgroundColor: '#214C6F !important',
		width: '100%',
		height: 60,
	},
	menuButton: {
		marginRight: theme.spacing(2),
		color: '#214C6F !important',
	},
	logoContainer: {
		marginRight: theme.spacing(2),
	},
	logo: {
		maxWidth: '80px',
		marginLeft: 20,
	},
	appbarTitle: {
		fontFamily: 'interstateBold !important',
		fontSize: '20px !important',
		flexGrow: 1,
		color: '#214C6F',
		fontWeight: '400 !important',
		paddingLeft: 100,
	},
	search: {
		position: 'relative',
		width: '300px',
		marginRight: '30px',
	},
	searchInput: {
		backgroundColor: '#fff !important'
	},
	searchInputRoot: {
		"& label.Mui-focused": {
			color: "#214c6f"
		},
	},
	notificationsBadge: {
		backgroundColor: '#E54C2A !important',
		color: '#fff !important',
	},
	notificationsIcon: {
		color: '#214C6F !important',
	},
	username: {
		fontFamily: 'Roboto, sans-serif',
		float: 'left',
		color: '#214C6F',
		fontSize: 16,
		marginTop: 18,
		marginLeft: 20,
		userSelect: 'none'
	},
	userimage: {
		float: 'left',
		borderRadius: '50%',
		height: 45,
		width: 45,
	},
	usermenuIcon: {
		marginRight: 10,
	},
	filterButton: {
		color: '#fff !important',
	},
	filterButtonActive: {
		width: 40,
		height: 40,
		marginTop: '10px !important',
		marginRight: '4px !important',
		color: '#fff !important',
		backgroundColor: '#D1D7DA !important',
	},
	dimmedButton: {
		color: '#afbdc9 !important'
	},
	footer: {
		width: '100%',
		height: 90,
		backgroundColor: '#5D6A70',
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
		top: '75px !important',
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
	filterBar: {
		padding: 4,
		paddingLeft: 40,
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		height: 67,
		backgroundColor: '#33434B',
	},
	overviewWelcome: {
		maxWidth: '50%',
		[theme.breakpoints.down('lg')]: {
			maxWidth: '80%',
		},
	},
}));

export default mainStyles;
import { makeStyles } from '@material-ui/core/styles';

const buildingStyles = makeStyles(theme => ({
	card: {
		backgroundColor: '#F5F5F5',
		width: '100%'
	},
	ledgendCurrent: {
		width: 40,
		height: 10,
		backgroundColor: '#377EB8',
		borderRadius: 3,
	},
	ledgendForecast: {
		width: 40,
		height: 10,
		backgroundColor: '#B3CDE3',
		borderRadius: 3,
	},
	legendGoal: {
		width: 40,
		height: 10,
		backgroundColor: '#1F3B54',
		borderRadius: 3,
	},
	legendEl: {
		width: 40,
		height: 10,
		backgroundColor: '#377EB8',
		borderRadius: 3,
	},
	legendHeat: {
		width: 40,
		height: 10,
		backgroundColor: '#1F3B54',
		borderRadius: 3,
	},
	graphScrollArrows: {
		width: '100%',
		height: 50,
	},
	scrollArrowLeft: {
		backgroundColor: '#365979',
		minWidth: 40,
		height: 30,
		marginRight: 20,
		"&:hover": {
			backgroundColor: "#365979"
		}
	},
	scrollArrowRight: {
		backgroundColor: '#365979',
		minWidth: 40,
		height: 30,
		"&:hover": {
			backgroundColor: "#365979"
		}
	},
	scrollArrowDisabled: {
		backgroundColor: '#ccc',
	},
	graphDatePickers: {
		width: '100%',
		height: 50,
	},
	graphRibbon: {
		width: '100%',
		height: 50,
		backgroundColor: '#1F3B54',
		marginTop: 20,
		marginBottom: 20,
	},
	graphRibbonGrid: {
		width: '80%',
		[theme.breakpoints.down('lg')]: {
			width: '95%',
		}
	},
	periodButton: {
		fontFamily: 'interstate',
		border: 'solid 2px #377EB8',
		borderRadius: 4,
		color: '#377EB8',
		marginRight: 15,
		textTransform: 'none',
		"&:hover": {
			backgroundColor: '#377EB8',
			color: '#fff'
		}
	},
	periodButtonActive: {
		border: 'solid 2px #377EB8',
		borderRadius: 4,
		color: '#fff',
		backgroundColor: '#377EB8',
		marginRight: 15,
		textTransform: 'none',
		"&:hover": {
			backgroundColor: '#377EB8',
			color: '#fff'
		}
	},
	graphIconButton: {
		textTransform: 'none',
		width: 210,
	},
	graphIconButtonLabel: {
		flexDirection: 'column'
	},
	graphIconButtonIcon: {
		fontSize: '52px !important',
		height: 40,
	},
	graphIconButtonLabelText: {
		color: '#000',
		fontSize: '1rem',
	},
	forecastgraphwrapper: {
		width: '50%',
		height: '230px',
		margin: '0 auto',
		[theme.breakpoints.down('lg')]: {
			width: '80%',
		}
	},
	forecastgraphlegendwrapper: {
		width: '50%',
		height: '50px',
		margin: '0 auto',
		marginTop: 20,
		marginBottom: 20,
		[theme.breakpoints.down('lg')]: {
			width: '100%',
		}
	},
	energyconsumptiongraphwrapper: {
		width: '50%',
		height: '230px',
		margin: '0 auto',
		[theme.breakpoints.down('lg')]: {
			width: '80%',
		}
	},
	scoregraphwrapper: {
		width: '50%',
		height: '230px',
		margin: '0 auto',
		[theme.breakpoints.down('lg')]: {
			width: '80%',
		}
	},
	detailsPopup: {
		backgroundColor: '#fff',
		padding: 20,
	},
	buildingsMap: {
		width: '100%',
		height: 800,
		[theme.breakpoints.down('lg')]: {
			height: 450,
		}
	},
	thumbsImage: {
		width: 50,
		height: 50,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		borderRadius: '50%',
	},
}));

export default buildingStyles;

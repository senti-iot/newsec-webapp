import { makeStyles } from '@material-ui/core/styles';

const barGraphStyles = makeStyles(theme => ({
	axisText: {
		fill: 'currentColor',
		fontWeight: 600,
		fontSize: '1rem'
	},
	axisTick: {
		fill: 'currentColor',
		fontWeight: 600,
		fontSize: '1rem',
		strokeOpacity: 0
	},
	line: {
		fill: 'none',
		stroke: '#000',
		strokeWidth: '3px',
	},
	legendTotalWrapper: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center'
	},
	legendWrapper: {
		width: 130,
		marginBottom: 10,
		[theme.breakpoints.down('lg')]: {
			width: 115,
		}
	},
	legend1: {
		width: 70,
		height: 10,
		borderRadius: 2,
		backgroundColor: '#214C6F',
		marginBottom: 5,
		[theme.breakpoints.down('lg')]: {
			width: 50,
		}
	},
	legend2: {
		width: 70,
		height: 10,
		borderRadius: 2,
		backgroundColor: '#B3CDE3',
		marginBottom: 5,
		[theme.breakpoints.down('lg')]: {
			width: 50,
		}
	},
	legend3: {
		width: 70,
		height: 10,
		borderRadius: 2,
		backgroundColor: '#497EB3',
		marginBottom: 5,
		[theme.breakpoints.down('lg')]: {
			width: 50,
		}
	},
	legend4: {
		width: 70,
		height: 10,
		borderRadius: 2,
		backgroundColor: '#000000',
		marginBottom: 5,
		[theme.breakpoints.down('lg')]: {
			width: 50,
		}
	},
	legend5: {
		width: 70,
		height: 10,
		// borderRadius: 2,
		// backgroundColor: '#000000',
		borderBottom: 'dashed 10px #000',
		marginBottom: 5,
		[theme.breakpoints.down('lg')]: {
			width: 50,
		}
	},
	legend6: {
		width: 70,
		height: 10,
		borderRadius: 2,
		backgroundColor: '#5D6A70',
		marginBottom: 5,
		[theme.breakpoints.down('lg')]: {
			width: 50,
		}
	},
	legend7: {
		width: 70,
		height: 10,
		borderRadius: 2,
		backgroundColor: '#90999E',
		marginBottom: 5,
		[theme.breakpoints.down('lg')]: {
			width: 50,
		}
	},
	gridline: {
		color: '#C4C4C4',
	}
}));

export default barGraphStyles;

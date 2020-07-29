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
		fontSize: '0.75rem',
		strokeOpacity: 0
	},
	line: {
		fill: 'none',
		stroke: '#000',
		strokeWidth: '2px',
	},
	legendWrapper: {
		width: 130
	},
	legend1: {
		width: 50,
		height: 10,
		borderRadius: 2,
		backgroundColor: '#D48A38',
		marginBottom: 5,
	},
	legend2: {
		width: 50,
		height: 10,
		borderRadius: 2,
		backgroundColor: '#F5D93A',
		marginBottom: 5,
	},
	legend3: {
		width: 50,
		height: 10,
		borderRadius: 2,
		backgroundColor: '#497EB3',
		marginBottom: 5,
	},
	legend4: {
		width: 50,
		height: 10,
		borderRadius: 2,
		backgroundColor: '#000000',
		marginBottom: 5,
	},
	legend5: {
		width: 50,
		height: 10,
		borderRadius: 2,
		backgroundColor: '#8B2979',
		marginBottom: 5,
	},
	gridline: {
		color: '#C4C4C4',
	}
}));

export default barGraphStyles;

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
		fontSize: '0.75rem'
	},
	line: {
		fill: 'none',
		stroke: '#000',
		strokeWidth: '1.5px',
	},
}));

export default barGraphStyles;

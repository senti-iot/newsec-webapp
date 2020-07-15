import { makeStyles } from '@material-ui/core/styles';

const lineGraphStyles = makeStyles(theme => ({
	axis: {
		stroke: 'none'
	},
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
	hiddenMedianLine: {
		stroke: '#fff',
		opacity: 0,
		strokeWidth: '6px'
	},
	medianLine: {
		fill: 'none',
		stroke: 'red',
		strokeWidth: '4px'
	},
}));

export default lineGraphStyles;

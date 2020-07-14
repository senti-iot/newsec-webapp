import { makeStyles } from '@material-ui/core/styles';

const buildingStyles = makeStyles(theme => ({
	card: {
		backgroundColor: '#F5F5F5'
	},
	ledgendCurrent: {
		width: 30,
		height: 10,
		backgroundColor: '#365979',
		borderRadius: 3,
	},
	ledgendForecast: {
		width: 30,
		height: 10,
		backgroundColor: '#C8D0D8',
		borderRadius: 3,
	},
	legendGoal: {
		width: 30,
		height: 10,
		backgroundColor: '#8B2979',
		borderRadius: 3,
	}
}));

export default buildingStyles;

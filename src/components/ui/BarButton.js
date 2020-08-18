import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const BarButton = withStyles(() => ({
	root: {
		fontFamily: 'interstate',
		textTransform: 'none',
		color: '#fff',
		height: 50,
		backgroundColor: 'transparent',
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
}))(Button);

export default BarButton;

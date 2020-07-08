import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const BarButton = withStyles(() => ({
	root: {
		textTransform: 'none',
		color: '#fff',
		backgroundColor: 'transparent',
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
}))(Button);

export default BarButton;

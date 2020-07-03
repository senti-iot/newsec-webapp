import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#497EB3',
		}, secondary: {
			main: '#979797',
		},
	},
	typography: {
		body2: {
			color: '#979797',
			fontSize: '13px',
		},
	},
});

export default theme;

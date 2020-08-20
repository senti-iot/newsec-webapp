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
		h2: {
			fontSize: '3.8rem',
			fontWeight: 'bold',
		},
		h3: {
			fontFamily: 'interstateBold !important',
			fontSize: '1.8rem',
		},
		h4: {
			fontFamily: 'interstateBold !important',
			fontSize: '1.6rem',
		},
		h5: {
			fontFamily: 'interstateLight !important',
			fontSize: '1.2rem',
		},
		h6: {
			fontSize: '1rem',
		},
		body2: {
			color: '#000',
			fontFamily: 'interstateLight !important',
			fontSize: '1.1rem',
		},
	},
});

export default theme;

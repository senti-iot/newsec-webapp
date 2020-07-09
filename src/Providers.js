import React from 'react'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './redux/store'
// import 'assets/css/material-dashboard-react.css?v=1.2.0'
// import 'assets/css/leaflet.css'

// import 'core-js/es/map'
// import 'core-js/es/set'

// import 'core-js/features/set'
// import 'core-js/features/array/find'
// import 'core-js/features/array/includes'
// import 'core-js/features/number/is-nan'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
// import { StylesProvider } from "@material-ui/styles"
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './styles/theme';

// import LocalizationProvider from 'hooks/providers/LocalizationProvider'
// import SnackbarProvider from 'hooks/providers/SnackbarProvider'
// import { ThemeProvider } from 'ThemeProvider'
// import AuthProvider from 'hooks/providers/AuthProvider'
// import Base from './Base'

// var countries = require('i18n-iso-countries')
// countries.registerLocale(require('i18n-iso-countries/langs/en.json'))
// countries.registerLocale(require('i18n-iso-countries/langs/da.json'))

export const store = configureStore()
export const hist = createBrowserHistory()

const Providers = props => {

	return <Provider store={store}>
		<ThemeProvider theme={theme}>
			<CssBaseline>
				<MuiPickersUtilsProvider utils={MomentUtils}>
					{/* <LocalizationProvider>
				<SnackbarProvider>
					<AuthProvider> */}
					<Router history={hist} key={Math.random()}>
						{props.children}
					</Router>
					{/* </AuthProvider>
				</SnackbarProvider>
			</LocalizationProvider> */}
				</MuiPickersUtilsProvider>
			</CssBaseline>

		</ThemeProvider>

	</Provider>

}
export default Providers
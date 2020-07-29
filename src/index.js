import './wdyr';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
// import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
// import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { updateServiceworker } from 'redux/serviceWorkerRedux';

import Providers from './Providers'

const onUpdate = () => {
	store.dispatch(updateServiceworker())
}

serviceWorker.register({ onUpdate: onUpdate });

ReactDOM.render(
	<React.StrictMode>
		<Providers>
			<App />
		</Providers>
	</React.StrictMode>,
	document.getElementById('root')
);

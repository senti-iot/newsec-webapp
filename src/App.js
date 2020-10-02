import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Main from './routes/Main';
import ScrollToTop from 'components/ScrollToTop';

function App() {
	return (
		<Router>
			<ScrollToTop />
			<Main />
		</Router>
	);
}

export default App;

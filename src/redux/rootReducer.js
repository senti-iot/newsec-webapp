// import { settings } from './settings'
// import { localization } from './localization'
// import { favorites } from './favorites'
// import { doi } from './doi'
import { appState } from './appState';
import { demoReducer } from './demo';
import { buildingsReducer } from './buildings';
import { settings } from './settings';
import { dateTime } from './dateTime'
import { lineData } from './lineData'
import { data } from './data'
import { user } from './user'
// import { globalSearch } from './globalSearch'
// import { weather } from './weather'
// import { dsSystem } from './dsSystem'
import { serviceWorkerReducer } from './serviceWorkerRedux'
import { combineReducers } from 'redux';
// import { auth } from './auth'

let reducers = combineReducers({
	// auth,
	// localization,
	// favorites,
	// doi,
	appState,
	demoReducer,
	buildingsReducer,
	settings,
	dateTime,
	lineData,
	data,
	serviceWorkerReducer,
	user,
	// globalSearch,
	// weather,
	// dsSystem,
})
/**
*	 Debugging purposes
**/
// const logger = store => next => action => {
//  console.info('dispatching', action)
// 	let result = next(action)
// 	console.info('next state', store.getState())
// 	return result
// }
const rootReducer = (state, action) => {
	if (action.type === 'RESET_APP') {
		state = undefined;
	}
	return reducers(state, action);
}

export default rootReducer;

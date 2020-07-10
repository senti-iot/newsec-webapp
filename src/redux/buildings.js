import { getBuildingsFromServer, getBuildingFromServer } from '../data/newsecApi';

import { changeHeaderTitle, changeSecondaryBarShown } from './appState';

/**
 * Actions
 * the 'GotDemoData' is used in the switch case inside the reducer to know where to put the dispatched data
 * also 'GetDemoData'/'GotDemoData' will show up in Redux DevTools when it is dispatched
 */
const GetData = 'GetBuildingsData'
const GotData = 'GotBuildingsData'

const GetExtendedData = 'GetBuildingExtendedData'
const GotExtendedData = 'GotBuildingExtendedData'

/**
 * Default dispatch
 */
const gotData = data => ({
	type: GotData,
	payload: data
})

const gotExtendedData = data => ({
	type: GotExtendedData,
	payload: data
})

const setLoading = loading => ({
	type: GetData,
	payload: loading
})

const setLoadingExtended = loading => ({
	type: GetExtendedData,
	payload: loading
})

/**
 * Custom middleware dispatch
 */
export const getBuildings = () =>
	async (dispatch, getState) => {
		dispatch(setLoading(true));
		let data = await getBuildingsFromServer();
		dispatch(gotData(data));
		dispatch(setLoading(false));
	}

export const getBuilding = (uuid) =>
	async (dispatch, getState) => {
		dispatch(setLoadingExtended(true));
		let data = await getBuildingFromServer(uuid);
		dispatch(changeHeaderTitle(data.name));
		dispatch(changeSecondaryBarShown(false));
		dispatch(gotExtendedData(data));
		dispatch(setLoadingExtended(false));
	}

/**
 * Initial state
 */
const initialState = {
	loading: false,
	loadingExtended: false,
	buildings: null,
	building: null,
}

/**
 * The name you give the reducer here will be the same displayed in Redux DevTools
 * Always use Object.assign({}, state, payload)
 */
export const buildingsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GetData:
			return Object.assign({}, state, { loading: payload });
		case GotData:
			return Object.assign({}, state, { buildings: payload });
		case GetExtendedData:
			return Object.assign({}, state, { loadingExtended: payload });
		case GotExtendedData:
			return Object.assign({}, state, { building: payload });
		default:
			return state;
	}
}

/* eslint-disable array-callback-return */
import { getBuildingsFromServer, getBuildingFromServer } from '../data/newsecApi';
import { getBuildingsSum } from '../data/coreApi';
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
const emissionDevices = 'emissionDevices'
const emissionData = 'emissionData'

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

const setEmissionDevices = devices => ({
	type: emissionDevices,
	payload: devices
})

const gotEmissionData = data => ({
	type: emissionData,
	payload: data
})

/**
 * Custom middleware dispatch
 */
export const getBuildings = () =>
	async (dispatch, getState) => {
		dispatch(setLoading(true));
		let data = await getBuildingsFromServer();

		if (data) {
			let emissionDevices = [];
			data.map(building => {
				if (building.devices && building.devices.length) {
					building.devices.map(device => {
						if (device.type === 'emission') {
							emissionDevices.push(device.uuid);
						}
					});
				}
			});

			dispatch(setEmissionDevices(emissionDevices));

			dispatch(gotData(data));
		}

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

export const getBuildingsEmission = (devices, period) =>
	async (dispatch, getState) => {
		let data = await getBuildingsSum(devices, period);
		dispatch(gotEmissionData(data));
	}

/**
 * Initial state
 */
const initialState = {
	loading: false,
	loadingExtended: false,
	buildings: null,
	building: null,
	emissionDevices: null,
	emissionData: null,
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
		case emissionDevices:
			return Object.assign({}, state, { emissionDevices: payload });
		case emissionData:
			return Object.assign({}, state, { emissionData: payload });
		default:
			return state;
	}
}

/* eslint-disable array-callback-return */
import { getBuildingsFromServer, getBuildingFromServer, getBuildingsSum, getBuildingUsage, getBuildingEmissionToDate } from '../data/newsecApi';
import { getDeviceCo2ByYear } from 'data/coreApi';
import { changeHeaderTitle, changeMainView, closeFilterBar } from './appState';
import { handleRequestSort } from 'variables/functions';

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
const energyBarData = 'energyBarData';
const sData = 'sortData';

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

export const sortData = (key, property, order) => {
	return (dispatch, getState) => {
		let data = getState().data[key]
		let sortedData = handleRequestSort(property, order, data)
		let newArr = []
		newArr = sortedData
		dispatch({
			type: sData,
			payload: {
				key,
				sortedData: newArr
			}
		})

	}
}

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
		let building = await getBuildingFromServer(uuid);

		let devices = [];
		if (building.devices && building.devices.length) {
			building.devices.map(device => {
				if (device.type === 'fjernvarme' || device.type === 'vand' || device.type === 'el') {
					devices.push(device.uuid);
				}
			});
		}

		let energyData = await getDeviceCo2ByYear(devices);
		building.energyData = energyData;

		let usageData = await getBuildingUsage(uuid);
		building.usage = usageData;

		let emissionDataToDate = await getBuildingEmissionToDate(uuid);
		building.emissionToDate = emissionDataToDate;

		dispatch(closeFilterBar());
		dispatch(changeMainView(''));
		dispatch(changeHeaderTitle(building.name));
		dispatch(gotExtendedData(building));
		dispatch(setLoadingExtended(false));
	}

export const getBuildingsEmission = (period) =>
	async (dispatch, getState) => {
		let data = await getBuildingsSum(period);
		dispatch(gotEmissionData(data));
	}

export const getEnergyDataByYear = (devices) => {
	return async (dispatch) => {
		let data = await getDeviceCo2ByYear(devices);
		if (data) {
			dispatch({
				type: energyBarData,
				payload: data
			});
		}
	}
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
	energyBarData: null,
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
		case sData:
			return Object.assign({}, state, { [payload.key]: payload.sortedData })
		default:
			return state;
	}
}

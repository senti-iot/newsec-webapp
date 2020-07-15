// import moment from 'moment'

import { getDeviceDataFromServer } from '../data/coreApi';

const GetDeviceData = 'GetDeviceData'
const GotDeviceData = 'GotDeviceData'

const gotData = data => ({
	type: GotDeviceData,
	payload: data
})

const setLoading = loading => ({
	type: GetDeviceData,
	payload: loading
})

export const getDeviceData = (device, period, type) =>
	async (dispatch, getState) => {
		dispatch(setLoading(true));
		let data = await getDeviceDataFromServer(device, period, type);
		let convertedData = [];

		// eslint-disable-next-line array-callback-return
		Object.keys(data).map(date => {
			convertedData.push({ value: data[date], date: date });
		});

		dispatch(gotData(convertedData));
		dispatch(setLoading(false));
	}

const initialState = {
	data: null,
	loading: false,
}

export const lineData = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'RESET_APP':
			return initialState
		case GetDeviceData:
			return Object.assign({}, state, { loading: payload });
		case GotDeviceData:
			console.log(payload);
			return Object.assign({}, state, { data: payload });
		default:
			return state
	}
}

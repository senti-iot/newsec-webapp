import moment from 'moment'

import { getDeviceDataFromServer } from '../data/coreApi';

const GetDeviceData = 'GetDeviceData'
const GotDeviceData = 'GotDeviceData'

const gotData = data => ({
	type: GetDeviceData,
	payload: data
})

const setLoading = loading => ({
	type: GotDeviceData,
	payload: loading
})

export const getDeviceData = (device, period, type) =>
	async (dispatch, getState) => {
		dispatch(setLoading(true));
		let data = await getDeviceDataFromServer(device, period, type);
		dispatch(gotData(data));
		dispatch(setLoading(false));
	}

const initialState = {
	data: []
}

export const lineData = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'RESET_APP':
			return initialState
		case GetDeviceData:
			return Object.assign({}, state, { loading: payload });
		case GotDeviceData:
			return Object.assign({}, state, { data: payload });
		default:
			return state
	}
}

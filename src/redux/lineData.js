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
		let line = {
			graph: [
				{
					name: "Actual",
					color: '#365979',
					data: convertedData,
					noArea: true
				}, {
					name: "Goal",
					color: "purple",
					data: convertedData.map(v => ({ value: 0.15, date: v.date })), //You'll need to make all the values the average
					noArea: true,
					dashed: true,
					median: false,
				}, {
					name: "PreviousPeriod",
					color: '#005500',
					median: false,
					// prev: true,
					data: convertedData.map(v => ({ value: v.value * Math.random() + 0.1, date: v.date }))
					//This one sucks because you need to set the dates to "match" the dates from "this week" or you'll end up having a split graph
				},
				{
					name: "Benchmark",
					color: "red",
					dashed: true,
					median: false,
					noArea: true,
					data: convertedData.map(v => ({ value: v.value * Math.random(), date: v.date }))
				}]
		}
		dispatch(gotData(line));
		dispatch(setLoading(false));
	}

const initialState = {
	graph: [{
		name: "Data",
		color: '#365979',
		data: []
	}],
	loading: true,
}

export const lineData = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'RESET_APP':
			return initialState
		case GetDeviceData:
			return Object.assign({}, state, { loading: payload });
		case GotDeviceData:
			// console.log(payload);
			return Object.assign({}, state, { ...state, ...payload });
		default:
			return state
	}
}

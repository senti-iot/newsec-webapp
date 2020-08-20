/* eslint-disable array-callback-return */
import moment from 'moment';

import { getDeviceDataFromServer } from '../data/coreApi';
import { getWeather } from 'data/weather';
import { getBuindingsBenchmark } from 'data/newsecApi';
import { getDates } from 'data/functions';

const GetDeviceData = 'GetDeviceData'
const GotDeviceData = 'GotDeviceData'
const wData = 'weatherData'

const gotData = data => ({
	type: GotDeviceData,
	payload: data
})

const setLoading = loading => ({
	type: GetDeviceData,
	payload: loading
})

export const getDeviceData = (device, building, period, type) =>
	async (dispatch, getState) => {
		dispatch(setLoading(true));

		let previousPeriod = { ...period };
		let prevDaysToAdd = 0;
		if (period.menuId === 2) {
			previousPeriod.from = moment(period.from).subtract(7, 'day').startOf('day');
			previousPeriod.to = moment(period.to).subtract(7, 'day').startOf('day');
			prevDaysToAdd = 7;
		} else if (period.menuId === 4) {
			previousPeriod.from = moment(period.from).subtract(30, 'day').startOf('day');
			previousPeriod.to = moment(period.to).subtract(30, 'day').startOf('day');
			prevDaysToAdd = 30
		} else if (period.menuId === 7) {
			previousPeriod.from = moment(period.from).subtract(365, 'day').startOf('day');
			previousPeriod.to = moment(period.to).subtract(365, 'day').startOf('day');
			prevDaysToAdd = 365;
		}

		let benchmarkData = await getBuindingsBenchmark(period);
		let budgetData = await getDeviceDataFromServer(device, period, 'co2Budget');
		let data = await getDeviceDataFromServer(device, period, type);
		let dataPreviousPeriod = await getDeviceDataFromServer(device, previousPeriod, type);

		let convertedBudgetData = [];
		Object.keys(budgetData).map(date => {
			convertedBudgetData.push({ value: budgetData[date], date: date });
		});

		let convertedData = [];
		Object.keys(data).map(date => {
			convertedData.push({ value: data[date], date: date });
		});
		// console.log(convertedData);

		let convertedDataPrevious = [];
		Object.keys(dataPreviousPeriod).map(date => {
			convertedDataPrevious.push({ value: dataPreviousPeriod[date], date: moment(date).add(prevDaysToAdd, 'day').format('YYYY-MM-DD HH:mm:ss') });
		});
		// console.log(convertedDataPrevious);

		let line = {
			graph: [
				{
					name: "Actual",
					color: '#497EB3',
					data: convertedData,
					noArea: true
				}, {
					name: "Goal",
					color: "#1F3B54",
					data: convertedBudgetData,
					noArea: true,
					dashed: true,
					median: false,
				}, {
					name: "PreviousPeriod",
					color: '#B3CDE3',
					median: false,
					prev: true,
					data: convertedDataPrevious
				},
				{
					name: "Benchmark",
					color: "#377EB8",
					dashed: true,
					median: false,
					noArea: true,
					data: benchmarkData
				}]
		}

		dispatch(gotData(line));
		dispatch(setLoading(false));
	}

export const getWeatherData = async (lat, lon) => {
	return async (dispatch, getState) => {
		let from = getState().dateTime.period.from.clone()
		let to = getState().dateTime.period.to.clone()
		let dates = getDates(from, to)
		let timeType = getState().dateTime.period.timeType
		if (lat && lon) {
			let weather = await Promise.all(dates.map((d) => getWeather(d, lat, lon))).then(rs => rs)
			let fWeather = []
			if (timeType > 1) {
				fWeather = weather.map(r => r.daily.data[0])
			} else {
				fWeather = weather[0]?.hourly?.data
			}
			let finalData = fWeather.map(w => ({
				date: moment(w.time),
				icon: w.icon,
				description: w.summary
			}))
			dispatch({
				type: wData,
				payload: finalData
			})
		} else {
			dispatch({
				type: wData,
				payload: []
			})
		}
	}
}

const initialState = {
	graph: [{
		name: "Data",
		color: '#214C6F',
		data: []
	}],
	weatherData: [],
	loading: true,
}

export const lineData = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'RESET_APP':
			return initialState
		case wData:
			return Object.assign({}, state, { weatherData: payload });
		case GetDeviceData:
			return Object.assign({}, state, { loading: payload });
		case GotDeviceData:
			// console.log(payload);
			return Object.assign({}, state, { ...state, ...payload });
		default:
			return state
	}
}

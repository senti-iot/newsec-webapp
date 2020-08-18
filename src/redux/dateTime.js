import moment from 'moment'

const changePeriods = 'changeDate'
const GetSettings = 'getSettings'
const NOSETTINGS = 'noSettings'
const changeBenchmarkPeriod = 'changeBenchmarkPeriod'

// const GetSettings = 'getSettings'

/**
 * TimeType = type of ticks for the Chart
 * 0 - Minutes
 * 1 - Hours
 * 2 - Days
 * 3 - Months
 */
// const removePeriod = 'chartRemovePeriod'

export const changeDate = (menuId, to, from, timeType) => {
	return (dispatch) => {
		let period = {
			menuId, to, from, timeType
		}
		dispatch({
			type: changePeriods,
			payload: period
		})
	}
}

export const changeBenchmarkDate = (to, from) => {
	return (dispatch) => {
		let period = {
			to, from
		}

		dispatch({
			type: changeBenchmarkPeriod,
			payload: period
		});
	}
}

const initialState = {
	period: {
		menuId: 2,
		from: moment().subtract(7, 'day').startOf('day'),
		to: moment().subtract(1, 'day').startOf('day'),
		timeType: 2
	},
	benchmarkPeriod: {
		from: moment().startOf('year'),
		to: moment().endOf('year'),
	},
}

export const dateTime = (state = initialState, action) => {
	switch (action.type) {
		case 'RESET_APP':
			return initialState
		case GetSettings:
		case NOSETTINGS:
			if (!state.period.to && !state.period.from)
				return Object.assign({}, state, {
					period: {
						menuId: 2,
						from: moment().subtract(7, 'day').startOf('day'),
						to: moment().subtract(1, 'day').startOf('day'),
						timeType: 2
					},
				})
			return state
		case changePeriods:
			return Object.assign({}, state, { period: action.payload })
		case changeBenchmarkPeriod:
			return Object.assign({}, state, { benchmarkPeriod: action.payload })
		default:
			return state
	}
}

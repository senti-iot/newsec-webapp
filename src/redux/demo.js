import { getDemoDataFromServer } from '../data/demo'


/**
 * Actions
 * the 'GotDemoData' is used in the switch case inside the reducer to know where to put the dispatched data
 * also 'GetDemoData'/'GotDemoData' will show up in Redux DevTools when it is dispatched
 */
const GetData = 'GetDemoData'
const GotData = 'GotDemoData'

/**
 * Default dispatch
 */
const gotData = data => ({
	type: GotData,
	payload: data
})
const setLoading = loading => ({
	type: GetData,
	payload: loading
})

/**
 * Custom middleware dispatch
 */
export const getDemoData = () =>
	async (dispatch, getState) => {
		dispatch(setLoading(true))
		let data = await getDemoDataFromServer()
		dispatch(gotData(data))
		dispatch(setLoading(false))
	}
/**
 * Initial state
 */
const initialState = {
	loading: false,
	posts: null
}

/**
 * The name you give the reducer here will be the same displayed in Redux DevTools
 * Always use Object.assign({}, state, payload)
 */
export const demoReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GetData:
			return Object.assign({}, state, { loading: payload })
		case GotData:
			return Object.assign({}, state, { posts: payload })

		default:
			return state
	}
}

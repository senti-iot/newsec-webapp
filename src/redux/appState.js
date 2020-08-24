const updateFilters = 'updateFilters'
const changeTRP = 'changeTableRows'
const changeMT = 'changeMapTheme'
const changeCT = 'changeChartType'
const changeHM = 'changeHeatMap'
const changeYAXIS = 'changeYAxis'
const changeCPP = 'changeCardsPerPage'
const changeEventHandler = 'changeEH'
const changeSM = 'changeSmallmenu'
const changeT = 'changeTabs'
const getSettings = 'getSettings'
const changeHeaderTitleAction = 'changeHeaderTitle'
const changeSecondaryBarAction = 'changeSecondaryBarAction'
const fsLG = 'fullScreenLineGraph'
const setLines = 'setGraphLines'
const mainViewChange = 'mainViewChange'
const filterBarChange = 'filterBarChange'
const filterIconChange = 'filterIconChange'

export const changeMainView = data => ({
	type: mainViewChange,
	payload: data
});

export const setGraphLines = (state) => {
	return {
		type: setLines,
		payload: state
	}
}

export const setGraphLine = (id, value) => {
	return (dispatch, getState) => {
		let lState = { ...getState().appState.lines }

		lState[id] = value
		dispatch({
			type: setLines,
			payload: lState
		})
	}
}

export const changeSmallMenu = (val) => {
	return dispatch => {
		dispatch({
			type: changeSM,
			smallMenu: val
		})
	}
}
export const changeEH = (bool) => {
	return dispatch => {
		dispatch({ type: changeEventHandler, EH: bool })
	}
}
export const changeCardsPerPage = (val) => {
	return (dispatch) => {
		dispatch({ type: changeCPP, CPP: val })
	}
}
export const changeYAxis = (val) => {
	return (dispatch) => {
		dispatch({ type: changeYAXIS, chartYAxis: val })
	}
}
export const changeHeatMap = (val) => {
	return (dispatch) => {
		dispatch({ type: changeHM, heatMap: val })
	}
}
export const changeChartType = (val) => {
	return (dispatch) => {
		dispatch({ type: changeCT, chartType: val })
	}
}
export const changeMapTheme = (val) => {
	return (dispatch) => {
		dispatch({ type: changeMT, mapTheme: val })
	}
}

export const changeTableRows = (val) => {
	return (dispatch, getState) => {
		let trp = val
		if (val.toString().includes('auto')) {
			let height = window.innerHeight
			let rows = Math.round((height - 70 - 48 - 30 - 64 - 56 - 30 - 56 - 30) / 49)
			trp = rows
			dispatch({ type: 'autoRowsPerPage', payload: trp })
		}
		dispatch({ type: changeTRP, trp: trp, trpStr: val })
	}
}

export const addFilter = (f, type) => {
	return (dispatch, getState) => {
		let filters = []
		filters = [...getState().appState.filters[type]]
		let id = filters.length
		filters.push({ ...f, id })
		dispatch({
			type: updateFilters,
			filters: {
				[type]: filters
			}
		})
		return id
	}
}
export const editFilter = (f, type) => {
	return (dispatch, getState) => {
		let filters = []

		filters = [...getState().appState.filters[type]]
		let filterIndex = filters.findIndex(fi => fi.id === f.id)
		filters[filterIndex] = f
		dispatch({
			type: updateFilters,
			filters: {
				[type]: filters
			}
		})
	}
}
export const removeFilter = (f, type) => {
	return (dispatch, getState) => {
		let filters = []
		filters = [...getState().appState.filters[type]]

		filters = filters.filter(filter => {
			return filter.id !== f.id
		})
		dispatch({
			type: updateFilters,
			filters: {
				[type]: filters
			}
		})
	}
}
export const changeTabs = tabs => {
	return dispatch => {
		dispatch({
			type: changeT,
			tabs: tabs
		})
	}
}

export const changeHeaderTitle = (val) => {
	return (dispatch) => {
		dispatch({
			type: changeHeaderTitleAction,
			headerTitle: val
		})
	}
}

export const changeSecondaryBarShown = (val) => {
	return (dispatch) => {
		dispatch({
			type: changeSecondaryBarAction,
			secondaryBarVisible: val
		})
	}
}

export const closeFilterBar = () => {
	return (dispatch, getState) => {
		dispatch({
			type: filterBarChange,
			payload: false
		})
	}
}

export const toogleFilterBar = () => {
	return (dispatch, getState) => {
		dispatch({
			type: filterBarChange,
			payload: getState().appState.filterBarShown ? false : true
		})
	}
}

export const toogleFilterIcon = value => {
	return (dispatch, getState) => {
		dispatch({
			type: filterIconChange,
			payload: value
		})
	}
}

const initialState = {
	lines: {},
	fullScreenLineChart: false,
	tabs: {
		id: '',
		route: 0,
		data: [],
		tabs: [],
	},
	eH: true,
	CPP: 9,
	chartYAxis: 'linear',
	trpStr: null,
	heatMap: false,
	chartType: null,
	mapTheme: null,
	smallMenu: true,
	trp: null,
	filters: {
		buildings: [],
		tokens: [],
		favorites: [],
		projects: [],
		devices: [],
		collections: [],
		orgs: [],
		users: [],
		registries: [],
		devicetypes: [],
		sensors: [],
		functions: [],
		messages: [],
	},
	headerTitle: 'Benchmark',
	secondaryBarVisible: true,
	mainView: 'overview',
	filterBarShown: false,
	filterIconShown: false,
}

export const appState = (state = initialState, action) => {
	switch (action.type) {
		case changeT:
			return Object.assign({}, state, { tabs: action.tabs })
		case getSettings:
			return Object.assign({}, state, { smallMenu: action.settings.drawerState !== undefined ? action.settings.drawerState : true })
		case changeSM:
			return Object.assign({}, state, { smallMenu: action.smallMenu })
		case changeEventHandler:
			return Object.assign({}, state, { EH: action.EH })
		case changeCPP:
			return Object.assign({}, state, { CPP: action.CPP })
		case changeYAXIS:
			return Object.assign({}, state, { chartYAxis: action.chartYAxis })
		case changeHM:
			return Object.assign({}, state, { heatMap: action.heatMap })
		case changeCT:
			return Object.assign({}, state, { chartType: action.chartType })
		case changeMT:
			return Object.assign({}, state, { mapTheme: action.mapTheme })
		case changeTRP:
			return Object.assign({}, state, { trp: action.trp })
		case updateFilters:
			return Object.assign({}, state, { filters: { ...state.filters, ...action.filters } })
		case changeHeaderTitleAction:
			return Object.assign({}, state, { headerTitle: action.headerTitle })
		case changeSecondaryBarAction:
			return Object.assign({}, state, { secondaryBarVisible: action.secondaryBarVisible })
		case setLines:
			return Object.assign({}, state, { lines: action.payload })
		case fsLG:
			return Object.assign({}, state, { fullScreenLineChart: action.payload })
		case mainViewChange:
			return Object.assign({}, state, { mainView: action.payload })
		case filterBarChange:
			return Object.assign({}, state, { filterBarShown: action.payload })
		case filterIconChange:
			return Object.assign({}, state, { filterIconShown: action.payload })
		default:
			return state
	}
}

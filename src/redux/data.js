import { getDeviceCo2ByYear } from 'data/coreApi';

const energyBarData = 'energyBarData';

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

const initialState = {
	energyBarData: null,
}

export const data = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'RESET_APP':
			return initialState;
		case energyBarData:
			return Object.assign({}, state, { energyBarData: payload })
		default:
			return state;
	}
}

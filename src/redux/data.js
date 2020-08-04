import { getDeviceCo2ByYear } from 'data/coreApi';
import { getBuindingsScore } from 'data/newsecApi';

const energyBarData = 'energyBarData';
const buildingsScoreData = 'buildingsScoreData';

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

export const getbuildingsScore = () => {
	return async (dispatch) => {
		let data = await getBuindingsScore();
		if (data) {
			dispatch({
				type: buildingsScoreData,
				payload: data
			});
		}
	}
}

const initialState = {
	energyBarData: null,
	buildingsScoreData: null,
}

export const data = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'RESET_APP':
			return initialState;
		case energyBarData:
			return Object.assign({}, state, { energyBarData: payload })
		case buildingsScoreData:
			return Object.assign({}, state, { buildingsScoreData: payload })
		default:
			return state;
	}
}

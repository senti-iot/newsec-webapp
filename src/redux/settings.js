import { putUserInternal } from 'data/coreApi';

const autoRowsPerPage = 'autoRowsPerPage';
const TRP = 'tableRowsPerPage';
const SaveSettings = 'saveSettings';

export const saveSettingsOnServ = () => {
	return async (dispatch, getState) => {
		let user = getState().user.user;
		let s = getState().settings;
		let internal = user.internal || {};
		internal.newsec = internal.newsec || {};
		internal.newsec.settings = {
			trp: s.trp,
		};

		var saved = await putUserInternal(user.uuid, internal);
		dispatch({
			type: SaveSettings,
			saved: saved ? true : false
		});
	}
}

export const getSettings = () => {
	return async (dispatch, getState) => {
		let user = getState().user.user;
		let internal = user.internal || {};
		internal.newsec = internal.newsec || {};

		if (internal.newsec.settings.trp) {
			dispatch({
				type: TRP,
				nr: internal.newsec.settings.trp
			});
		}
	}
}

export const changeTRP = (nr) => {
	return async (dispatch, getState) => {
		dispatch({
			type: TRP,
			nr: nr
		});
		dispatch(saveSettingsOnServ());
	}
}

let initialState = {
	rowsPerPageOptions: [5, 10, 15, 20, 25, 50, 100],
	trp: 10,
};

export const settings = (state = initialState, action) => {
	switch (action.type) {
		case autoRowsPerPage:
			let newRowsPerPage = [...initialState.rowsPerPageOptions];
			newRowsPerPage[0] = action.payload;
			return Object.assign({}, state, { rowsPerPageOptions: [...newRowsPerPage] });
		case SaveSettings:
			return Object.assign({}, state, { saved: action.saved });
		case TRP:
			return Object.assign({}, state, { trp: action.nr });
		default:
			return state;
	}
}

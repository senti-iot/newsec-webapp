import cookie from 'react-cookies';
import moment from 'moment';

import { getUser, getAuth, getUsers, getOrgs, putUserInternal } from 'data/coreApi';

const setData = 'setUserData';
const setFavoritesData = 'setFavoritesData';
const setUsersData = 'setUsersData';
const setOrgsData = 'setOrgsData';
const setLoadingData = 'setLoadingData';
// const GETFAVS = 'getFavorites';
const SAVEFAVORITES = 'saveFavorites';

export const getUserData = () => {
	return async (dispatch) => {
		var sessionCookie = cookie.load('SESSION') ? cookie.load('SESSION') : null;
		if (sessionCookie) {
			let authStatus = await getAuth().then(rs => rs.status);

			if (authStatus === 200) {
				let exp = moment().add('1', 'day');
				cookie.save('SESSION', sessionCookie, { path: '/', expires: exp.toDate() });

				let userData = await getUser();

				if (userData) {
					dispatch({
						type: setData,
						payload: userData
					});

					if (userData.internal && userData.internal.newsec && userData.internal.newsec.favorites) {
						dispatch({
							type: setFavoritesData,
							payload: userData.internal.newsec.favorites
						});
					}
				}
			} else {
				return cookie.remove('SESSION');
			}
		}
	};
}

export const setFavorites = favorites => {
	return async (dispatch) => {
		dispatch({
			type: setFavoritesData,
			payload: favorites
		});
	}
}

export const getUsersData = () => {
	return async (dispatch) => {
		dispatch(setLoading(true));

		let usersData = await getUsers();
		if (usersData) {
			dispatch({
				type: setUsersData,
				payload: usersData
			});
		}

		dispatch(setLoading(false));
	};
}

export const getOrgsData = () => {
	return async (dispatch) => {
		dispatch(setLoading(true));

		let orgsData = await getOrgs();

		if (orgsData) {
			dispatch({
				type: setOrgsData,
				payload: orgsData
			});
		}

		dispatch(setLoading(false));
	};
}

const setLoading = loading => ({
	type: setLoadingData,
	payload: loading
})

export const isFav = (obj) => {
	return (dispatch, getState) => {
		let favs = getState().user.favorites;
		if (favs.findIndex(f => f.uuid === obj.uuid && f.type === obj.type) > -1) {
			return true;
		} else {
			return false;
		}
	}
}

export const removeFromFav = (obj, noConfirm) => {
	return async (dispatch, getState) => {
		let favs = getState().user.favorites;
		favs = favs.filter(f => f.uuid !== obj.uuid);
		dispatch({
			type: setFavoritesData,
			payload: favs
		});
		dispatch(saveFavorites(noConfirm));
	}
}
export const addToFav = (obj, noConfirm) => {
	return async (dispatch, getState) => {
		let favs = getState().user.favorites || [];
		favs.push(obj);
		dispatch({
			type: setFavoritesData,
			payload: favs
		});
		dispatch(saveFavorites(noConfirm));
	}
}

const saveFavorites = (noConfirm) => {
	return async (dispatch, getState) => {
		let user = getState().user.user;
		let f = getState().user.favorites;
		let internal = user.internal || {};
		internal.newsec = internal.newsec || {};
		internal.newsec.favorites = f || [];

		let saved = await putUserInternal(user.uuid, internal);
		dispatch({
			type: SAVEFAVORITES,
			payload: noConfirm ? false : saved ? true : false
		})
	}
}

const initialState = {
	loading: false,
	user: null,
	favorites: null,
	users: null,
	orgs: null,
}

export const user = (state = initialState, { type, payload }) => {
	switch (type) {
		case setData:
			return Object.assign({}, state, { user: payload });
		case setFavoritesData:
			return Object.assign({}, state, { favorites: payload });
		case setUsersData:
			return Object.assign({}, state, { users: payload });
		case setOrgsData:
			return Object.assign({}, state, { orgs: payload });
		case setLoadingData:
			return Object.assign({}, state, { loading: payload });
		// case GETFAVS:
		// 	return Object.assign({}, state, { ...action.favorites })
		case SAVEFAVORITES:
			return Object.assign({}, state, { saved: payload })
		default:
			return state;
	}
}

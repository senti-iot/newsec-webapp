import cookie from 'react-cookies';
import moment from 'moment';

import { getUser, getAuth } from '../data/coreApi';

const setData = 'setUserData';
const setFavoritesData = 'setFavoritesData';

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

const initialState = {
	user: null,
	favorites: [],
}

export const user = (state = initialState, { type, payload }) => {
	switch (type) {
		case setData:
			return Object.assign({}, state, { user: payload });
		case setFavoritesData:
			return Object.assign({}, state, { favorites: payload });
		default:
			return state;
	}
}

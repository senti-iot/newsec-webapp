import cookie from 'react-cookies';
import moment from 'moment';

import { getUser, getAuth, getUsers, getOrgs } from 'data/coreApi';

const setData = 'setUserData';
const setFavoritesData = 'setFavoritesData';
const setUsersData = 'setUsersData';
const setOrgsData = 'setOrgsData';
const setLoadingData = 'setLoadingData';

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
		console.log(orgsData);
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
		default:
			return state;
	}
}

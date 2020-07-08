import { coreApi } from './api';

/**
 *
 * @param {String} username
 * @param {String} password
 */
export const loginUser = async (username, password) => {
	const session = await coreApi.post('/v2/auth/basic', JSON.stringify({ username: username, password: password })).then(rs => rs.data);
	return session;
}

export const getUser = async () => {
	var data = await coreApi.get('/v2/auth/user').then(rs => rs.data);
	return data;
}

export const getAuth = async () => {
	var data = await coreApi.get(`/v2/auth`).then(rs => rs);
	return data;
}

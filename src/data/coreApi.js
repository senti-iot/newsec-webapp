import { coreApi } from './api';

/**
 *
 * @param {String} username
 * @param {String} password
 */
export const loginUser = async (username, password) => {
	const session = await coreApi.post('/v2/auth', JSON.stringify({ username: username, password: password })).then(rs => rs.data);
	return session;
}
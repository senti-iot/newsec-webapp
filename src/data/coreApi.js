import cookie from 'react-cookies';

import { coreApi, databrokerApi } from './api';

export const loginUser = async (username, password) => {
	const session = await coreApi.post('/v2/auth/basic', JSON.stringify({ username: username, password: password })).then(rs => rs.data);
	return session;
}

export const logoutUser = async () => {
	var session = cookie.load('SESSION');
	var data = await coreApi.delete('/v2/auth/' + session.token);
	cookie.remove('SESSION');
	return data;
}

export const getUser = async () => {
	var data = await coreApi.get('/v2/auth/user').then(rs => rs.data);
	return data;
}

export const getAuth = async () => {
	var data = await coreApi.get(`/v2/auth`).then(rs => rs);
	return data;
}

export const getDeviceDataFromServer = async (device, period, type) => {
	var data = await databrokerApi.get('/v1/devicedata-clean/' + device + '/' + period.from.format('YYYY-MM-DD HH:mm:ss') + '/' + period.to.format('YYYY-MM-DD HH:mm:ss') + '/' + type + '/-1').then(rs => rs.data);
	return data;
}

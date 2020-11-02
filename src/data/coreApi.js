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

export const resetPassword = async (email) => {
	let response = await coreApi.post(`/v2/entity/user/forgotpassword`, { email: email }).then(rs => rs);
	return response.status;
}

export const getUser = async () => {
	var data = await coreApi.get('/v2/auth/user').then(rs => rs.data);
	return data;
}

export const getUsers = async () => {
	var data = await coreApi.get('/v2/entity/users').then(rs => rs.data);
	return data;
}

export const getUsersInOrg = async (uuid) => {
	var data = await coreApi.get('/v2/entity/users/' + uuid).then(rs => rs.data);
	return data;
}

export const getOrgs = async () => {
	var data = await coreApi.get('/v2/entity/organisations').then(rs => rs.data);
	return data;
}

export const putUserInternal = async (uuid, userData) => {
	var data = await coreApi.put('/v2/entity/user/' + uuid + '/internal', userData).then(rs => rs.data);
	return data;
}

export const getAuth = async () => {
	var data = await coreApi.get(`/v2/auth`).then(rs => rs);
	return data;
}

export const getDeviceCo2ByYear = async (devices) => {
	var data = await databrokerApi.post('/v2/newsec/deviceco2byyear', devices).then(rs => rs.data);
	return data;
}

import { newsecApi } from './api';

export const getBuildingsFromServer = async () => {
	var data = await newsecApi.get('/buildings').then(rs => rs.data);
	return data;
}

export const getBuildingFromServer = async (uuid) => {
	var data = await newsecApi.get('/building/' + uuid).then(rs => rs.data);
	return data;
}

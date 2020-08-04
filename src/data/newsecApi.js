import { newsecApi } from './api';

export const getBuildingsFromServer = async () => {
	var data = await newsecApi.get('/buildings').then(rs => rs.data);
	return data;
}

export const getBuildingFromServer = async (uuid) => {
	var data = await newsecApi.get('/building/' + uuid).then(rs => rs.data);
	return data;
}

export const getBuildingsSum = async (period) => {
	var data = await newsecApi.get('/data/buildingssum/' + period.from.format('YYYY-MM-DD') + '/' + period.to.format('YYYY-MM-DD')).then(rs => rs.data);
	return data;
}

export const getBuindingsBenchmark = async (period) => {
	var data = await newsecApi.get('/data/buildingbenchmark/' + period.from.format('YYYY-MM-DD') + '/' + period.to.format('YYYY-MM-DD')).then(rs => rs.data);
	return data;
}

import { newsecApi } from './api';

export const getBuildingsFromServer = async () => {
	let data = await newsecApi.get('/buildings').then(rs => rs.data);
	return data;
}

export const getBuildingFromServer = async (uuid) => {
	let data = await newsecApi.get('/building/' + uuid).then(rs => rs.data);
	return data;
}

export const getBuildingsSum = async (period) => {
	// console.log('/data/buildingssum/' + period.from.format('YYYY-MM-DD') + '/' + period.to.format('YYYY-MM-DD'));
	let data = await newsecApi.get('/data/buildingssum/' + period.from.format('YYYY-MM-DD') + '/' + period.to.format('YYYY-MM-DD')).then(rs => rs.data);
	return data;
}

export const getBuindingsBenchmark = async (period) => {
	// console.log('/data/buildingbenchmark/' + period.from.format('YYYY-MM-DD') + '/' + period.to.format('YYYY-MM-DD'));
	let data = await newsecApi.get('/data/buildingbenchmark/' + period.from.format('YYYY-MM-DD') + '/' + period.to.format('YYYY-MM-DD')).then(rs => rs.data);
	return data;
}

export const getBuindingsScore = async () => {
	let data = await newsecApi.get('/buildings/averageco2score').then(rs => rs.data);
	return data;
}

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

export const getDeviceDataFromServer = async (device, period, type) => {
	// console.log('/v1/devicedata-clean/' + device + '/' + period.from.format('YYYY-MM-DD HH:mm:ss') + '/' + period.to.format('YYYY-MM-DD HH:mm:ss') + '/' + type + '/-1');
	// var data = await databrokerApi.get('/v1/devicedata-clean/' + device + '/' + period.from.format('YYYY-MM-DD HH:mm:ss') + '/' + period.to.format('YYYY-MM-DD HH:mm:ss') + '/' + type + '/-1').then(rs => rs.data);
	var data = await newsecApi.get('/data/deviceemission/' + device + '/' + type + '/' + period.from.format('YYYY-MM-DD') + '/' + period.to.format('YYYY-MM-DD')).then(rs => rs.data);
	return data;
}

export const getDeviceEmissionStatsFromServer = async (device, period, type) => {
	var data = await newsecApi.get('/data/deviceemissionstats/' + device + '/' + type + '/' + period.from.format('YYYY-MM-DD') + '/' + period.to.format('YYYY-MM-DD')).then(rs => rs.data);
	return data;
}

export const getBuildingImage = async (uuid, filename) => {
	var data = await newsecApi.get('/building/' + uuid + '/image/' + filename).then(rs => rs.data);
	return data;
}

export const getBuildingImageWithSize = async (uuid, filename, size) => {
	var data = await newsecApi.get('/building/' + uuid + '/image/' + filename + '/' + size).then(rs => rs.data);
	return data;
}

export const getBuildingUsage = async (uuid) => {
	var data = await newsecApi.get('/data/buildingusage/' + uuid).then(rs => rs.data);
	return data;
}

export const getBuildingEmissionToDate = async (uuid) => {
	var data = await newsecApi.get('/data/buildingemissiontodate/' + uuid).then(rs => rs.data);
	return data;
}

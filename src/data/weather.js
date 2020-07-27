import moment from 'moment';

import { weatherApi } from 'data/api';

export const getWeather = async (date, lat, long) => {
	let startDate = moment(date).format('YYYY-MM-DDTHH:mm:ss');
	let response = await weatherApi.get(`${startDate}/${lat}/${long}/da`).then(rs => rs.ok ? rs.data : rs.ok);
	return response;
}
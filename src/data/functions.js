import moment from 'moment';

export const getDates = (startDate, stopDate) => {
	var dateArray = [];
	var currentDate = moment(startDate);
	var endDate = moment(stopDate);
	while (currentDate <= endDate) {
		dateArray.push(moment(currentDate).format('YYYY-MM-DD'));
		currentDate = moment(currentDate).add(1, 'days');
	}

	return dateArray;
}

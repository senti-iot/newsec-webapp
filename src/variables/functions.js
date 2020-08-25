import moment from 'moment'
import _ from 'lodash'

/**
 * Date Time Formatter
 * @param {Date} date
 * @param {boolean} withSeconds
 */
export const dateTimeFormatter = (date, withSeconds) => {
	var dt
	if (withSeconds)
		dt = moment(date).format('DD MMMM YYYY HH:mm:ss')
	else
		dt = moment(date).format('lll')
	return dt
}

/**
 * Date Formatter 'LL' format
 * @param {Date} date
 */
export const dateFormatter = (date) => {
	var a = moment(date).format('LL')
	return a
}

export const groupTypeLabel = grouptype => {
	let label;
	if (grouptype === 'Gruppe 1') {
		label = 'Gruppe 1 - Boliger';
	} else if (grouptype === 'Gruppe 2') {
		label = 'Gruppe 2 - Boliger og Erhverv';
	} else if (grouptype === 'Gruppe 3') {
		label = 'Gruppe 3 - Erhverv med ventilation og med køl';
	} else if (grouptype === 'Gruppe 4') {
		label = 'Gruppe 4 - Erhverv med ventilation og uden køl';
	} else if (grouptype === 'Gruppe 5') {
		label = 'Gruppe 5 - Erhverv uden ventilation og uden køl';
	}

	return label;
}

export const findPinFromBuildingScore = score => {
	let pin;
	if (score <= 14.29) {
		pin = 1;
	} else if (score > 14.29 && score <= 28.58) {
		pin = 2;
	} else if (score > 28.58 && score <= 42.87) {
		pin = 3;
	} else if (score > 42.87 && score <= 57.16) {
		pin = 4;
	} else if (score > 57.16 && score <= 71.45) {
		pin = 5;
	} else if (score > 71.45 && score <= 85.74) {
		pin = 6;
	} else if (score > 85.74) {
		pin = 7;
	}

	return pin;
}

const sortFunc = (a, b, orderBy, way) => {
	let newA = _.get(a, orderBy)
	let newB = _.get(b, orderBy)
	if (way === 'asc') {
		// return newA < newB
		return +(newA > newB) || -(newA < newB) /* || (newA === null || newA === undefined) - (newB === null || newB === undefined) */
	} else {
		// return newA > newB
		return -(newA > newB) || +(newA < newB) /* || (newA === null || newA === undefined) - (newB === null || newB === undefined) */
	}
}

export const handleRequestSort = (property, way, data) => {
	const orderBy = property
	let newData = []
	newData = data.sort((a, b) => sortFunc(a, b, orderBy, way))
	return newData
}

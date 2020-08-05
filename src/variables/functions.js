import moment from 'moment'

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
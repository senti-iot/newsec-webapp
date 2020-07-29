import React from 'react';
import moment from 'moment';

const Overview = () => {

	const getWelcomeTime = () => {
		let string = "";
		const hour = moment().hour();

		if (hour >= 0 && hour < 6) {
			string = "God nat";
		} else if (hour >= 6 && hour < 9) {
			string = "God morgen";
		} else if (hour >= 9 && hour < 12) {
			string = "God formiddag";
		} else if (hour >= 12 && hour < 14) {
			string = "God middag";
		} else if (hour >= 14 && hour < 18) {
			string = "God eftermiddag";
		} else if (hour >= 18 && hour <= 23) {
			string = "God aften";
		}

		return string;
	}

	return (
		<>

		</>
	)
}

export default Overview;

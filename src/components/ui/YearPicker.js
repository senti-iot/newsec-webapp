import React from 'react';
import { Typography, IconButton, Dialog, withStyles } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: '#000',
	},
});

const YearPicker = props => {
	const DialogTitle = withStyles(styles)((props) => {
		const { children, classes, onClose, ...other } = props;
		return (
			<MuiDialogTitle disableTypography className={classes.root} {...other}>
				<Typography variant="h6">{children}</Typography>
				{onClose ? (
					<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
						<CloseIcon />
					</IconButton>
				) : null}
			</MuiDialogTitle>
		);
	});

	return (
		<Dialog open={props.datePickerOpen}>
			<DialogTitle id="year-dialog-title" onClose={props.handleDatepickerClose}>Vælg år</DialogTitle>
			<DatePicker
				views={["year"]}
				label="Year only"
				value={props.selectedDate}
				onChange={props.handleDateChange}
				autoOk
				minDate={new Date("2018-01-01")}
				maxDate={new Date(moment().format('YYYY-MM-DD'))}
				variant="static"
			/>
		</Dialog>
	)
}

export default YearPicker;
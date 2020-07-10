
import { makeStyles } from '@material-ui/styles';

const thStyles = makeStyles(theme => ({
	noCheckbox: {
		padding: 10
	},
	hideIcon: {
		display: "none",
	},
	centered: {
		textAlign: 'center'
	},
	headerCell: {
		color: "inherit",
	},
	paragraphCell: {
		margin: 0,
		overflow: "hidden",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis"
	},
	header: {
		[theme.breakpoints.down('sm')]: {
			paddingRight: 4,
			padding: 0,
		},
		backgroundColor: '#365979',
		padding: 5,
	},
	checkbox: {
		color: '#fff',
		'&$checked': {
			color: theme.palette.primary.color
		},
	},
	checked: {},
	headerLabelActive: {
		width: "100%",
		color: '#fff',
		"&:hover": {
			color: '#fff',
		},
		"&:focus": {
			// color: grey[900]
		}
	},
	tableRow: {
		cursor: 'pointer',
		height: 20,
		"&:hover": {
			color: '#fff',
		},
	},
	tableCell: {
		borderTop: "1px solid rgba(224, 224, 224, 1)",
		height: 20,
	},
	tablecellcheckbox: {
		[theme.breakpoints.down("sm")]: {
			width: '35px'
		},
		[theme.breakpoints.down("md")]: {
			width: '45px'
		},
		fontSize: '0.875rem',
		borderTop: "1px solid rgba(224, 224, 224, 1)",
		/*padding: 0, */
		width: '50px',
	},

	//
	// PAGER
	selectIcon: {
		marginLeft: 4,
		paddingLeft: 4,
		paddingRight: 18,
	},
	noRows: {
		display: 'none'
	},
	spacer: {
		flex: 0,
	},
	spaceBetween: {
		marginRight: "auto",
		fontSize: "0.875rem"
	},
	tablePaginationCaption: {
		fontSize: "0.875rem",
		color: '#fff'
	},
	tablePaginationToolbar: {
		backgroundColor: '#365979',
		color: '#fff',
	}
}));

export default thStyles;

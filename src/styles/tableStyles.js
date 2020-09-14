
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
		color: "#fff",
	},
	sortLabel: {
		// color: '#fff !important',
		// backgroundColor: '#fff !important'
	},
	paragraphCell: {
		margin: 0,
		overflow: "hidden",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis"
	},
	header: {
		height: 50,
		[theme.breakpoints.down('sm')]: {
			paddingRight: 4,
			padding: 0,
		},
		backgroundColor: '#214C6F',
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
		height: 50,
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
		backgroundColor: '#214C6F',
		color: '#fff',
	}
}));

export default thStyles;

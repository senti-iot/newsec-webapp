
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
	tablecellPadding: {
		padding: 9
	},
	tableCell: {
		padding: 5,
		[theme.breakpoints.down('sm')]: {
			paddingRight: 4,
			padding: 0,
		},
		'&:last-child': {
			paddingRight: 8
		}
	},
	tableCellHeader: {
		backgroundColor: '#214C6F',
		padding: 5,
		[theme.breakpoints.down('sm')]: {
			paddingRight: 4,
			padding: 0,
		},
		'&:last-child': {
			paddingRight: 8
		}
	},
	tableCellWhite: {
		backgroundColor: '#FFF',
		padding: 5,
		[theme.breakpoints.down('sm')]: {
			paddingRight: 4,
			padding: 0,
		},
		'&:last-child': {
			paddingRight: 8
		}
	},
	tableCellCheckbox: {
		width: 35,
	},
	center: {
		textAlign: 'center'
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
	tablePaginationCaptionBlack: {
		fontSize: "0.875rem",
		color: '#000'
	},
	tablePaginationToolbar: {
		backgroundColor: '#214C6F',
		color: '#fff',
	},
	tablePaginationToolbarWhite: {
		backgroundColor: '#fff',
	},
}));

export default thStyles;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TablePagination, isWidthUp } from '@material-ui/core';

import { changeTableRows } from '../../redux/appState';
import cx from 'classnames';
import useWidth from '../../hooks/useWidth';
import tableStyles from '../../styles/tableStyles';

const TablePager = props => {
	const dispatch = useDispatch();
	const classes = tableStyles();
	const width = useWidth();

	const rowsPerPageOptions = useSelector(s => s.settings.rowsPerPageOptions)
	const rowsPerPage = useSelector(s => s.appState.trp ? s.appState.trp : s.settings.trp)
	// const rowsPerPage = useSelector(s => s.appState.trp)

	const { count, page, disableRowsPerPage, disableRowsPerPageLabel } = props

	const handleChangeRowsPerPage = e => {
		dispatch(changeTableRows(e.target.value))
	}

	const handleChangePage = (e, page) => {
		props.handleChangePage(e, page)
	}

	const handleGenerateAllOptions = () => {
		let all = [...rowsPerPageOptions]
		// if (all.findIndex(a => a.value === rowsPerPage) === -1) {
		// 	all.unshift({ value: rowsPerPage, label: rowsPerPage })
		// }
		return all
	}

	const selectClasses = cx({
		[classes.SelectIcon]: disableRowsPerPage,
		[classes.noRows]: disableRowsPerPage
	})

	const iconClass = cx({
		[classes.noRows]: disableRowsPerPage
	})

	return (
		<TablePagination
			component='div'
			count={count}
			rowsPerPage={rowsPerPage}
			page={page}
			backIconButtonProps={{
				'aria-label': 'Næste side',
			}}
			nextIconButtonProps={{
				'aria-label': 'Forrige side',
			}}
			classes={{
				toolbar: classes.tablePaginationToolbar,
				spacer: classes.spacer,
				input: classes.spaceBetween,
				caption: classes.tablePaginationCaption
			}}
			labelDisplayedRows={({ from, to, count }) => disableRowsPerPage ? `` : `${from}-${to} ${'af'} ${count}`}
			onChangePage={handleChangePage}
			onChangeRowsPerPage={handleChangeRowsPerPage}
			labelRowsPerPage={isWidthUp('sm', width) ? disableRowsPerPage ? `` : disableRowsPerPageLabel ? "" : 'Rækker pr. side' : ''}
			rowsPerPageOptions={handleGenerateAllOptions()}
			SelectProps={{
				renderValue: value => value,
				classes: {
					select: selectClasses,
					icon: iconClass
				}
			}}
		/>
	)
}

export default TablePager;

import React, { useState } from 'react';
import { Hidden, Table, TableBody, TableRow } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import tableStyles from '../styles/tableStyles';
import TC from './table/TC';
import TableHeader from './table/TableHeader';
import TablePager from './table/TablePager';
import { customFilterItems } from 'variables/filters';
import { groupTypeLabel } from 'variables/functions';
import { sortData } from 'redux/buildings';

const BuildingsList = props => {
	const [page, setPage] = useState(0);
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('');
	const filters = useSelector(s => s.appState.filters.buildings)

	const classes = tableStyles();
	const rowsPerPage = useSelector(s => s.appState.trp ? s.appState.trp : s.settings.trp)
	const buildings = customFilterItems(props.buildings, filters);
	const history = useHistory();
	const dispatch = useDispatch();

	const redux = {
		sortData: (key, property, order) => dispatch(sortData(key, property, order))
	}

	const handleRequestSort = (key, property) => {
		let o = property !== orderBy ? 'asc' : order === 'desc' ? 'asc' : 'desc'

		setOrder(o)
		setOrderBy(property)
		redux.sortData(key, property, o)
	}

	const handleChangePage = (event, newpage) => {
		setPage(newpage);
	}

	const handleRowClick = uuid => {
		history.push('/building/' + uuid);
	}

	const columnNames = [
		// { id: 'id', label: t('devices.fields.id') },
		{ id: 'no', label: 'Ejendomsnr' },
		{ id: 'name', label: 'Ejendomsnavn' },
		{ id: 'grouptype', label: 'Gruppe' },
		{ id: 'owner', label: 'Organisation' },
		{ id: 'address', label: 'Adresse' },
		{ id: 'relativeCO2Score', label: 'Relativ CO2 score' },
	]

	return (
		<>
			<Table className={classes.table} aria-labelledby='tableTitle'>
				<TableHeader
					order={order}
					orderBy={orderBy}
					noCheckbox
					onRequestSort={handleRequestSort}
					rowCount={buildings ? buildings.length : 0}
					columnData={columnNames}
				/>
				<TableBody>
					{buildings ? buildings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(building => {
						return (
							<TableRow
								hover
								onClick={() => handleRowClick(building.uuid)}
								role='checkbox'
								tabIndex={-1}
								key={building.uuid}
								//style={{ cursor: 'pointer' }}
								className={classes.tableRow}
							>
								{/* <Hidden lgUp>
									<TC content={
										<Grid container zeroMargin noPadding alignItems={'center'}>
											<Grid zeroMargin noPadding zeroMinWidth xs={12}>
												<Typography noWrap={true} paragraphCell={classes.noMargin}>
													{n.no}
												</Typography>
											</Grid>
											<Grid zeroMargin noPadding zeroMinWidth xs={12}>
												<Typography noWrap={true} variant={'caption'} className={classes.noMargin}>
													{n.name}
												</Typography>
											</Grid>
										</Grid>
									} />
								</Hidden> */}

								<Hidden mdDown>
									<TC label={building.no} />
									<TC label={building.name} />
									<TC label={groupTypeLabel(building.grouptype)} />
									<TC label={building.owner} />
									<TC label={building.streetName + ' ' + building.houseNumber + ', ' + building.zipcode + ' ' + building.city} />
									<TC label={building.relativeCO2Score} />
								</Hidden>
							</TableRow>
						)
					}) : null}
					{/* {emptyRows > 0 && (
						<TableRow style={{ height: 49 }}>
							<TableCell colSpan={8} />
						</TableRow>
					)} */}
				</TableBody>
			</Table>
			<TablePager
				count={buildings ? buildings.length : 0}
				page={page}
				handleChangePage={handleChangePage}
			/>
		</>
	);
}

export default BuildingsList;

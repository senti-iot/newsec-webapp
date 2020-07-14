import React, { useState } from 'react';
import { Checkbox, Hidden, Table, TableBody, TableRow } from '@material-ui/core';
import { useHistory } from 'react-router';

import tableStyles from '../styles/tableStyles';
import TC from './table/TC';
import TableHeader from './table/TableHeader';
import TablePager from './table/TablePager';

const BuildingsList = props => {
	const [page, setPage] = useState(0);
	const [selected, setSelected] = useState([]);
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('');

	const classes = tableStyles();
	const rowsPerPage = 10;
	const buildings = props.buildings;
	const history = useHistory();

	const handleSelectAllClick = () => {
		
	}

	const handleCheckboxClick = () => {
		setSelected();
		setOrder();
		setOrderBy();
	}

	const handleRequestSort = () => {

	}

	const handleChangePage = (event, newpage) => {
		setPage(newpage);
	}

	const handleRowClick = uuid => {
		console.log('handleRowClick')
		history.push('/building/' + uuid);
	}

	const columnNames = [
		// { id: 'id', label: t('devices.fields.id') },
		{ id: 'no', label: 'Ejendomsnr' },
		{ id: 'name', label: 'Ejendomsnavn' },
		{ id: 'grouptype', label: 'Gruppe' },
		{ id: 'relativeCO2Score', label: 'Relativ CO2 score' },
	]

	return (
		<>
			<Table className={classes.table} aria-labelledby='tableTitle'>
				<TableHeader
					numSelected={selected.length}
					order={order}
					orderBy={orderBy}
					onSelectAllClick={handleSelectAllClick}
					onRequestSort={handleRequestSort}
					rowCount={buildings ? buildings.length : 0}
					columnData={columnNames}
				/>
				<TableBody>
					{buildings ? buildings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(building => {
						// const isSelected = isSelectedFunc(n.uuid);
						const isSelected = false;

						return (
							<TableRow
								hover
								onClick={() => handleRowClick(building.uuid)}
								role='checkbox'
								aria-checked={isSelected}
								tabIndex={-1}
								key={building.uuid}
								selected={isSelected}
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
									<TC checkbox content={<Checkbox checked={isSelected} onClick={e => handleCheckboxClick(e, building.uuid)} />} />
									<TC label={building.no} />
									<TC label={building.name} />
									<TC label={building.grouptype} />
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

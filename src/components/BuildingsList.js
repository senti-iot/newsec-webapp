import React, { useState } from 'react';
import { Hidden, Table, TableBody, TableRow, IconButton } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import tableStyles from 'styles/tableStyles';
import TC from './table/TC';
import TableHeader from './table/TableHeader';
import TablePager from './table/TablePager';
import { customFilterItems } from 'variables/filters';
import { groupTypeLabel } from 'variables/functions';
import { sortData } from 'redux/buildings';
import { putUserInternal } from 'data/coreApi';
import { setFavorites } from 'redux/user';

const BuildingsList = props => {
	const [page, setPage] = useState(0);
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('');
	const filters = useSelector(s => s.appState.filters.buildings)

	const classes = tableStyles();
	const rowsPerPage = useSelector(s => s.appState.trp ? s.appState.trp : s.settings.trp)
	const buildings = customFilterItems(props.buildings, filters);
	const user = useSelector(s => s.user.user);
	const favorites = useSelector(s => s.user.favorites);

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

	const handleFavorite = async (event, uuid) => {
		event.stopPropagation();

		if (!user.internal) {
			user.internal = {};
		}

		if (!user.internal.newsec) {
			user.internal.newsec = {};
		}

		if (!user.internal.newsec.favorites) {
			user.internal.newsec.favorites = [];
		}

		let newFavorites = [...favorites];

		if (!newFavorites.filter(favorite => favorite.uuid === uuid).length) {
			newFavorites.push({ uuid: uuid, type: 'building' });
		} else {
			newFavorites = newFavorites.filter(favorite => favorite.uuid !== uuid);
		}

		user.internal.newsec.favorites = newFavorites;

		let data = await putUserInternal(user.uuid, user.internal);
		if (data) {
		 	dispatch(setFavorites(newFavorites));
		}
	}

	const columnNames = [
		{ id: 'favorite', label: '' },
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
					numSelected={0}
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
									<TC width="50" align="center" content={
										<IconButton onClick={(event) => handleFavorite(event, building.uuid)}>
											{favorites.filter(favorite => favorite.uuid === building.uuid).length ? <StarIcon style={{ color: '#90999E' }} /> : <StarBorderIcon />}
										</IconButton>
									} />
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

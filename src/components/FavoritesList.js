import React, { useState, useEffect } from 'react';
import { Hidden, Table, TableBody, TableRow, IconButton, Typography } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import tableStyles from '../styles/tableStyles';
import TC from './table/TC';
import TableHeader from './table/TableHeader';
import TablePager from './table/TablePager';
import CircularLoader from 'components/CircularLoader';
import { putUserInternal } from 'data/coreApi';
import { getUsersData, setFavorites } from 'redux/user';

const FavoritesList = () => {
	const classes = tableStyles();

	const dispatch = useDispatch();
	const [page, setPage] = useState(0);
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('');
	const rowsPerPage = useSelector(s => s.appState.trp ? s.appState.trp : s.settings.trp)
	const favorites = useSelector(s => s.user.favorites);
	const buildings = useSelector(s => s.buildingsReducer.buildings);
	const user = useSelector(s => s.user.user);
	const users = useSelector(s => s.user.users);

	const history = useHistory();

	useEffect(() => {
		dispatch(getUsersData());
	}, [dispatch]);

	const handleRequestSort = (key, property) => {
		let o = property !== orderBy ? 'asc' : order === 'desc' ? 'asc' : 'desc'

		setOrder(o)
		setOrderBy(property)
		// redux.sortData(key, property, o)
	}

	const handleChangePage = (event, newpage) => {
		setPage(newpage);
	}

	const handleRowClick = uuid => {
		history.push('/building/' + uuid);
	}

	const handleFavoriteDelete = async (event, uuid) => {
		event.stopPropagation();

		let newFavorites = [...favorites];
		newFavorites = newFavorites.filter(favorite => favorite.uuid !== uuid);

		user.internal.newsec.favorites = newFavorites;

		let data = await putUserInternal(user.uuid, user.internal);
		if (data) {
			dispatch(setFavorites(newFavorites));
		}
	}

	const columnNames = [
		{ id: 'favorite', label: '' },
		{ id: 'name', label: 'Navn' },
		{ id: 'type', label: 'Type' },
	]

	return (
		<>
			{buildings && users && favorites ?
				<>
					{favorites.length ?
						<>
							<Table className={classes.table} aria-labelledby='tableTitle'>
								<TableHeader
									order={order}
									orderBy={orderBy}
									noCheckbox
									onRequestSort={handleRequestSort}
									rowCount={favorites.length}
									columnData={columnNames}
									numSelected={0}
								/>
								<TableBody>
									{favorites ? favorites.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(favorite => {
										let name = '';
										let type = '';
										if (favorite.type === 'building') {
											let building = buildings.filter(b => b.uuid === favorite.uuid);
											name = building.length ? building[0].name : '';
											type = 'Bygning'
										} else if (favorite.type === 'user') {
											let user = users.filter(u => u.uuid === favorite.uuid);
											name = user.length ? user[0].firstName + ' ' + user[0].lastName : '';
											type = 'Bruger'
										}

										return (
											<TableRow
												hover
												onClick={() => handleRowClick(favorite.uuid)}
												role='checkbox'
												tabIndex={-1}
												key={favorite.uuid}
												className={classes.tableRow}
											>
												<Hidden mdDown>
													<TC content={<IconButton onClick={(event) => handleFavoriteDelete(event, favorite.uuid)}><StarIcon style={{ color: '#90999E' }} /></IconButton>} width="50" align="center" />
													<TC label={name} />
													<TC label={type} />
												</Hidden>
											</TableRow>
										)
									}) : null}
								</TableBody>
							</Table>
							<TablePager
								count={favorites ? favorites.length : 0}
								page={page}
								handleChangePage={handleChangePage}
							/>
						</>
						: <Typography variant="body2">Der blev ikke fundet nogen favoritter</Typography>}
				</>
				: <CircularLoader fill />}
		</>
	)
}

export default FavoritesList;

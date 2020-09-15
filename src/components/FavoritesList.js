import React, { useState, useEffect } from 'react';
import { Hidden, Table, TableBody, TableRow, IconButton, Typography } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import tableStyles from 'styles/tableStyles';
import TC from './table/TC';
import TableHeader from './table/TableHeader';
import TablePager from './table/TablePager';
import CircularLoader from 'components/CircularLoader';
import { putUserInternal } from 'data/coreApi';
import { getUsersData, getOrgsData, setFavorites } from 'redux/user';
import { changeMainView, changeHeaderTitle, toogleFilterIcon, closeFilterBar } from 'redux/appState';
import { handleRequestSort } from 'variables/functions';

const FavoritesList = () => {
	const classes = tableStyles();

	const dispatch = useDispatch();
	const [page, setPage] = useState(0);
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('name');
	const rowsPerPage = useSelector(s => s.appState.trp ? s.appState.trp : s.settings.trp)
	const favorites = useSelector(s => s.user.favorites);
	const buildings = useSelector(s => s.buildingsReducer.buildings);
	const user = useSelector(s => s.user.user);
	const users = useSelector(s => s.user.users);
	const orgs = useSelector(s => s.user.orgs);

	const history = useHistory();

	useEffect(() => {
		dispatch(closeFilterBar());
		dispatch(toogleFilterIcon(false));
		dispatch(changeMainView(''));
		dispatch(changeHeaderTitle('Favoritter'));
		dispatch(getUsersData());
		dispatch(getOrgsData());
	}, [dispatch]);

	const handleRequestSortFunc = (event, property, way) => {
		let newOrder = way ? way : order === 'desc' ? 'asc' : 'desc';
		if (property !== orderBy) {
			newOrder = 'asc';
		}
		handleRequestSort(property, order, favorites);
		setOrder(newOrder);
		setOrderBy(property);
	}

	const handleChangePage = (event, newpage) => {
		setPage(newpage);
	}

	const handleRowClick = favorite => {
		if (favorite.type === 'building') {
			history.push('/building/' + favorite.uuid);
		}
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
			{favorites ?
				<>
					{favorites.length ?
						<>
							<Table className={classes.table} aria-labelledby='tableTitle'>
								<TableHeader
									order={order}
									orderBy={orderBy}
									noCheckbox
									onRequestSort={handleRequestSortFunc}
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
										} else if (favorite.type === 'org') {
											let org = orgs.filter(o => o.uuid === favorite.uuid);
											name = org.length ? org[0].name : '';
											type = 'Kunde'
										}

										return (
											<TableRow
												hover
												onClick={() => handleRowClick(favorite)}
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

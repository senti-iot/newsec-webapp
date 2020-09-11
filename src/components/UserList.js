import React, { useState, useEffect } from 'react';
import { Hidden, Table, TableBody, TableRow, IconButton } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import 'moment/locale/da';

import tableStyles from 'styles/tableStyles';
import TC from './table/TC';
import TableHeader from './table/TableHeader';
import TablePager from './table/TablePager';
import { customFilterItems } from 'variables/filters';
import { sortData } from 'redux/buildings';
import { getUsersData, setFavorites } from 'redux/user';
import CircularLoader from 'components/CircularLoader';
import { putUserInternal } from 'data/coreApi';

const UserList = () => {
	const [page, setPage] = useState(0);
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('');
	const filters = useSelector(s => s.appState.filters.users)

	const classes = tableStyles();
	const rowsPerPage = useSelector(s => s.appState.trp ? s.appState.trp : s.settings.trp)
	const loading = useSelector(s => s.user.loading);
	const user = useSelector(s => s.user.user);
	const users = useSelector(s => s.user.users);
	const userFiltered = customFilterItems(users, filters);
	const favorites = useSelector(s => s.user.favorites);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsersData());
	}, [dispatch]);

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
			newFavorites.push({ uuid: uuid, type: 'user' });
		} else {
			newFavorites = newFavorites.filter(favorite => favorite.uuid !== uuid);
		}

		user.internal.newsec.favorites = newFavorites;
		console.log(newFavorites);
		let data = await putUserInternal(user.uuid, user.internal);
		if (data) {
			dispatch(setFavorites(newFavorites));
		}
	}

	const columnNames = [
		{ id: 'favorite', label: '' },
		{ id: 'name', label: 'Navn' },
		{ id: 'phone', label: 'Telefon' },
		{ id: 'email', label: 'E-mail' },
		{ id: 'org', label: 'Organisation' },
		{ id: 'type', label: 'Type' },
		{ id: 'latestlogin', label: 'Seneste login' },
	]

	return (
		<>
			{!loading ?
				<>
					<Table className={classes.table} aria-labelledby='tableTitle'>
						<TableHeader
							order={order}
							orderBy={orderBy}
							noCheckbox
							onRequestSort={handleRequestSort}
							rowCount={userFiltered ? userFiltered.length : 0}
							columnData={columnNames}
							numSelected={0}
						/>
						<TableBody>
							{userFiltered ? userFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => {
								return (
									<TableRow
										hover
										// onClick={() => handleRowClick(building.uuid)}
										role='checkbox'
										tabIndex={-1}
										key={user.uuid}
										//style={{ cursor: 'pointer' }}
										className={classes.tableRow}
									>
										<Hidden mdDown>
											<TC width="50" align="center" content={
												<IconButton onClick={(event) => handleFavorite(event, user.uuid)}>
													{favorites.filter(favorite => favorite.uuid === user.uuid).length ? <StarIcon style={{ color: '#90999E' }} /> : <StarBorderIcon />}
												</IconButton>
											} />
											<TC label={user.firstName + ' ' + user.lastName} />
											<TC label={user.phone} />
											<TC label={user.email} />
											<TC label={user.org.name} />
											<TC label='' />
											<TC label={user.lastLoggedIn ? moment(user.lastLoggedIn).format('lll') : '-'} />
										</Hidden>
									</TableRow>
								)
							}) : null}
						</TableBody>
					</Table>
					<TablePager
						count={userFiltered ? userFiltered.length : 0}
						page={page}
						handleChangePage={handleChangePage}
					/>
				</>
				: <CircularLoader fill /> }
		</>
	)
}

export default UserList;

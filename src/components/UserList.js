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
// import { customFilterItems } from 'variables/filters';
import { getUsersData, setFavorites } from 'redux/user';
import CircularLoader from 'components/CircularLoader';
import { putUserInternal } from 'data/coreApi';
import UserHover from 'components/UserHover';
import { changeMainView, changeHeaderTitle, toogleFilterIcon, closeFilterBar } from 'redux/appState';
import { handleRequestSort } from 'variables/functions';

const UserList = () => {
	const classes = tableStyles();

	const [page, setPage] = useState(0);
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('name');
	const [hoverUser, setHoverUser] = useState(null);
	const [rowHover, setRowHover] = useState(null);

	const hoverTime = 1;
	let timer = null

	// const filters = useSelector(s => s.appState.filters.users)
	const rowsPerPage = useSelector(s => s.appState.trp ? s.appState.trp : s.settings.trp)
	const loading = useSelector(s => s.user.loading);
	const user = useSelector(s => s.user.user);
	const users = useSelector(s => s.user.users);
	// const userFiltered = customFilterItems(users, filters);
	const favorites = useSelector(s => s.user.favorites);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(closeFilterBar());
		dispatch(toogleFilterIcon(false));
		dispatch(changeMainView(''));
		dispatch(changeHeaderTitle('Brugere'));
		dispatch(getUsersData());
	}, [dispatch]);

	const handleRequestSortFunc = (event, property, way) => {
		let newOrder = way ? way : order === 'desc' ? 'asc' : 'desc';
		if (property !== orderBy) {
			newOrder = 'asc';
		}
		handleRequestSort(property, order, users);
		setOrder(newOrder);
		setOrderBy(property);
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

		let data = await putUserInternal(user.uuid, user.internal);
		if (data) {
			dispatch(setFavorites(newFavorites));
		}
	}

	const setHover = (e, u) => {
		let target = e.target
		if (hoverTime > 0) {
			timer = setTimeout(() => {
				if (rowHover !== null) {
					if (rowHover.uuid !== u.uuid) {
						setRowHover(null);
						setTimeout(() => {
							setHoverUser(u);
							setRowHover(target);
						}, 200);
					}
				} else {
					setHoverUser(u);
					setRowHover(target);
				}
			}, hoverTime);
		}
	}

	const unsetTimeout = () => {
		clearTimeout(timer);
	}

	const unsetHover = () => {
		setRowHover(null);
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
				<div onMouseLeave={unsetHover}>
					<UserHover anchorEl={rowHover} handleClose={unsetHover} user={hoverUser} />
					<Table className={classes.table} aria-labelledby='tableTitle'>
						<TableHeader
							order={order}
							orderBy={orderBy}
							noCheckbox
							onRequestSort={handleRequestSortFunc}
							rowCount={users ? users.length : 0}
							columnData={columnNames}
							numSelected={0}
						/>
						<TableBody>
							{users ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => {
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
													{favorites && favorites.filter(favorite => favorite.uuid === user.uuid).length ? <StarIcon style={{ color: '#90999E' }} /> : <StarBorderIcon />}
												</IconButton>
											} />
											<TC onMouseEnter={e => { setHover(e, user) }}
												onMouseLeave={unsetTimeout}
												label={user.firstName + ' ' + user.lastName} />
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
						count={users ? users.length : 0}
						page={page}
						handleChangePage={handleChangePage}
					/>
				</div>
				: <CircularLoader fill /> }
		</>
	)
}

export default UserList;

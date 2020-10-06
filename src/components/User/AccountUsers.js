import React, { useState, useEffect } from 'react';
import { Hidden, Card, CardHeader, CardContent, Table, TableBody, TableRow, IconButton } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PeopleIcon from '@material-ui/icons/People';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import 'moment/locale/da';

import tableStyles from 'styles/tableStyles';
import TC from 'components/table/TC';
import TablePager from 'components/table/TablePager';
import CircularLoader from 'components/CircularLoader';
import UserHover from 'components/UserHover';
import { getUsersInOrgData, setFavorites } from 'redux/user';
import { putUserInternal } from 'data/coreApi';

const AccountUsers = () => {
	const classes = tableStyles();

	const [page, setPage] = useState(0);
	const [hoverUser, setHoverUser] = useState(null);
	const [rowHover, setRowHover] = useState(null);

	const hoverTime = 1;
	let timer = null

	const rowsPerPage = useSelector(s => s.appState.trp ? s.appState.trp : s.settings.trp)
	const loading = useSelector(s => s.user.loading);
	const user = useSelector(s => s.user.user);
	const users = useSelector(s => s.user.orgUsers);
	const favorites = useSelector(s => s.user.favorites);

	const dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			dispatch(getUsersInOrgData(user.org.uuid));
		}
	}, [dispatch, user]);

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

	const handleChangePage = (event, newpage) => {
		setPage(newpage);
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

	return (
		<Card>
			<CardHeader
				title="Brugere"
				titleTypographyProps={{ variant: 'h4' }}
				avatar={<PeopleIcon fontSize="large" />}
			/>
			<CardContent>
				<>
					{!loading ?
						<div onMouseLeave={unsetHover}>
							<UserHover anchorEl={rowHover} handleClose={unsetHover} user={hoverUser} />
							<Table className={classes.table} aria-labelledby='tableTitle'>
								<TableBody>
									{users ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => {
										return (
											<TableRow
												hover
												// onClick={() => handleRowClick(building.uuid)}
												role='checkbox'
												tabIndex={-1}
												key={user.uuid}
											>
												<Hidden mdDown>
													<TC width="50" align="center" content={
														<IconButton onClick={(event) => handleFavorite(event, user.uuid)}>
															{favorites && favorites.filter(favorite => favorite.uuid === user.uuid).length ? <StarIcon style={{ color: '#90999E' }} /> : <StarBorderIcon />}
														</IconButton>
													} className={classes.tableCellWhite} />
													<TC onMouseEnter={e => { setHover(e, user) }}
														onMouseLeave={unsetTimeout}
														label={user.firstName + ' ' + user.lastName} className={classes.tableCellWhite} />
													<TC label={user.phone} className={classes.tableCellWhite} />
													<TC label={user.email} className={classes.tableCellWhite} />
													<TC label={user.lastLoggedIn ? moment(user.lastLoggedIn).format('lll') : '-'} className={classes.tableCellWhite} />
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
								isWhite={true}
							/>
						</div>
						: <CircularLoader fill />}
				</>
			</CardContent>
		</Card>
	)
}

export default AccountUsers;
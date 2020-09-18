import React, { useState, useEffect } from 'react';
import { Grid, Card, CardHeader, CardContent, CardActions, IconButton, Button, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import TablePager from 'components/table/TablePager';
import { customFilterItems } from 'variables/filters';
import { groupTypeLabel } from 'variables/functions';
import BuildingsThumbsImage from 'components/BuildingsThumbsImage';
import { putUserInternal } from 'data/coreApi';
import { setFavorites } from 'redux/user';
import { changeHeaderTitle, changeMainView, toogleFilterIcon } from 'redux/appState';

const BuildingsThumbs = props => {
	const filters = useSelector(s => s.appState.filters.buildings);
	const buildings = customFilterItems(props.buildings, filters);
	const history = useHistory();
	const [page, setPage] = useState(0);

	const dispatch = useDispatch();
	const rowsPerPage = useSelector(s => s.appState.trp ? s.appState.trp : s.settings.trp)
	const user = useSelector(s => s.user.user);
	const favorites = useSelector(s => s.user.favorites);

	useEffect(() => {
		dispatch(changeHeaderTitle('Miniaturer'));
		dispatch(changeMainView('thumbs'));
		dispatch(toogleFilterIcon(true));
	}, [dispatch]);

	const handleClick = uuid => {
		history.push('/building/' + uuid);
	}

	const handleChangePage = (event, newpage) => {
		setPage(newpage)
	}

	const favorite = async building => {
		if (!user.internal) {
			user.internal = {};
		}

		if (!user.internal.newsec) {
			user.internal.newsec = {};
		}

		if (!user.internal.newsec.favorites) {
			user.internal.newsec.favorites = [];
		}

		let newFavorites = [ ...favorites ];

		if (!newFavorites.filter(favorite => favorite.uuid === building.uuid).length) {
			newFavorites.push({ uuid: building.uuid, type: 'building' });
		} else {
			newFavorites = newFavorites.filter(favorite => favorite.uuid !== building.uuid);
		}

		user.internal.newsec.favorites = newFavorites;

		let data = await putUserInternal(user.uuid, user.internal);
		if (data) {
			dispatch(setFavorites(newFavorites));
		}
	}

	return (
		<>
			<Grid container spacing={3}>
				{buildings && buildings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(building => {
					return (
						<Grid item xs={12} md={3} xl={2} key={building.uuid} style={{ display: 'flex' }}>
							<Card style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
								<CardHeader
									avatar={
										<BuildingsThumbsImage building={building} />
									}
									action={
										<>
											<IconButton onClick={() => favorite(building)}>
												{favorites.filter(favorite => favorite.uuid === building.uuid).length ? <StarIcon style={{ color: '#90999E' }} /> : <StarBorderIcon />}
											</IconButton>
											<IconButton>
												<MoreVertIcon />
											</IconButton>
										</>
									}
									title={building.name}
									subheader={building.no}
									titleTypographyProps={{ variant: 'h6' }}
									subheaderTypographyProps={{ variant: 'h6' }}
								/>
								<CardContent style={{ minHeight: 150, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
									<Typography>{groupTypeLabel(building.grouptype)}</Typography>

									<CardActions disableSpacing={true}>
										<Button
											size="small"
											color="primary"
											endIcon={<ArrowForwardIosIcon />}
											style={{ marginLeft: 'auto' }}
											onClick={() => handleClick(building.uuid)}
										>
											SE MERE
        								</Button>
									</CardActions>
								</CardContent>
							</Card>
						</Grid>
					)
				})}
			</Grid>
			<div style={{ marginTop: 16 }}>

				<TablePager
					// disableRowsPerPageLabel
					count={buildings ? buildings.length : 0}
					page={page}
					handleChangePage={handleChangePage}
				/>
			</div>
		</>
	)
}

export default BuildingsThumbs;

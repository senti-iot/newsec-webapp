import React, { useState } from 'react';
import { Grid, Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Button, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

import buildingStyles from '../styles/buildingStyles';
import TablePager from 'components/table/TablePager';
import { customFilterItems } from 'variables/filters';
import { groupTypeLabel } from 'variables/functions';

const BuildingsThumbs = props => {
	const filters = useSelector(s => s.appState.filters.buildings);
	const buildings = customFilterItems(props.buildings, filters);
	const classes = buildingStyles();
	const history = useHistory();
	const [page, setPage] = useState(0)

	const rowsPerPage = useSelector(s => s.appState.trp ? s.appState.trp : s.settings.trp)

	const handleClick = uuid => {
		history.push('/building/' + uuid);
	}
	const handleChangePage = (event, newpage) => {
		setPage(newpage)
	}
	return (
		<>
			<Grid container spacing={3}>
				{buildings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(building => {
					return (
						<Grid item xs={12} md={3} key={building.uuid}>
							<Card>
								<CardHeader
									avatar={
										<Avatar aria-label="recipe" className={classes.avatar}>
          							</Avatar>
									}
									action={
										<>
											<IconButton>
												<StarBorderIcon />
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
								<CardContent>
									<Typography>{groupTypeLabel(building.grouptype)}</Typography>

									<CardActions disableSpacing={true}>
										<Button
											size="small"
											color="primary"
											endIcon={<ArrowForwardIosIcon />}
											style={{ marginLeft: 'auto' }}
											onClick={() => handleClick(building.uuid)}>
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

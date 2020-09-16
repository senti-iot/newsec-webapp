import React from 'react';
import { Popper, Fade, Paper, Grid, Typography, Divider, Tooltip, IconButton, Link } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import Gravatar from 'react-gravatar';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useDispatch } from 'react-redux';

import hoverStyles from 'styles/hoverStyles';
import { isFav, removeFromFav, addToFav } from 'redux/user';

const UserHover = props => {
	const classes = hoverStyles();
	const dispatch = useDispatch();

	const user = props.user;
	const anchorEl = props.anchorEl;
	const handleClose = props.handleClose;

	const addToFavorites = () => {
		let favObj = {
			uuid: user.uuid,
			type: 'user'
		};
		dispatch(addToFav(favObj));
	}

	const removeFromFavorites = () => {
		let favObj = {
			uuid: user.uuid,
			type: 'user'
		};
		dispatch(removeFromFav(favObj));
	}
	console.log(user);
	return (
		<>
			{user ?
				<Popper
					style={{ zIndex: 2000 }}
					disablePortal
					id="simple-popover"
					open={Boolean(anchorEl)}
					anchorEl={anchorEl}
					onClose={handleClose}
					placement={'top-start'}
					onMouseLeave={handleClose}
					transition
				>
					{({ TransitionProps }) => (
						<Fade {...TransitionProps} timeout={250}>
							<Paper className={classes.paper}>
								<Grid container style={{ margin: "8px 0" }}>
									<Grid xs={3} container justify={'center'} alignItems={'center'}>
										<Gravatar size={50} default='mp' email={user.email} className={classes.img} />
									</Grid>
									<Grid xs={9} container justify={'center'}>
										<Grid xs={12} item>
											<Typography variant={'h6'} style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
												{`${user.firstName} ${user.lastName}`}
											</Typography>
										</Grid>
										<Grid xs={12} item>
											<Typography className={classes.smallText} paragraph={false}>{user.email ? user.email : ""}</Typography>
										</Grid>
										<Grid xs={12} item>
											<Typography className={classes.smallText} paragraph={false}>{user.phone ? user.phone : ""}</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Grid container className={classes.middleContainer}>
									<Grid xs={12} item>
										<Typography className={classes.smallText}>
											<BusinessIcon className={classes.smallIcon} />
											{user.org.name}
										</Typography>
									</Grid>
								</Grid>
								<Divider />
								<Grid container style={{ marginTop: '8px' }}>
									<Grid container style={{ flex: 1, justifyContent: 'flex-end' }}>
										<Tooltip placement="top" title="Send e-mail">
											<IconButton>
												<Link className={classes.smallActionLink} href={`mailto:${user.email}`}>
													<EmailIcon />
												</Link>
											</IconButton>
										</Tooltip>
										{user.phone && user.phone.length ?
											<Tooltip placement="top" title="Ring">
												<IconButton>
													<Link className={classes.smallActionLink} href={`tel:${user.phone}`}>
														<PhoneIcon />
													</Link>
												</IconButton>
											</Tooltip>
											: ""}
										<Tooltip placement="top" title={dispatch(isFav({ uuid: user.uuid, type: 'user' })) ? "Fjern fra favoritter" : "Tilføj til favoritter"}>
											<IconButton onClick={dispatch(isFav({ uuid: user.uuid, type: 'user' })) ? removeFromFavorites : addToFavorites}>
												{dispatch(isFav({ uuid: user.uuid, type: 'user' })) ? <StarIcon /> : <StarBorderIcon />}
											</IconButton>
										</Tooltip>
									</Grid>
								</Grid>
							</Paper>
						</Fade>
					)}
				</Popper>
				: ""}
		</>
	)
}

export default UserHover;

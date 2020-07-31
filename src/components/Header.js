import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, ButtonBase, Typography, InputBase, Badge, Button, Menu, MenuItem, Grid, SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import PageviewIcon from '@material-ui/icons/Pageview';
import ListIcon from '@material-ui/icons/List';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import PollOutlinedIcon from '@material-ui/icons/PollOutlined';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import PeopleIcon from '@material-ui/icons/People';
import EmailIcon from '@material-ui/icons/Email';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CopyrightIcon from '@material-ui/icons/Copyright';
import MapIcon from '@material-ui/icons/Map';
import TuneIcon from '@material-ui/icons/Tune';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BusinessIcon from '@material-ui/icons/Business';
import { useHistory } from 'react-router'
import Gravatar from 'react-gravatar';
import { useDispatch, useSelector } from 'react-redux';

import mainStyles from '../styles/mainStyles';
import BarButton from './ui/BarButton';
import logo from '../assets/logo.png';
import { logoutUser } from '../data/coreApi';
import { changeMainView } from '../redux/appState';

const Header = (props) => {
	const classes = mainStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const [anchorProfile, setAnchorProfile] = useState(null);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const openProfile = Boolean(anchorProfile);

	const user = useSelector(s => s.user.user);
	const activeView = useSelector(s => s.appState.mainView);

	const handleProfileOpen = e => {
		setAnchorProfile(e.currentTarget);
	};

	const handleProfileClose = () => {
		setAnchorProfile(null);

		if (props.onClose) {
			props.onClose();
		}
	};

	const handleLogOut = async () => {
		const result = await logoutUser();
		if (result.status === 200) {
			history.push('/login');
		}
	};

	const toggleFilter = () => {

	};

	const _onChangeView = viewType => {
		dispatch(changeMainView(viewType));
	}

	const toggleDrawer = () => {
		setDrawerOpen(drawerOpen ? false : true);
	};

	const goToPage = page => {
		switch (page) {
			default:
			case 'overview':
				history.push('/');
				break;
			case 'benchmark':
				history.push('/');
				break;
			case 'favorites':
				history.push('/');
				break;
			case 'users':
				history.push('/');
				break;
			case 'customers':
				history.push('/');
				break;
			case 'support':
				history.push('/');
				break;
			case 'policy':
				history.push('/');
				break;
			case 'about':
				history.push('/');
				break;
		}
	}

	return (
		<>
			<div className={classes.appBarWrapper}>
				<AppBar className={classes.appBarPrimary} position='absolute' elevation={0}>
					<Toolbar>
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							onClick={toggleDrawer}
						>
							<MenuIcon fontSize="large" />
						</IconButton>

						<div className={classes.logoContainer}>
							<ButtonBase
								focusRipple
								className={classes.image}
								focusVisibleClassName={classes.focusVisible}
								onClick={() => history.push('/')}
							>
								<img src={`${logo}`} alt="Newsec logo" className={classes.logo} />
							</ButtonBase>
						</div>

						<Typography variant="h6" className={classes.appbarTitle}>
							{props.title}
						</Typography>

						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Søg..."
								classes={{
									root: classes.searchInputRoot,
									input: classes.searchInput,
								}}
							/>
						</div>
						<IconButton color="inherit">
							<Badge badgeContent={0} color="secondary" overlap="circle" classes={{ badge: classes.notificationsBadge }}>
								<NotificationsIcon fontSize="large" className={classes.notificationsIcon} />
							</Badge>
						</IconButton>

						<div>
							<div className={classes.username}>{user ? user.firstName + ' ' + user.lastName : ""}</div>
							<Button
								onClick={handleProfileOpen}
							>
								{user ? user.img ? <img src={user.img} alt='UserProfile' className={classes.userimage} /> : <Gravatar default='mp' email={user.email} className={classes.userimage} size={55} /> : "" }
							</Button>

							<Menu
								style={{ marginTop: 55 }}
								id='menu-appbar'
								anchorEl={anchorProfile}
								transformOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								open={openProfile}
								onClose={handleProfileClose}
								disableAutoFocusItem
							>
								<MenuItem>
									<AccountBoxIcon className={classes.usermenuIcon} />Min profil
								</MenuItem>
								<MenuItem>
									<BusinessIcon className={classes.usermenuIcon} />Kontodetaljer
								</MenuItem>
								<MenuItem onClick={() => { handleLogOut() }}>
									<PowerSettingsNew className={classes.usermenuIcon} />Log ud
								</MenuItem>
							</Menu>
						</div>
					</Toolbar>
				</AppBar>

				<SwipeableDrawer
					className={classes.drawer}
					classes={{ paper: classes.drawerPaper }}
					anchor="left"
					open={drawerOpen}
					onClose={toggleDrawer}
				>
					<div role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer} className={classes.drawerContainer}>			
						<List>
							<ListItem button className={classes.drawerListItem} onClick={() => goToPage('overview')}>
								<ListItemIcon className={classes.drawerListIcon}><PageviewIcon className={classes.drawerIcon} /></ListItemIcon>
								<ListItemText primary="Overblik" />
							</ListItem>
							<ListItem button className={classes.drawerListItem} onClick={() => goToPage('benchmark')}>
								<ListItemIcon className={classes.drawerListIcon}><PollOutlinedIcon className={classes.drawerIcon} /></ListItemIcon>
								<ListItemText primary="Benchmark" />
							</ListItem>
							<ListItem button className={classes.drawerListItem} onClick={() => goToPage('favorites')}>
								<ListItemIcon className={classes.drawerListIcon}><StarOutlinedIcon className={classes.drawerIcon} /></ListItemIcon>
								<ListItemText primary="Favoritter" />
							</ListItem>
							<ListItem button className={classes.drawerListItem} onClick={() => goToPage('users')}>
								<ListItemIcon className={classes.drawerListIcon}><PeopleIcon className={classes.drawerIcon} /></ListItemIcon>
								<ListItemText primary="Brugere" />
							</ListItem>
							<ListItem button className={classes.drawerListItem} onClick={() => goToPage('customers')}>
								<ListItemIcon className={classes.drawerListIcon}><BusinessIcon className={classes.drawerIcon} /></ListItemIcon>
								<ListItemText primary="Kunder" />
							</ListItem>
							<ListItem button className={classes.drawerListItem} onClick={() => goToPage('contact')}>
								<ListItemIcon className={classes.drawerListIcon}><EmailIcon className={classes.drawerIcon} /></ListItemIcon>
								<ListItemText primary="Kontakt" />
							</ListItem>
							<ListItem button className={classes.drawerListItem} onClick={() => goToPage('support')}>
								<ListItemIcon className={classes.drawerListIcon}><ContactSupportIcon className={classes.drawerIcon} /></ListItemIcon>
								<ListItemText primary="Support" />
							</ListItem>
							<ListItem button className={classes.drawerListItem} onClick={() => goToPage('policy')}>
								<ListItemIcon className={classes.drawerListIcon}><VerifiedUserIcon className={classes.drawerIcon} /></ListItemIcon>
								<ListItemText primary="Datapolitik" />
							</ListItem>
							<ListItem button className={classes.drawerListItem} onClick={() => goToPage('about')}>
								<ListItemIcon className={classes.drawerListIcon}><CopyrightIcon className={classes.drawerIcon} /></ListItemIcon>
								<ListItemText primary="Om Newsec" />
							</ListItem>
						</List>
					</div>
				</SwipeableDrawer>
			</div>
			{props.enableSecondary ?
				<div className={classes.appBarSecondary}>
					<Grid container>
						<Grid container item xs={6}>
							<BarButton
								variant="contained"
								color="default"
								className={activeView === 'overview' ? classes.button : classes.dimmedButton}
								size="large"
								disableElevation
								startIcon={<PageviewIcon />}
								onClick={() => _onChangeView('overview')}
							>
								Overblik
							</BarButton>
							<BarButton
								variant="contained"
								color="default"
								className={activeView === 'map' ? classes.button : classes.dimmedButton}
								size="large"
								disableElevation
								startIcon={<MapIcon />}
								onClick={() => _onChangeView('map')}
							>
								Kort
							</BarButton>
							<BarButton
								variant="contained"
								color="default"
								className={activeView === 'list' ? classes.button : classes.dimmedButton}
								size="large"
								disableElevation
								startIcon={<ListIcon />}
								onClick={() => _onChangeView('list')}
							>
								Liste
							</BarButton>
							<BarButton
								variant="contained"
								color="default"
								className={activeView === 'thumbs' ? classes.button : classes.dimmedButton}
								size="large"
								disableElevation
								startIcon={<ViewComfyIcon />}
								onClick={() => _onChangeView('thumbs')}
							>
								Miniaturer
							</BarButton>
						</Grid>
						<Grid container item xs={6} justify="flex-end">
							<IconButton
								edge="start"
								className={classes.filterButton}
								onClick={toggleFilter}
							>
								<TuneIcon />
							</IconButton>
						</Grid>
					</Grid>
				</div>
				: ""}
		</>
	);
}

export default Header;
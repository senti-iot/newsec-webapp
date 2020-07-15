import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Avatar, IconButton, Tabs, Tab, List, ListItem, ListItemText, Divider, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import buildingStyles from '../../styles/buildingStyles';
import TabPanel from '../ui/TabPanel';
import CircularLoader from '../../components/CircularLoader';

const BuildingInfo = props => {
	const [selectedTab, setSelectedTab] = useState(0);

	const classes = buildingStyles();
	const building = props.building;

	const StyledTabs = withStyles({
		root: {
			background: 'rgba(54, 89, 121, 0.72)',
		},
		indicator: {
			backgroundColor: 'transparent',
		},
	})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

	const StyledTab = withStyles((theme) => ({
		root: {
			textTransform: 'none',
			color: '#fff',
			fontWeight: 400,
			fontSize: '1rem',
			opacity: 1,
			'&$selected': {
				backgroundColor: '#365979',
			},
			// borderRight: 'solid 1px #fff'
		},
		selected: {},
	}))((props) => <Tab disableRipple {...props} />);

	const handleTabChange = (event, newValue) => {
		setSelectedTab(newValue);
	};

	return (
		<>
			{building ?
				<Card className={classes.card}>
					<CardHeader
						avatar={
							<Avatar className={classes.avatar}>
							</Avatar>
						}
						action={
							<IconButton aria-label="settings">
								<MoreVertIcon />
							</IconButton>
						}
						title={building.name}
						subheader={building.no}
						titleTypographyProps={{ variant: 'h4' }}
						subheaderTypographyProps={{ variant: 'h6' }}
					/>
					<CardContent>
						<StyledTabs value={selectedTab} onChange={handleTabChange} variant="fullWidth">
							<StyledTab label="Stamdata" />
							<StyledTab label="Ejendom" />
							<StyledTab label="Udbydere" />
						</StyledTabs>

						<TabPanel value={selectedTab} index={0}>
							<List className={classes.root} style={{ padding: 0 }}>
								<ListItem disableGutters={true}>
									<ListItemText
										disableTypography
										primary={<Typography style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.46)' }}>Gruppe</Typography>}
										secondary={<Typography style={{ fontSize: '0.9rem', color: '#000' }}>{building.group}</Typography>}
									/>
								</ListItem>
								<Divider />

								<ListItem disableGutters={true}>
									<ListItemText
										disableTypography
										primary={<Typography style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.46)' }}>Lejer</Typography>}
										secondary={<Typography style={{ fontSize: '0.9rem', color: '#000' }}>{building.tenant}</Typography>}
									/>
								</ListItem>
								<Divider />

								<ListItem disableGutters={true}>
									<ListItemText
										disableTypography
										primary={<Typography style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.46)' }}>Ejer</Typography>}
										secondary={<Typography style={{ fontSize: '0.9rem', color: '#000' }}>{building.owner}</Typography>}
									/>
								</ListItem>
								<Divider />

								<ListItem disableGutters={true}>
									<ListItemText
										disableTypography
										primary={<Typography style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.46)' }}>Adresse</Typography>}
										secondary={
											<>
												<span style={{ fontSize: '0.9rem', color: '#000' }}>{building.streetName}<br />
													{building.zipcode} {building.city}</span>
											</>
										}
									/>
								</ListItem>
								<Divider />

								<ListItem disableGutters={true}>
									<ListItemText
										disableTypography
										primary={<Typography style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.46)' }}>Energimærke</Typography>}
										secondary={<Typography style={{ fontSize: '0.9rem', color: '#000' }}>{building.energyState}</Typography>}
									/>
								</ListItem>
							</List>
						</TabPanel>
						<TabPanel value={selectedTab} index={1}>
							<List className={classes.root} style={{ padding: 0 }}>
								<ListItem disableGutters={true}>
									<ListItemText
										disableTypography
										primary={<Typography style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.46)' }}>Samlet areal bygning</Typography>}
										secondary={<Typography style={{ fontSize: '0.9rem', color: '#000' }}>{building.areal}</Typography>}
									/>
								</ListItem>
								<Divider />

								<ListItem disableGutters={true}>
									<ListItemText
										disableTypography
										primary={<Typography style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.46)' }}>Opvarmet bygningsareal</Typography>}
										secondary={<Typography style={{ fontSize: '0.9rem', color: '#000' }}>{building.arealHeated}</Typography>}
									/>
								</ListItem>
								<Divider />

								<ListItem disableGutters={true}>
									<ListItemText
										disableTypography
										primary={<Typography style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.46)' }}>BRB ejendomsnummer</Typography>}
										secondary={<Typography style={{ fontSize: '0.9rem', color: '#000' }}>{building.bbrNumber}</Typography>}
									/>
								</ListItem>
								<Divider />

								<ListItem disableGutters={true}>
									<ListItemText
										disableTypography
										primary={<Typography style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.46)' }}>Opført</Typography>}
										secondary={<Typography style={{ fontSize: '0.9rem', color: '#000' }}>???</Typography>}
									/>
								</ListItem>
								<Divider />

								<ListItem disableGutters={true}>
									<ListItemText
										disableTypography
										primary={<Typography style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.46)' }}>Årlig leje</Typography>}
										secondary={<Typography style={{ fontSize: '0.9rem', color: '#000' }}>DKK {building.yearlyRent}</Typography>}
									/>
								</ListItem>
								<Divider />

								<ListItem disableGutters={true}>
									<ListItemText
										disableTypography
										primary={<Typography style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.46)' }}>Årlig leje pr. m2</Typography>}
										secondary={<Typography style={{ fontSize: '0.9rem', color: '#000' }}>DKK {building.yearlyRentM2}</Typography>}
									/>
								</ListItem>
							</List>
						</TabPanel>
						<TabPanel value={selectedTab} index={2}>
							<List className={classes.root} style={{ padding: 0 }}>
								<ListItem disableGutters={true}>
									<ListItemText
										disableTypography
										primary={<Typography style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.46)' }}>Varme</Typography>}
										secondary={<Typography style={{ fontSize: '0.9rem', color: '#000' }}>{building.providerHeat}</Typography>}
									/>
								</ListItem>
								<Divider />

								<ListItem disableGutters={true}>
									<ListItemText
										disableTypography
										primary={<Typography style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.46)' }}>EL</Typography>}
										secondary={<Typography style={{ fontSize: '0.9rem', color: '#000' }}>{building.providerPower}</Typography>}
									/>
								</ListItem>
								<Divider />

								<ListItem disableGutters={true}>
									<ListItemText
										disableTypography
										primary={<Typography style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.46)' }}>Vand</Typography>}
										secondary={<Typography style={{ fontSize: '0.9rem', color: '#000' }}>{building.providerWater}</Typography>}
									/>
								</ListItem>
							</List>
						</TabPanel>
					</CardContent>
				</Card>
				: <CircularLoader fill style={{ marginTop: 500 }} />}
		</>
	)
}

export default BuildingInfo;
import React from 'react';
import { useSelector } from 'react-redux';
import Gravatar from 'react-gravatar';
import { Card, CardHeader, CardContent, Grid, Typography, Link } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import moment from 'moment';

import userStyles from 'styles/userStyles';

const Profile = () => {
	const user = useSelector(s => s.user.user);
	const extended = user && user.aux ? user.aux.senti ? user.aux.senti.extendedProfile : {} : {};
	const classes = userStyles();

	const renderName = () => {
		return user ? user.firstName + ' ' + user.lastName : "";
	}

	return (
		<Card>
			<CardHeader
				title={`${renderName()}`}
				titleTypographyProps={{ variant: 'h4' }}
				subheader={user ? user.userName : ""}
				subheaderTypographyProps={{ variant: 'h5' }}
				avatar={<PersonIcon fontSize="large" />}
			/>
			<CardContent>
				{user ?
					<Grid container spacing={2}>
						<Grid item lg={9} md={12}>
							<Grid item>
								<Typography variant={'caption'}>E-mail</Typography>
								<Typography variant="body2">
									<Link href={`mailto:${user.email}`}>
										{user.email}
									</Link>
								</Typography>
							</Grid>
							{user.phone ?
								<Grid item>
									<Typography variant={'caption'}>Telefon</Typography>
									<Typography variant="body2">
										<Link href={`tel:${user.phone}`}>
											{user.phone}
										</Link>
									</Typography>
								</Grid>
								: ""}
							<Grid item>
								<Typography variant={'caption'}>Organisation</Typography>
								<Typography variant="body2">
									{user.org ? user.org.name : 'Ingen organisation'}
								</Typography>
							</Grid>

							{extended.bio ?
								<Grid item xs={12}>
									<Typography variant={'caption'}>Biografi</Typography>
									<Typography variant="body2">
										{extended.bio}
									</Typography>
								</Grid>
								: ""}
							{extended.position ?
								<Grid item xs={12} md={2}>
									<Typography variant={'caption'}>Stilling</Typography>
									<Typography variant="body2">
										{extended.position}
									</Typography>
								</Grid>
								: ""}
							{extended.location ?
								<Grid item xs={12} md={12}>
									<Typography variant={'caption'}>Placering</Typography>
									<Typography variant="body2">
										{extended.location ? extended.location : ` `}
									</Typography>
								</Grid>
								: ""}
							{extended.linkedInURL ?
								<Grid xs={12} md={12}>
									<Typography variant={'caption'}>LinkedIn</Typography>
									<Typography variant="body2">
										<Link target='_blank' rel="noopener noreferrer" href={`${extended.linkedInURL}`}>
											{renderName()}
										</Link>
									</Typography>
								</Grid>
								: ""}
							{extended.twitterURL ?
								<Grid xs={12} md={8}>
									<Typography variant={'caption'}>Twitter</Typography>
									<Typography variant="body2">
										<Link target='_blank' rel="noopener noreferrer" href={`${extended.twitterURL}`}>
											{renderName()}
										</Link>
									</Typography>
								</Grid>
								: ""}
							{extended.birthday ?
								<Grid item xs={12}>
									<Typography variant={'caption'}>Fødselsdag</Typography>
									<Typography variant="body2">
										{moment(extended.birthday).format('LL')}
									</Typography>
								</Grid>
								: ""}
						</Grid>
						<Grid item lg={3} md={12}>
							{user.img ? <img src={user.img} alt='UserAvatar' className={classes.img} /> : <Gravatar default='mp' size={250} email={user.email} className={classes.img} />}
						</Grid>
					</Grid>
					: ""}
			</CardContent>
		</Card>
	)
}

export default Profile;
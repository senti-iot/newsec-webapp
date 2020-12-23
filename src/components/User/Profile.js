import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Gravatar from 'react-gravatar';
import { Card, CardHeader, CardContent, Grid, Typography, Link } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import moment from 'moment';

import userStyles from 'styles/userStyles';
import { changeMainView, changeHeaderTitle } from 'redux/appState';
import { getUserByUuid } from 'data/coreApi';
import CircularLoader from 'components/CircularLoader';

const Profile = () => {
	const { uuid } = useParams();
	const dispatch = useDispatch();
	const classes = userStyles();

	const u = useSelector(s => s.user.user);

	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const [extended, setExtented] = useState(null);

	useEffect(() => {
		dispatch(changeHeaderTitle('Profil'));
		dispatch(changeMainView(''));
	}, [dispatch]);

	useEffect(() => {
		async function fetchData(uuid) {
			const userData = await getUserByUuid(uuid);
			if (userData) {
				const ext = userData.aux ? userData.aux.senti ? userData.aux.senti.extendedProfile : {} : {};

				setUser(userData);
				setExtented(ext);
				setLoading(false);
			}
		}

		if (uuid) {
			fetchData(uuid);
		} else {
			const ext = u && u.aux ? u.aux.senti ? u.aux.senti.extendedProfile : {} : {};

			setUser(u);
			setExtented(ext);
			setLoading(false);
		}
	}, [uuid, u]);

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
				{!loading ?
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
					: <CircularLoader fill />}
			</CardContent>
		</Card>
	)
}

export default Profile;
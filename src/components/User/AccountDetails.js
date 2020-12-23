import React, { useState, useEffect } from 'react';
import { Grid, Card, CardHeader, CardContent, Link, Typography } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CircularLoader from 'components/CircularLoader';
import { getOrgByUuid } from 'data/coreApi';

var countries = require("i18n-iso-countries");
countries.registerLocale(require('i18n-iso-countries/langs/da.json'));

const AccountDetails = () => {
	const { uuid } = useParams();
	const user = useSelector(s => s.user.user);

	const [org, setOrg] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData(uuid) {
			const orgData = await getOrgByUuid(uuid);

			if (orgData) {
				setOrg(orgData);
				setLoading(false);
			}
		}

		if (uuid) {
			fetchData(uuid);
		} else {
			if (user && typeof user !== 'undefined') {
				setOrg(user.org);
				setLoading(false);
			}
		}
	}, [uuid, user]);

	return (
		<>
			{!loading ?
				<Card>
					<CardHeader
						title={org.name}
						titleTypographyProps={{ variant: 'h4' }}
						avatar={<BusinessIcon fontSize="large" />}
					/>
					<CardContent>
						{user ?
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Typography variant={'caption'}>Addresse</Typography>
									<Typography variant="body2">
										{org.address}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography variant={'caption'}>Postnummer</Typography>
									<Typography variant="body2">
										{org.zip}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography variant={'caption'}>By</Typography>
									<Typography variant="body2">
										{org.city}
									</Typography>
								</Grid>			
								<Grid item xs={12}>
									<Typography variant={'caption'}>Region</Typography>
									<Typography variant="body2">
										{org.region}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography variant={'caption'}>Land</Typography>
									<Typography variant="body2">
										{org.country?.length === 2 ? countries.getName(org.country, 'da') : org.country}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography variant={'caption'}>Hjemmeside</Typography>
									<Typography variant="body2">
										<Link href={org.website ? org.website : ''} target={'_blank'}>
											{org.website ? org.website : ''}
										</Link>
									</Typography>
								</Grid>

								{org.org.uuid ?
									<Grid item xs={12}>
										<Typography variant={'caption'}>Organisatorisk tilhørsforhold</Typography>
										<Typography variant="body2">
											{org.org.name}
										</Typography>
									</Grid>
									: null}

								{org.aux && org.aux.cvr ?
									<Grid item xs={12}>
										<Typography variant={'caption'}>CVR</Typography>
										<Typography variant="body2">
											{org.aux.cvr}
										</Typography>
									</Grid>
									: ""}
							</Grid>
							: "" }				
					</CardContent>
				</Card>
				: <CircularLoader fill />}
		</>
	)
}

export default AccountDetails;
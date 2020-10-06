import React from 'react';
import { Grid, Card, CardHeader, CardContent, Link, Typography } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import { useSelector } from 'react-redux';

var countries = require("i18n-iso-countries");
countries.registerLocale(require('i18n-iso-countries/langs/da.json'));

const AccountDetails = () => {
	const user = useSelector(s => s.user.user);

	return (
		<Card>
			<CardHeader
				title={`${user ? user.org.name : ""}`}
				titleTypographyProps={{ variant: 'h4' }}
				avatar={<BusinessIcon fontSize="large" />}
			/>
			<CardContent>
				{user ?
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant={'caption'}>Addresse</Typography>
							<Typography variant="body2">
								{user.org.address}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant={'caption'}>Postnummer</Typography>
							<Typography variant="body2">
								{user.org.zip}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant={'caption'}>By</Typography>
							<Typography variant="body2">
								{user.org.city}
							</Typography>
						</Grid>			
						<Grid item xs={12}>
							<Typography variant={'caption'}>Region</Typography>
							<Typography variant="body2">
								{user.org.region}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant={'caption'}>Land</Typography>
							<Typography variant="body2">
								{user.org.country?.length === 2 ? countries.getName(user.org.country, 'da') : user.org.country}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant={'caption'}>Hjemmeside</Typography>
							<Typography variant="body2">
								<Link href={user.org.website ? user.org.website : ''} target={'_blank'}>
									{user.org.website ? user.org.website : ''}
								</Link>
							</Typography>
						</Grid>

						{user.org.org.uuid ?
							<Grid item xs={12}>
								<Typography variant={'caption'}>Organisatorisk tilhørsforhold</Typography>
								<Typography variant="body2">
									{user.org.org.name}
								</Typography>
							</Grid>
							: null}

						{user.org.aux && user.org.aux.cvr ?
							<Grid item xs={12}>
								<Typography variant={'caption'}>CVR</Typography>
								<Typography variant="body2">
									{user.org.aux.cvr}
								</Typography>
							</Grid>
							: ""}
					</Grid>
					: "" }				
			</CardContent>
		</Card>
	)
}

export default AccountDetails;
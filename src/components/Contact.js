import React from 'react';
import { Card, CardHeader, CardContent, Typography, Link } from '@material-ui/core';

import buildingStyles from 'styles/buildingStyles';

const About = () => {
	const classes = buildingStyles();

	return (
		<>
			<Card className={classes.card}>
				<CardHeader
					title="Kontakt"
					titleTypographyProps={{ variant: 'h4' }}
				/>
				<CardContent>
					<Typography>
						Newsec Energi og Indeklima
						<br /><br />
						Building Performance Management
						<br /><br />
						Telefon: <Link href="tel:45260102">45260102</Link>

						<br /><br /><br />

						Vores åbningstider
						<br /><br />
						Mandag - torsdag kl. 9.00 - 16.00
						<br /><br />
						Fredag kl. 9.00 - 15.00
					</Typography>
				</CardContent>
			</Card>
		</>
	)
}

export default About;
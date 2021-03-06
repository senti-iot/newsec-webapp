import React from 'react';
import { Card, CardHeader, CardContent, Typography, Link } from '@material-ui/core';

import buildingStyles from 'styles/buildingStyles';

const About = () => {
	const classes = buildingStyles();

	return (
		<>
			<Card className={classes.card}>
				<CardHeader
					title="Om Newsec"
					titleTypographyProps={{ variant: 'h4' }}
				/>
				<CardContent>
					<Typography variant="body2">
						Newsec - The Full Service Property House in Northern Europe - tilbyder ejendomsejere, investorer og lejere et komplet udvalg af services inden for ejendomsrådgivning og ejendomsforvaltning. Newsec blev grundlagt i 1994 og er i dag et partnerejet selskab med ca. 1.800 medarbejdere fordelt på de syv nordiske og baltiske markeder. I 2018 åbnede Newsec et kontor i London for at assistere internationale investorer med interesse i Norden og Baltikum.
						<br /><br />
						Newsec Property Asset Management Denmark A/S
						<br /><br />
						Læs mere på <Link href="https://www.newsec.dk/" target="_blank">www.newsec.dk</Link>. Følg os på <Link href="https://www.linkedin.com/company/newsec/" target="_new">LinkedIn</Link> og <Link href="https://www.facebook.com/NewsecGroup" target="_blank">Facebook</Link>.
					</Typography>

					<Typography variant="h5" style={{ fontWeight: 'bold', marginTop: 20, marginBottom: 10 }}>Kontakt</Typography>
					<Typography variant="body2">
						Newsec Energi og Indeklima
						<br />
						Building Performance Management
						<br />
						Telefon: <Link href="tel:45260102">45260102</Link>

						<br /><br />

						Vores åbningstider
						<br />
						Mandag - torsdag kl. 9.00 - 16.00
						<br />
						Fredag kl. 9.00 - 15.00
					</Typography>
				</CardContent>
			</Card>
		</>
	)
}

export default About;
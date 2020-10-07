import React, { useEffect } from 'react';
import { Card, CardHeader, CardContent, List, ListItem, ListItemText, Grid  } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { useSelector, useDispatch } from 'react-redux';

import DSelect from 'components/ui/DSelect';
import { changeTRP } from 'redux/settings';
import { changeMainView, changeHeaderTitle } from 'redux/appState';

const Settings = () => {
	const dispatch = useDispatch();
	const trp = useSelector(s => s.appState.trp ? s.appState.trp : s.settings.trp)

	useEffect(() => {
		dispatch(changeHeaderTitle('Indstillinger'));
		dispatch(changeMainView(''));
	}, [dispatch]);

	let trps = [
		{ value: 5, label: 5 },
		{ value: 10, label: 10 },
		{ value: 15, label: 15 },
		{ value: 20, label: 20 },
		{ value: 25, label: 25 },
		{ value: 50, label: 50 },
		{ value: 100, label: 100 }
	]

	const _changeTRP = event => {
		console.log(event.target.value);
		dispatch(changeTRP(event.target.value));
	}

	return (
		<Card>
			<CardHeader
				title="Indstillinger"
				titleTypographyProps={{ variant: 'h4' }}
				avatar={<SettingsIcon fontSize="large" />}
			/>
			<CardContent>
				<Grid container>
					<List style={{ width: '100%' }}>
						<ListItem divider>
							<Grid container alignItems={'center'}>
								<ListItemText>Rækker per side i lister</ListItemText>
								<DSelect menuItems={trps} value={trp} onChange={(event) => _changeTRP(event)} />
							</Grid>
						</ListItem>
					</List>
				</Grid>
			</CardContent>
		</Card>
	)
}

export default Settings;
import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import AccountDetails from 'components/User/AccountDetails';
import AccountUsers from 'components/User/AccountUsers';
import { changeMainView, changeHeaderTitle } from 'redux/appState';

const Account = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(changeHeaderTitle('Kontodetaljer'));
		dispatch(changeMainView(''));
	}, [dispatch]);

	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<AccountDetails />
			</Grid>
			<Grid item xs={12}>
				<AccountUsers />
			</Grid>
		</Grid>
	)
}

export default Account;
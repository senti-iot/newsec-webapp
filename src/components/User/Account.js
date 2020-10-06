import React from 'react';
import { Grid } from '@material-ui/core';

import AccountDetails from 'components/User/AccountDetails';
import AccountUsers from 'components/User/AccountUsers';

const Account = () => {
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
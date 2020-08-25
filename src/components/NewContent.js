import React from 'react';
import { Button, Typography, Snackbar, SnackbarContent } from '@material-ui/core';
import Warning from '@material-ui/icons/Warning';
import { useSelector } from 'react-redux';

import mainStyles from 'styles/mainStyles';

// const Message = styled.span`
// 	color: #ffffff;
// 	display: flex;
// 	align-items: center;
// `

function NewContent(props) {
	const serviceWorkerUpdated = useSelector(s => s.serviceWorkerReducer.serviceWorkerUpdated)
	const classes = mainStyles();

	const handleClose = () => {
		window.location.reload();
	};

	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			open={serviceWorkerUpdated}
		>
			<SnackbarContent
				message={<span style={{ color: '#ffffff', display: 'flex', alignItems: 'center' }}>
					<Warning style={{ color: '#ffffff', fontSize: 16, marginRight: 8 }} />
					<Typography>{props.installing ? 'Caching application ...' : 'Update Available'}</Typography>
				</span>}
				action={<Button size="small" onClick={handleClose} className={classes.refreshButton}>REFRESH</Button>}
				className={classes.newContent}
			>
			</SnackbarContent>
		</Snackbar>
	);
}

export default NewContent
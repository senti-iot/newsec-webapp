import React from 'react';
import { Button, Typography, Snackbar, SnackbarContent } from '@material-ui/core';
import Warning from '@material-ui/icons/Warning';
// import { useSelector } from 'react-redux';
import { useClearCache } from "react-clear-cache";

import mainStyles from 'styles/mainStyles';

// const Message = styled.span`
// 	color: #ffffff;
// 	display: flex;
// 	align-items: center;
// `

function NewContent(props) {
	// const serviceWorkerUpdated = useSelector(s => s.serviceWorkerReducer.serviceWorkerUpdated)
	const classes = mainStyles();
	const { isLatestVersion, emptyCacheStorage } = useClearCache();

	const handleClose = () => {
		emptyCacheStorage();
	};

	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			open={!isLatestVersion}
		>
			<SnackbarContent
				message={<span style={{ color: '#ffffff', display: 'flex', alignItems: 'center' }}>
					<Warning style={{ color: '#ffffff', fontSize: 22, marginRight: 8 }} />
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
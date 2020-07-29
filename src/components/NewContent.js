import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Warning from '@material-ui/icons/Warning';
import { useSelector } from 'react-redux';

// const Message = styled.span`
// 	color: #ffffff;
// 	display: flex;
// 	align-items: center;
// `

function NewContent(props) {
	const serviceWorkerUpdated = useSelector(s => s.serviceWorkerReducer.serviceWorkerUpdated)
	const handleClose = () => {
		window.location.reload()
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
					<Warning style={{ color: '#ffffff', fontSize: 16, opacity: 0.9, marginRight: 8 }} />
					{props.installing ? 'Caching application ...' : 'Update Available'}
				</span>}
				action={<Button size="small" onClick={handleClose}>REFRESH</Button>}
			>
			</SnackbarContent>
		</Snackbar>
	);
}

export default NewContent
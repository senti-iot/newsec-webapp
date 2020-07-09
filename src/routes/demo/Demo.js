import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Button, List, ListItem, Grid } from '@material-ui/core'
import { getDemoData } from '../../redux/demo'

const Demo = props => {
	//Hooks
	const dispatch = useDispatch()
	//Redux
	const posts = useSelector(s => s.demoReducer.posts)
	const loading = useSelector(s => s.demoReducer.loading)
	//State

	//Const

	//useCallbacks

	//useEffects

	//Handlers
	const handleGetData = () => {
		dispatch(getDemoData())
	}
	return <Grid container style={{ padding: 30 }} justify={'center'} alignItems={'center'}>
		<Grid item xs={12} container justify={'center'} alignItems={'center'}>

			<Typography variant={'h5'}>
				{loading ? "Loading" : posts ? `There are: ${posts.length} posts` : "Not started yet"}
			</Typography>
		</Grid>
		<Grid item xs={12} container justify={'center'} alignItems={'center'}>
			<Button
				style={{ marginTop: 10 }}
				variant={'contained'}
				color={'primary'}
				onClick={handleGetData}>
				Get the posts
			</Button>
		</Grid>
		<Grid item xs={12}>

			<List>
				{posts ?
					posts.map(p =>
						<ListItem>{p.title}</ListItem>
					) : null}
			</List>
		</Grid>



	</Grid>

}


export default Demo
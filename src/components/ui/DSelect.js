import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { FormControl, Select, MenuItem, InputLabel, OutlinedInput, FormHelperText, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';

const DSelect = props => {
	//Hooks
	const theme = useTheme()

	//Redux

	//State
	let inputRef = useRef(null)
	const [labelWidth, setLabelWidth] = useState(0)

	//Const
	const { error, helperText, value, onKeyPress, margin, onChange, simple, menuItems, label, fullWidth, leftIcon, readOnly } = props
	let mobile = window.innerWidth < theme.breakpoints.values.md ? true : false

	//useCallbacks

	//useEffects
	useEffect(() => {
		setLabelWidth(ReactDOM.findDOMNode(inputRef.current).offsetWidth)

	}, [])
	//Handlers

	const getLabelWidth = () => {
		if (inputRef.current) {
			return labelWidth
		}
		else {
			return 0
		}
	}

	return (
		<FormControl variant="outlined" margin={margin} fullWidth={mobile || fullWidth}>
			<InputLabel ref={inputRef}
				color={'primary'} htmlFor='select-multiple-chip'>
				{label}
			</InputLabel>
			<Select
				readOnly={readOnly}
				variant={'outlined'}
				fullWidth={mobile || fullWidth}
				value={value}
				error={error}
				onChange={onChange}
				input={<OutlinedInput labelWidth={getLabelWidth()} variant={'outlined'} />}
				onKeyPress={onKeyPress}
			>
				{!simple && menuItems.map((m, i) => {
					return <MenuItem key={i} value={m.value}>
						<Grid container justify={'space-between'} alignItems={'center'}>
							{leftIcon ? <Grid item style={{ display: 'flex', marginRight: 8 }}>{m.icon ? m.icon : null}</Grid> : null}
							<Grid item xs>{m.label}</Grid>
							{!leftIcon ? <Grid item>{m.icon ? m.icon : null}</Grid> : null}
						</Grid>
					</MenuItem>
				})}
				{simple && menuItems.map((m, i) => {
					return <MenuItem key={i} value={m}>
						<Grid container justify={'space-between'} alignItems={'center'}>
							<Grid item xs>{m}</Grid>
						</Grid>
					</MenuItem>
				})}
			</Select>
			{helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
		</FormControl>
	)

}

export default DSelect;
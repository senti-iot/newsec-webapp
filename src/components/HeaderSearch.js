import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import moment from 'moment';

import mainStyles from 'styles/mainStyles';

const HeaderSearch = () => {
	const classes = mainStyles();
	const history = useHistory();

	const [key, setKey] = useState(moment().toISOString());

	const buildings = useSelector(s => s.buildingsReducer.buildings);

	const filterOptions = createFilterOptions({
		stringify: (option) => option.name + ' ' + option.streetName + ' ' + option.city + ' ' + option.houseNumber + ' ' + option.grouptype + ' ' + option.zipcode,
	});

	return (
		<>
			{ buildings ?
				<Autocomplete
					id="building-search"
					key={key}
					freeSolo
					options={buildings}
					getOptionLabel={(option) =>
						typeof option === 'string' ? option : option.name
					}
					filterOptions={filterOptions}
					onChange={(event, option) => {
						if (event.keyCode === 13 && (!option || typeof option !== 'object')) {
						} else if (option) {
							setKey(moment().toISOString());
							history.push('/building/' + option.uuid);
						}
					}}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Søg bygninger"
							margin="dense"
							variant="filled"
							InputProps={{ ...params.InputProps, className: classes.searchInput }}
							classes={{ root: classes.searchInputRoot }}

						/>
					)}
				/>
				: ""}
		</>
	)
}

export default HeaderSearch;
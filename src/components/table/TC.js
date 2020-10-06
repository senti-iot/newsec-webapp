import React from 'react';
import { TableCell, Typography } from '@material-ui/core';
import classNames from 'classnames';

import tableStyles from 'styles/tableStyles';

const TC = (props) => {
	const classes = tableStyles();

	const { checkbox, noCheckbox, label, content, className, center, FirstC, ...rest } = props;
	let tcClasses = classNames({
		[className]: className,
		[classes.tableCellCheckbox]: checkbox,
		[classes.tableCell]: true,
		[classes.tablecellPadding]: noCheckbox
	})

	return (
		<TableCell classes={{ root: tcClasses }}
			{...rest}
		>
			{(label !== null || label !== undefined) ? <Typography variant={'body1'} classes={{ root: classes.paragraphCell + ' ' + (center ? classes.center : '') }}>
				{label}
			</Typography> : null}
			{content ? content : null}
		</TableCell>
	);
}

export default TC;

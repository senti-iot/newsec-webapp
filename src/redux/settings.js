const autoRowsPerPage = 'autoRowsPerPage'

let initialState = {
	rowsPerPageOptions: [10, 15, 20, 25, 50, 100],
	trp: 10,
};

export const settings = (state = initialState, action) => {
	switch (action.type) {
		case autoRowsPerPage:
			let newRowsPerPage = [...initialState.rowsPerPageOptions]
			newRowsPerPage[0] = action.payload
			return Object.assign({}, state, { rowsPerPageOptions: [...newRowsPerPage] })
		default:
			return state;
	}
}

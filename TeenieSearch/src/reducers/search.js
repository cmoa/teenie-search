
let initialState = {
	term: "",
	query: "",
	results: [],
} 

export function search (state, action) {
	console.log(action);
	switch (action.type) {
		case "SEARCH": 
			newState = Object.assign({}, initialState, { term: action.term });
			return newState;
		default:
			return state || initialState;
	}
};
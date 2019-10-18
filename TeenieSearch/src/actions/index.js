

export function search(term) {
	return {
		type: "SEARCH",
		term,
	};
}
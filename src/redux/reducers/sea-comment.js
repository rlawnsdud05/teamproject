const initialState = [];

const seaComment = (state = initialState, action) => {

	switch (action.type) {
		case 'ADD_COMMENT_SUCCEEDED':
			return [action.payload, ...state];
		case 'MODIFY_COMMENT_SUCCEEDED':
			return state.map(eachComment => eachComment.id === action.payload.id ? { ...action.payload } : eachComment);
		case 'REMOVE_COMMENT_SUCCEEDED':
			return state.filter(eachComment => eachComment.id !== action.payload);
		case 'FETCH_COMMENT_SUCCEEDED':
			return [...action.payload];
		default:
			return state;
	}

}
export default seaComment;
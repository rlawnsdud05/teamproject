const initialState = [];

const contact = (state = initialState, action) => {

	switch (action.type) {
		case "ADD_CONTACT_SUCCEDED":
			return [action.payload, ...state]; /*action.payload의 값이 왜 state객체 내용을 다 담고 있는가? */
		case "SAVE_CONTACTROW_SUCCEDED":
			return state.map((contactRow) => contactRow.id === action.payload.id ? { ...action.payload } : contactRow);
		case "REMOVE_CONTACTROW_SUCCEDED":
			return state.filter((contactRow) => contactRow.id !== action.payload);
		case "FETCH_CONTACTDATA_SUCCEEDED":
			return [...action.payload];
		default:
			return state;
	}

}

export default contact;
const initialState = [];

const contact = (state = initialState, action) => {

	switch (action.type) {
		case "ADD_PERSONINFO":
			return [{ ...action.payload }, ...state]; /*action.payload의 값이 왜 state객체 내용을 다 담고 있는가? */
		case "SAVE_MODEFIED_PERSONINFO":
			return state.map((personInfo) => personInfo.id === action.payload.id ? { ...action.payload } : personInfo);
		case "REMOVE_PERSONINFO":
			return state.filter((personInfo) => personInfo.id !== action.payload);
		case "FETCH_CONTACTDATA_SUCCEEDED":
			return [...action.payload];
		default:
			return state;
	}

}

export default contact;
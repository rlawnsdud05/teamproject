//paging에서 받아오는 데이터 형태가 객체임
const initialState = {
	content: [],
	page: 0,
	size: 10,
	totalElement: 0,
};

const seaComment = (state = initialState, action) => {

	switch (action.type) {
		case 'MODIFY_COMMENT_SUCCEEDED':
			{
				//기존 상태
				const newState = { ...state };
				newState.content = state.content.map((seaWaterComment) =>
					seaWaterComment.id === action.payload.id ? { ...action.payload } : seaWaterComment
				);
				return newState
			}
		case 'FETCH_SEACOMMENT_PAGING_SUCCEEDED':
			return {
				content: action.payload.content,
				page: action.payload.number,
				size: action.payload.size,
				totalElements: action.payload.totalElements,
			};
		default:
			return state;
	}

}
export default seaComment;
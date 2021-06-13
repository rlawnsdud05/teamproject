// todoList 상태를 관리하는 reducer(todo)만들기
const initialState = [];





//컴포넌트가 아닌 일반적인 모듈은 이름은 소문자로 작성
// todo = state, action을 매개변수로 받는 함수/ action이 뭐야?
//   redux에서 state는 변화되기 전 state 객체
const todo = (state = initialState, action) => {

	/* action이 갖고 있는 명령어의 종류(type)에 따라서 state 변경 로직을 실행 */
	/* action 구조 : {type:'명령어', payload:'메시지(컴포넌트간·시스템간 전송하는 데이터)'} => command pattern = */

	switch (action.type) {
		case "ADD_TODO_SUCCEEDED":
			//return 값으로 변동된 state를 return
			return [{ ...action.payload }, ...state]; /* -> action {type: 'ADD_TODO', payload: {id:1, memo: 'redux 공부'}} */

		case "REMOVE_TODO_SUCCEEDED":
			return state.filter(todo => todo.id !== action.payload); /* action= {type: "REMOVE_TODO, payload:1"} */

		case "MODITY_TODO_SUCCEEDED":
			return state.map(todo => todo.id === action.payload.id ? { ...action.payload } : todo);/* action= {type: "REMOVE_TODO, payload:{id:1, memo: "Redux 공부하기"}}"}  */

		//서버에서 받아온 데이터를 state로 변경
		case "FETCH_TODOLIST_SUCCEEDED":
			return [...action.payload];
		default:
			return state;
	}
}

export default todo;
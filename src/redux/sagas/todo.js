
//action에 대해서 중간에 가로채기하여 처리하는 saga
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import api from '../../api/todo';


function* addTodo(action) {

	//0.  처리중입니다. 메시지표시
	//ui 주소: https://material-ui.com/components/progress/#progress 

	//1. 서버의 REST API를 호출함
	//         ┌ call: 비동기 함수를 호출하는 이펙트
	// yield call(비동기함수, 매개변수1, 매개변수2, ....)
	//api.add(action.payload).then(result => result);
	//AJAX기술을 적용시켜 서버와 통신하여 ACTION 객체() 전달.

	try {

		const result = yield call(api.add, action.payload);
		console.log(result);
		// //2. API 호출이 완료되면 state를 변경함
		//        ┌put: reducer에 state를 변경하는(dispatch) 이벤트
		// yield put({
		// 	type: "ADD_TODO_SUCCEEDED",
		// 	payload: { id: result.data.id, ...action.payload },
		// });

		//strore에 dispatch하는 단계(서버에 action값 전달한 후에 )
		yield put({ type: "ADD_TODO_SUCCEEDED", payload: { id: result.data.id, ...action.payload } });
	} catch (e) {
		alert(e.message);
	}
	//3. 처리중입니다. 메시지 숨기기

}

function* removeTodo(action) {
	//call 함수를 사용하면 api.remove() 함수에 매개변수로 action.payload를 넣어 준다.
	console.log('ajax적용 서버 통신');
	yield call(api.remove, action.payload);
	console.log('통신완료');


	yield put({ type: "REMOVE_TODO_SUCCEEDED", payload: action.payload });

}

function* saveTodoList(action) {
	console.log('비동기 통신 시작');
	const result = yield call(api.modify, action.payload);
	console.log('비동기 완료' + result);
	console.log('dispatch 시작');
	yield put({ type: "MODITY_TODO_SUCCEEDED", payload: result.data });

}

function* fetchTodoList() {


	//1. 서버에서 데이터 받아오기
	const result = yield call(api.fetch);


	//2. 받아온 데이터로 state 변경
	yield put({ type: "FETCH_TODOLIST_SUCCEEDED", payload: result.data });
}

//todo list와 관련된 액션이 dispatch되면 가로채오는 역할 
function* todoSaga() {
	//takeEvery: dispatch하는 특정 타입의 모든 action에 대해 처리함
	//takeLatest: 가장 나중에 dispatch하는 action에 대해 처리함
	//takeEvery or takeLatest 같은 애들을 react-saga에서는 effect라고 부른다.

	yield takeEvery("ADD_TODO", addTodo);
	yield takeEvery("REMOVE_TODO", removeTodo);
	yield takeEvery("MODIFY_TODO", saveTodoList);
	yield takeLatest("FETCH_TODOLIST", fetchTodoList);



}
export { addTodo };
export default todoSaga;
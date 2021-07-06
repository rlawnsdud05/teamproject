import { call, put, select, takeEvery, takeLatest } from '@redux-saga/core/effects';
import api from '../../api/sea-comment';

function* addSeaWaterComment(action) {
	try {
		//1. 서버에 데이터 추가
		yield call(api.add, action.payload);

		//2. 서버에서 추가된 데이터를 다시 받아옴
		const { size } = yield select(state => state.seaComment);
		const resultFetched = yield call(api.fetchPaging, 0, size);

		//3. 받아온 데이터로 state 변경
		yield put({ type: 'FETCH_SEACOMMENT_PAGING_SUCCEEDED', payload: resultFetched.data });
	} catch (e) {
		alert(e.message);
	}
}

function* modifySeaWaterComment(action) {
	try {
		//console.log('---수정 api 실행---');
		const result = yield call(api.modify, action.payload);
		//console.log(result.data);
		//result.data = {id: 64, comment: "zzzzz", phone: null}  수정한 객체
		yield put({ type: 'MODIFY_COMMENT_SUCCEEDED', payload: result.data });
	} catch (e) {
		alert(e);
	}
}

function* removeSeaWaterComment(action) {
	try {
		yield call(api.remove, action.payload);

		const { page, size } = yield select(state => state.seaComment);
		const resultFetched = yield call(api.fetchPaging, page, size);

		//3. 받아온 데이터로 state 변경
		yield put({ type: 'FETCH_SEACOMMENT_PAGING_SUCCEEDED', payload: resultFetched.data });
	} catch (e) {
		alert(e);
	}
}

function* fetchSeaCommentPaging(action) {
	//console.log("saga에서 action 가로채고" + action);
	try {

		//useSelector은 state 가져오기, state변경에 대한 대기, 변경되면 컴포넌트 업데이트
		//반면에 Select는 그냥 현재 상태 가져오기
		const { page, size } = yield select((state) => state.seaComment);
		const result = yield call(api.fetchPaging, action.payload ? action.payload.page : page, action.payload ? action.payload.size : size);
		//console.log(result);
		yield put({ type: 'FETCH_SEACOMMENT_PAGING_SUCCEEDED', payload: result.data });
	} catch (e) {
		alert(e.message);
	}



}

function* seaCommentSaga() {
	yield takeEvery('ADD_SEAWATER_COMMENT', addSeaWaterComment);
	yield takeEvery('MODIFY_SEAWATER_COMMENT', modifySeaWaterComment);
	yield takeEvery('REMOVE_SEAWATER_COMMENT', removeSeaWaterComment);
	yield takeLatest("FETCH_SEACOMMENT_PAGING", fetchSeaCommentPaging);
}
export default seaCommentSaga;
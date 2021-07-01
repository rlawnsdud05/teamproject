import { call, put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import api from '../../api/sea-comment';

function* addSeaWaterComment(action) {
	//console.log('----add 실행----')
	yield call(api.add, action.payload);
	// console.log(result);
	// console.log(result.data);
	yield put({ type: 'ADD_COMMENT_SUCCEEDED', payload: action.payload });
}

function* modifySeaWaterComment(action) {
	try {
		console.log('---수정 api 실행---');
		const result = yield call(api.modify, action.payload);
		yield put({ type: 'MODIFY_COMMENT_SUCCEEDED', payload: result.data });
	} catch (e) {
		alert(e);
	}
}

function* removeSeaWaterComment(action) {
	try {
		yield call(api.remove, action.payload);
		yield put({ type: 'REMOVE_COMMENT_SUCCEEDED', payload: action.payload });
	} catch (e) {
		alert(e);
	}
}

function* fetchSeaWaterComment(action) {

	//console.log('---api실행---');
	const result = yield call(api.fetch);
	//console.log(result);


	yield put({ type: 'FETCH_COMMENT_SUCCEEDED', payload: result.data });

}

function* seaCommentSaga() {
	yield takeEvery('ADD_SEAWATER_COMMENT', addSeaWaterComment);
	yield takeEvery('MODIFY_SEAWATER_COMMENT', modifySeaWaterComment);
	yield takeEvery('REMOVE_SEAWATER_COMMENT', removeSeaWaterComment);
	yield takeLatest('FETCH_SEAWATER_COMMENT', fetchSeaWaterComment);
}
export default seaCommentSaga;
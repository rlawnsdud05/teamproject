import { call, put, takeLatest } from "@redux-saga/core/effects";
import api from "../../api/contact";

function* fetchContactTable(action) {
	console.log('데이터 가져오기');
	console.log(call(api.fetch));
	const result = yield call(api.fetch);

	console.log('데이터 가져오기');
	yield put({ type: "FETCH_CONTACTDATA_SUCCEEDED", payload: result.data });
}

function* contactSaga() {
	yield takeLatest("FETCH_CONTACTDATA", fetchContactTable);
}
export default contactSaga;
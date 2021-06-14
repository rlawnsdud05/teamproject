import { call, put, takeLatest } from "@redux-saga/core/effects";
import { takeEvery } from "redux-saga/effects";
import api from "../../api/contact";

function* addContactRow(action) {
	try {
		const result = yield call(api.add, action.payload);
		console.log(result);
		yield put({ type: "ADD_CONTACT_SUCCEDED", payload: { id: result.data.id, name: action.payload.name, phone: action.payload.phone, email: action.payload.email } });
	} catch (e) {
		alert(e.message);
	}
}

function* saveContactRow(action) {

	yield call(api.save, action.payload);

	yield put({ type: "SAVE_CONTACTROW_SUCCEDED", payload: action.payload });

}

function* removeContactRow(action) {
	try {
		yield call(api.remove, action.payload);
		yield put({ type: "REMOVE_CONTACTROW_SUCCEDED", payload: action.payload });
	} catch (e) {
		alert(e.message);
	}
}

function* fetchContactTable(action) {

	const result = yield call(api.fetch);


	yield put({ type: "FETCH_CONTACTDATA_SUCCEEDED", payload: result.data });
}

function* contactSaga() {
	yield takeEvery("ADD_CONTACTROW", addContactRow);
	yield takeEvery("SAVE_CONTACTROW", saveContactRow);
	yield takeEvery("REMOVE_CONTACTROW", removeContactRow);
	yield takeLatest("FETCH_CONTACTDATA", fetchContactTable);
}
export default contactSaga;
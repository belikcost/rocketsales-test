import { takeEvery, call, put } from 'redux-saga/effects';

import { API_URL, GET_LEADS_REQUEST } from "../constants";
import { getLeadsSuccess } from "../redux/actions";


const getLeadsFetch = (data) => {
    return fetch(`${API_URL}/leads`).then(res => res.json());
}

function* getLeads(action) {
    const result = yield call(getLeadsFetch, action.payload);
    yield put(getLeadsSuccess(result));
}

export default function* getLeadsWatcher() {
    yield takeEvery(GET_LEADS_REQUEST, getLeads);
}
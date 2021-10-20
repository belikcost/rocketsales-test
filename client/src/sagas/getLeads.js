import { takeEvery, call, put } from 'redux-saga/effects';

import { API_URL, GET_LEADS_REQUEST } from "../constants";
import { getLeadsFail, getLeadsSuccess } from "../redux/actions";


const getLeadsFetch = (searchString) => {
    let url = `${API_URL}/leads`;

    if (searchString !== undefined) {
        url += `?query=${searchString}`
    }

    return fetch(url).then(response => {
        if (response.status !== 200) {
            throw new Error;
        } else {
            return response.json();
        }
    });
}

function* getLeads(action) {
    try {
        const result = yield call(getLeadsFetch, action.payload);
        yield put(getLeadsSuccess(result));
    } catch (e) {
        yield put(getLeadsFail(e));
    }
}

export default function* getLeadsWatcher() {
    yield takeEvery(GET_LEADS_REQUEST, getLeads);
}
import { all, call } from 'redux-saga/effects';

import getLeadsWatcher from "./getLeads";


export default function* mainSaga() {
    yield all([
        call(getLeadsWatcher),
    ]);
}
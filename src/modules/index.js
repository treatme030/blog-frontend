import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import loading from "./loading";
import write from "./write";

const rootReducer = combineReducers({
    auth,
    user,
    loading,
    write,
})

export function* rootSaga() {
    yield all([authSaga(), userSaga()])
}

export default rootReducer;
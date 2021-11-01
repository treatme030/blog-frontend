import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import auth, { authSaga } from "./auth";
import user, { userSaga } from "./user";
import loading from "./loading";
import write, { writeSaga } from "./write";
import post, { postSaga } from "./post";

const rootReducer = combineReducers({
    auth,
    user,
    loading,
    write,
    post,
})

export function* rootSaga() {
    yield all([authSaga(), userSaga(), writeSaga(), postSaga()])
}

export default rootReducer;
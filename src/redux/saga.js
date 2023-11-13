import { put, takeEvery, call, all } from "redux-saga/effects";
import {
  FETCH_CONTENT_DATA,
  FETCH_CONTENT_DATA_SUCCESS,
  FETCH_CONTENT_DATA_FAILURE,
} from "./actions.js";
import fetchDataApi from "./api.js";
import { API_BASE_URL } from "../constants/constants.js";

//worker saga to fetch data
export function* fetchContentData(action) {
  try {
    const params = { url: API_BASE_URL, pageNo: action.payload };
    const response = yield call(fetchDataApi, params);
    if (response.page) {
      yield put({ type: FETCH_CONTENT_DATA_SUCCESS, response });
    } else {
      const error = { response };
      yield put({ type: FETCH_CONTENT_DATA_FAILURE, error });
    }
  } catch (error) {
    yield put({ type: FETCH_CONTENT_DATA_FAILURE, error });
  }
}

//watcher saga
export function* watchFetchContentData() {
  yield takeEvery(FETCH_CONTENT_DATA, fetchContentData);
}

export default function* rootSaga() {
  yield all([watchFetchContentData()]);
}

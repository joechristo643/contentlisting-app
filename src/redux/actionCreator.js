import { FETCH_CONTENT_DATA, FETCH_CONTENT_DATA_FAILURE, FETCH_CONTENT_DATA_SUCCESS } from "./actions";
export function takeFetchContentData(pageNumber) {
    return { type: FETCH_CONTENT_DATA, payload: pageNumber };
}
export function takeFetchContentDataSuccess(response) {
    return { type: FETCH_CONTENT_DATA_SUCCESS, data: response };
}
export function takeFetchContentDataFailure(error) {
    return { type: FETCH_CONTENT_DATA_FAILURE, error: error };
}
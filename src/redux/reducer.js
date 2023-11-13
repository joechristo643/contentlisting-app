import {
  FETCH_CONTENT_DATA,
  FETCH_CONTENT_DATA_FAILURE,
  FETCH_CONTENT_DATA_SUCCESS,
} from "./actions";

const initialState = {
  title: "",
  pageNumber: 0,
  pageSize: 0,
  totalItems: 0,
  content: [],
  loading: false,
  error: "",
};
function myReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONTENT_DATA:
      return { ...state, loading: true, pageNumber: action.payload };
    case FETCH_CONTENT_DATA_SUCCESS:
      const data = action.response;
      return {
        ...state,
        loading: false,
        title: data.page.title,
        content: [
          ...state.content,
          ...data["page"]["content-items"]["content"],
        ],
        pageSize: Number(data["page"]["page-size-requested"]),
        totalItems: Number(data["page"]["total-content-items"]),
      };
    case FETCH_CONTENT_DATA_FAILURE:
      const errorMessage = action.error?.response?.error?.message;
      return { ...state, loading: false, error: errorMessage };

    default:
      return state;
  }
}

export default myReducer;

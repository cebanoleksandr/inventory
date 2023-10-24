/* eslint-disable @typescript-eslint/no-explicit-any */
const SET_QUERY = 'SET_QUERY';

const initialState: InitialState = {
  query: '',
};

type InitialState = {
  query: string,
};

const filterReducer = (
  state = initialState,
  action: ActionTypes,
): InitialState => {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
  
    default:
      break;
  }
  return state;
}

//action creators
export const setQuery = (query: string): SetQuery => {
  return {
    type: SET_QUERY,
    payload: query,
  }
}

type SetQuery = {
  type: typeof SET_QUERY,
  payload: string,
}

type ActionTypes = SetQuery;

export default filterReducer;

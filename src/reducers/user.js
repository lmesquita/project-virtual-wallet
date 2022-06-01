import { USER_DATA } from '../actions/index';

const initialState = {
  email: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case USER_DATA:
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default user;

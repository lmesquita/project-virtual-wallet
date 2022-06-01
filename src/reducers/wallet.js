import {
  WALLET_EXPENSES,
  WALLET_CURRENCIES,
  EDIT_EXPENSE,
  UPDATE_EXPENSE,
} from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  idToEdit: null,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case WALLET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case WALLET_EXPENSES:
    return {
      ...state,
      expenses: action.expenses,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      idToEdit: action.idToEdit,
    };
  case UPDATE_EXPENSE:
    return {
      ...state,
      idToEdit: null,
      expenses: action.expenses,
    };
  default:
    return state;
  }
};

export default wallet;

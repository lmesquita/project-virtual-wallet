import makeFetchApi from '../services/FetchApi';

export const USER_DATA = 'USER_DATA';
export const WALLET_EXPENSES = 'WALLET_EXPENSES';
export const WALLET_CURRENCIES = 'WALLET_CURRENCIES';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

export const setUserData = (value) => (
  {
    type: USER_DATA,
    ...value,
  }
);

export const setWalletCurrencies = (value) => (
  {
    type: WALLET_CURRENCIES,
    ...value,
  }
);

export const setWalletExpenses = (value) => (
  {
    type: WALLET_EXPENSES,
    ...value,
  }
);

export const editExpenseId = (value) => (
  {
    type: EDIT_EXPENSE,
    ...value,
  }
);

export const updateExpense = (value) => (
  {
    type: UPDATE_EXPENSE,
    ...value,
  }
);

const fetchApiCoin = async (dispatch) => {
  const coinResponse = await makeFetchApi();
  const keysList = Object.keys(coinResponse);
  const currencies = keysList.filter((code) => code !== 'USDT');
  dispatch(setWalletCurrencies({ currencies }));
  return coinResponse;
};

export const actionFetch = () => fetchApiCoin;

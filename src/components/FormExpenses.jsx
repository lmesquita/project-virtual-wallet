import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionFetch, setWalletExpenses, updateExpense } from '../actions';

const INITIAL_CURRENCY = 'USD';
const INITIAL_METHOD = 'Dinheiro';
const INITIAL_TAG = 'Alimentação';

class FormExpenses extends React.Component {
  constructor() {
    super();

    this.state = {
      expenseObj: {
        value: 0,
        currency: INITIAL_CURRENCY,
        method: INITIAL_METHOD,
        tag: INITIAL_TAG,
        description: '',
      },
    };
  }

  componentDidMount() {
    const { makeFetch } = this.props;
    makeFetch();
  }

  handleChange = ({ target }) => {
    const { expenseObj } = this.state;
    this.setState({
      expenseObj: {
        ...expenseObj,
        [target.name]: (target.value),
      },
    });
  };

  clearState = () => {
    this.setState({
      expenseObj: {
        value: 0,
        currency: INITIAL_CURRENCY,
        method: INITIAL_METHOD,
        tag: INITIAL_TAG,
        description: '',
      },
    });
  };

  saveStateRedux = () => {
    const { expenseObj } = this.state;
    const { WALLET_EXPENSES, expenses } = this.props;
    WALLET_EXPENSES({
      expenses: [...expenses, expenseObj],
    });
    this.clearState();
  };

  handleClick = async () => {
    const { expenseObj } = this.state;
    const { makeFetch, expenses } = this.props;
    this.setState({
      expenseObj: {
        ...expenseObj,
        id: expenses.length,
        exchangeRates: await makeFetch(),
      },
    }, this.saveStateRedux);
  };

  clickToEdit = () => {
    const { expenses, idToEdit, UPDATE_EXPENSE } = this.props;
    const { expenseObj: {
      value,
      currency,
      method,
      tag,
      description,
    } } = this.state;
    const auxArray = [...expenses];
    auxArray[idToEdit].value = value;
    auxArray[idToEdit].currency = currency;
    auxArray[idToEdit].method = method;
    auxArray[idToEdit].tag = tag;
    auxArray[idToEdit].description = description;
    UPDATE_EXPENSE({ expenses: auxArray });
    this.clearState();
  };

  render() {
    const { currencies, idToEdit } = this.props;
    const {
      expenseObj: {
        value,
        currency,
        description,
        method,
        tag,
      },
    } = this.state;
    return (
      <div>
        <label htmlFor="value-input">
          Valor:
          <input
            name="value"
            type="number"
            data-testid="value-input"
            id="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            name="currency"
            id="currency-input"
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ currency }
          >
            { currencies.map((currencie) => (
              <option key={ currencie } value={ currencie }>{ currencie }</option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento
          <select
            name="method"
            data-testid="method-input"
            id="method-input"
            onChange={ this.handleChange }
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria
          <select
            name="tag"
            data-testid="tag-input"
            id="tag-input"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            name="description"
            type="text"
            data-testid="description-input"
            id="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          onClick={
            idToEdit === null
              ? this.handleClick
              : this.clickToEdit
          }
        >
          {
            idToEdit === null
              ? 'Adicionar despesa'
              : 'Editar Despesa'
          }
        </button>
      </div>
    );
  }
}

FormExpenses.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  expenses: PropTypes.arrayOf(
    PropTypes.shape(
    ),
  ),
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  makeFetch: () => dispatch(actionFetch()),
  WALLET_EXPENSES: (value) => dispatch(setWalletExpenses(value)),
  UPDATE_EXPENSE: (value) => dispatch(updateExpense(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormExpenses);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setWalletExpenses, editExpenseId } from '../actions';

class ExpensesTable extends React.Component {
  getTax = (value) => parseFloat(value).toFixed(2);

  convertValue = (value, exchange) => {
    const calc = parseFloat(value) * parseFloat(exchange);
    return this.getTax(calc);
  }

  deleteExpense = (idExpense) => {
    const { expenses, WALLET_EXPENSES } = this.props;
    const arrayExpenses = expenses.filter((expense) => expense.id !== idExpense);
    WALLET_EXPENSES({ expenses: arrayExpenses });
  };

  editExpense = (idExpense) => {
    const { EDIT_EXPENSE } = this.props;
    EDIT_EXPENSE({ idToEdit: idExpense });
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          {(
            expenses.length > 0
              ? (
                <tbody>
                  {(
                    expenses.map((expense) => (
                      <tr key={ expense.id }>
                        <td>{ expense.description }</td>
                        <td>{ expense.tag }</td>
                        <td>{ expense.method }</td>
                        <td>{ this.getTax(expense.value) }</td>
                        <td>
                          {
                            expense.exchangeRates[expense.currency].name
                          }
                        </td>
                        <td>
                          {
                            this.getTax(expense.exchangeRates[expense.currency].ask)
                          }
                        </td>
                        <td>
                          {
                            this.convertValue(expense.value,
                              expense.exchangeRates[expense.currency].ask)
                          }
                        </td>
                        <td>Real</td>
                        <td>
                          <button
                            type="button"
                            data-testid="edit-btn"
                            onClick={ () => this.editExpense(expense.id) }
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            data-testid="delete-btn"
                            onClick={ () => this.deleteExpense(expense.id) }
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              )
              : <tbody />
          )}
        </table>
      </div>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.number,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    description: PropTypes.string,
  })),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  WALLET_EXPENSES: (value) => dispatch(setWalletExpenses(value)),
  EDIT_EXPENSE: (value) => dispatch(editExpenseId(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);

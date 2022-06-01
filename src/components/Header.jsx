import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  getTotalExpenses = (expenses) => {
    let sum = 0;
    if (expenses.length > 0) {
      expenses.forEach((expense) => {
        if (expense.exchangeRates) {
          const curCoin = expense.currency;
          sum = (parseFloat(expense.value) * expense.exchangeRates[curCoin].ask) + sum;
        }
      });
      return sum.toFixed(2);
    }
  };

  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <h5 data-testid="email-field">
          Email:
          { email }
        </h5>
        <h5 data-testid="total-field">
          {
            expenses.length === 0
              ? '0'
              : this.getTotalExpenses(expenses)
          }
        </h5>
        <h5 data-testid="header-currency-field">BRL</h5>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
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
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

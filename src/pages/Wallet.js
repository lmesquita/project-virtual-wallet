import React from 'react';
import Header from '../components/Header';
import ExpensesTable from '../components/ExpensesTable';
import FormExpenses from '../components/FormExpenses';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <FormExpenses />
        <ExpensesTable />
      </>
    );
  }
}

export default Wallet;

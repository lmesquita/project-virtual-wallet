import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setUserData } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      isDisable: true,
      email: '',
      validEmail: false,
      validPassword: false,
      redirectTo: null,
    };
  }

  handleLogin = ({ target }) => {
    const getLoginInput = target.value;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(getLoginInput)) {
      this.setState({ validEmail: false }, this.verifyValidations);
    } else {
      this.setState({ validEmail: true }, this.verifyValidations);
    }
    this.setState({ email: getLoginInput });
  };

  handlePassword = ({ target }) => {
    const MIN_CHAR = 6;
    const getPasswordInput = target.value;
    if (getPasswordInput.length >= MIN_CHAR) {
      this.setState({ validPassword: true }, this.verifyValidations);
    } else {
      this.setState({ validPassword: false }, this.verifyValidations);
    }
  };

  verifyValidations = () => {
    const { validEmail, validPassword } = this.state;
    this.setState({
      isDisable: !(validEmail && validPassword),
    });
  };

  handleClick = () => {
    const { USER_DATA } = this.props;
    USER_DATA(this.state);
    this.setState({ redirectTo: '/carteira' });
  };

  render() {
    const { isDisable, email, redirectTo } = this.state;

    if (redirectTo) {
      return (
        <Redirect to={ redirectTo } />
      );
    }

    return (
      <div>
        <input
          type="email"
          data-testid="email-input"
          placeholder="Digite seu email"
          value={ email }
          onChange={ this.handleLogin }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Digite sua senha"
          onChange={ this.handlePassword }
        />
        <button
          type="button"
          disabled={ isDisable }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  USER_DATA: (value) => dispatch(setUserData(value)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  USER_DATA: PropTypes.func,
}.isRequired;

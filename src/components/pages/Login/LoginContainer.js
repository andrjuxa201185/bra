import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as validator from '../../../helpers/validator';
import { login } from '../../../store/auth/authActions';
import {trimFieldsData} from '../../../utils';
import LoginView from './LoginView';
import { globals } from "../../../store/globals";

class LoginContainer extends Component {
  state = {
    fields: {
      email: '',
      password: '',
    },
    errors: {},
  };

  validator = {
    required: ['email', 'password'],
    custom: [
      validator.email(['email']),
    ],
  };

  handleChange = field => e => this.setState({
    fields: {...this.state.fields, [field]: e.target.value},
    errors: {},
  });

  navTo = route => e => {
    e.preventDefault();
    globals.history.push(route);
  };

  handleSubmit = () => {
    const {fields} = this.state;
    const {errors} = validator.validate(this.validator, fields);
    this.setState({errors});
    if (!Object.keys(errors).length) {
      this.props.login({...trimFieldsData(fields)});
    }
  };

  render() {
    const {errors} = this.state;

    return (
      <LoginView
        errors={errors}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        navTo={this.navTo}
      />
    );
  }
}

LoginContainer.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  login: login.request,
}, dispatch);

export default connect(null, mapDispatchToProps)(LoginContainer);

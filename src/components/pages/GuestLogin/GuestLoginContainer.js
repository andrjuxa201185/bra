import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import {guestLogin} from '../../../store/auth/authActions';
import * as validator from '../../../helpers/validator';
import {trimFieldsData} from '../../../utils';
import GuestLoginView from './GuestLoginView';
import {globals} from "../../../store/globals";

class GuestLoginContainer extends Component {

  state = {
    fields: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeat_password: '',
      isAgree: false,
    },
    errors: {},
  };

  validator = {
    required: ['firstName', 'lastName', 'email', 'password', 'password', 'repeat_password', 'isAgree'],
    custom: [
      validator.email(['email']),
      validator.samePasswords(['password', 'repeat_password']),
      validator.password(['password']),
    ],
  };

  navTo = route => e => {
    e.preventDefault();
    globals.history.push(route);
  };

  handleChange = field => e => this.setState({
    fields: {...this.state.fields, [field]: e.target.value},
    errors: {},
  });

  handleSubmit = () => {
    const {fields} = this.state;
    const {errors} = validator.validate(this.validator, fields);
    this.setState({errors});
    // if (!Object.keys(errors).length) {
    //   this.props.guestLogin({...trimFieldsData(fields)});
    // }
    this.props.guestLogin({...trimFieldsData(fields)});
  };

  render() {
    const {errors} = this.state;

    return (
      <GuestLoginView
        errors={errors}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        navTo={this.navTo}
      />
    );
  }
}

GuestLoginContainer.propTypes = {
  guestLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  guestLogin: guestLogin.request,
}, dispatch);

export default connect(null, mapDispatchToProps)(GuestLoginContainer);

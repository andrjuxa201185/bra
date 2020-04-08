import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as validator from '../../../helpers/validator';
import {registration, login} from '../../../store/auth/authActions';
import RegistrationView from './RegistrationView';
import { trimFieldsData } from "../../../utils";
import { globals } from "../../../store/globals";

class RegistrationContainer extends Component {

  state = {
    fields: {
      firstName: '',
      lastName: '',
      email: '',
      // username: '',
      password: '',
      repeat_password: '',
      isAgree: false,
    },
    errors: {},
  };

  validator = {
    required: ['firstName', 'lastName', 'email', 'password', 'repeat_password', 'isAgree'],
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

  handleChange = field => e => {
    const {checked, value, type} = e.target;
    let val = type === 'checkbox' ? checked : value;
    if (field === 'firstName' || field === 'lastName') {
      const rFullName = /[^a-zA-Z\s]/g;
      val = val.replace(rFullName, "");
      this.setState({
        fields: {...this.state.fields, [field]: val},
        errors: {},
      });
    } else {
      this.setState({
        fields: {...this.state.fields, [field]: val},
        errors: {},
      });
    }

  };

  handleSubmit = () => {
    const {fields} = this.state;
    const {errors} = validator.validate(this.validator, fields);
    this.setState({errors});

    // console.log({...trimFieldsData(fields)});

    if (!Object.keys(errors).length) {
      //Add event for GA
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'Registration form',
        'step': 1,
      });
      this.props.registration({...trimFieldsData(fields)});
    }
    // FOR TESTS
    // this.props.registration({...trimFieldsData({
    //     firstName: 'oleg24',
    //     lastName: 'user',
    //     email: 'test4.avv+24@gmail.com',
    //     username: 'oleg24',
    //     password: '12345678',
    //     repeat_password: '12345678',
    //     isAgree: true,
    //   })});
  };

  render() {
    const {errors} = this.state;

    return (
      <RegistrationView
        errors={errors}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        navTo={this.navTo}
        fields={this.state.fields}
      />
    );
  }
}

RegistrationContainer.propTypes = {
  registration: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  registration: registration.request,
  login: login.request,
}, dispatch);

export default connect(null, mapDispatchToProps)(RegistrationContainer);

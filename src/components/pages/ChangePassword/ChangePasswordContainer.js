import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import { AuthFormView } from "../../common";
import { Button, Input } from "../../controls";
import * as validator from "../../../helpers/validator";
import { changePassword } from "../../../store/auth/authActions";
import { trimFieldsData } from "../../../utils";
import {getUrlParam} from '../../../helpers/common';
import { globals } from "../../../store/globals";
import {LOGIN} from '../../../navigation/routes';

class ChangePasswordContainer extends Component {

  state = {
    fields: {
      password: '',
      repeat_password: '',
    },
    errors: {},
  };

  validator = {
    required: ['password', 'repeat_password'],
    custom: [
      validator.samePasswords(['password', 'repeat_password']),
    ],
  };

  handleChange = field => e => this.setState({
    fields: {...this.state.fields, [field]: e.target.value},
    errors: {},
  });

  handleSubmit = () => {
    const {fields, fields: {password}} = this.state;
    const {errors} = validator.validate(this.validator, fields);
    const hash = getUrlParam(2);
    const data = {password};
    if (hash) {
      data.hash = hash;
    }
    this.setState({errors});
    if (!Object.keys(errors).length) {
      this.props.changePassword({...trimFieldsData(data)}, () => {
        globals.history.push(LOGIN);
      });
    }
  };

  render() {
    const {errors} = this.state;
    return (
      <div className={'auth__background'}>
        <AuthFormView
          title={'Change Password'}
          desc={'Please enter your new password choice below.'}
        >
          <div className={'auth__inputWrapper'}>
            <Input
              type='password'
              onChange={this.handleChange('password')}
              label={'New Password'}
              error={errors['password']}
              autocomplete='new-password'
            />
          </div>
          <div className={'auth__inputWrapper'}>
            <Input
              type='password'
              onChange={this.handleChange('repeat_password')}
              label={'Re-Type Password'}
              error={errors['repeat_password']}
              autocomplete='new-password'
            />
          </div>
          <div className={'auth__btnWrapper'}>
            <Button
              onClick={this.handleSubmit}
              title='Change'
            />
          </div>
        </AuthFormView>
      </div>
    );
  }
}

ChangePasswordContainer.propTypes = {
  changePassword: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  changePassword,
}, dispatch);

export default connect(null, mapDispatchToProps)(ChangePasswordContainer);

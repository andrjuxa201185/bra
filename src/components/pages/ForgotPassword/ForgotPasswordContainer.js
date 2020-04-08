import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import { AuthFormView } from "../../common";
import { Button, Input } from "../../controls";
import * as validator from "../../../helpers/validator";
import { forgotPassword } from "../../../store/auth/authActions";
import { trimFieldsData } from "../../../utils";
import { globals } from "../../../store/globals";
import { LOGIN } from "../../../navigation/routes";

class ForgotPasswordContainer extends Component {

  state = {
    fields: {
      email: '',
    },
    errors: {},
  };

  validator = {
    required: ['email'],
    custom: [
      validator.email(['email']),
    ],
  };

  handleChange = field => e => this.setState({
    fields: {...this.state.fields, [field]: e.target.value},
    errors: {},
  });

  handleSubmit = () => {
    const {fields} = this.state;
    const {errors} = validator.validate(this.validator, fields);
    this.setState({errors});
    if (!Object.keys(errors).length) {
      this.props.forgotPassword({...trimFieldsData(fields)}, () => {
        globals.history.push(LOGIN);
      });
    }
  };

  render() {
    const {errors} = this.state;
    return (
      <div className={'auth__background justify-content-center'}>
        <AuthFormView
          title={'Forgot Password'}
          desc={'Please enter your email address. Reset instructions will be set to you.'}
        >
          <div className={'auth__inputWrapper'}>
            <Input
              type='text'
              onChange={this.handleChange('email')}
              label={'Email'}
              error={errors['email']}
            />
          </div>
          <div className={'auth__btnWrapper'}>
            <Button
              onClick={this.handleSubmit}
              title='Reset Password'
            />
          </div>
        </AuthFormView>
      </div>
    );
  }
}

ForgotPasswordContainer.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  forgotPassword,
}, dispatch);

export default connect(null, mapDispatchToProps)(ForgotPasswordContainer);

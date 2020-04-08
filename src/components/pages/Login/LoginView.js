import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input }from '../../controls';
import {AuthFormView} from '../../common';
import {REGISTRATION, FORGOT_PASSWORD} from '../../../navigation/routes';
import styles from './LoginStyles.scss';

const LoginView = ({
                     onChange,
                     onSubmit,
                     errors,
                     navTo,
                   }) => {
  return (
    <div className={'auth__background justify-content-center'}>
      <AuthFormView title={'Member Login to BRAINS'}>
        <div className={'auth__inputWrapper'}>
          <Input
            type='text'
            onChange={onChange('email')}
            label={'Email Address'}
            error={errors['email']}
          />
        </div>
        <div className={'auth__inputWrapper'}>
          <span onClick={navTo(FORGOT_PASSWORD)} className={styles.forgot}>Forgot password?</span>
          <Input
            type='password'
            onChange={onChange('password')}
            label={'Password'}
            error={errors['password']}
          />
        </div>
        <div className={'auth__btnWrapper'}>
          <Button
            onClick={onSubmit}
            title='Login'
          />
        </div>
        <div className={'auth__signIn'}>
          {'Don\'t have an account? '}
          <a href='#' onClick={navTo(REGISTRATION)}>Create Now</a>
        </div>
      </AuthFormView>
    </div>
  );
};

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  navTo: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default LoginView;

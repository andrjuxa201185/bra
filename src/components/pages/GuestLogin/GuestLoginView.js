import React from 'react';
import PropTypes from 'prop-types';
import {Button, Checkbox, Input} from '../../controls';
import {AuthFormView, StepsIndicator} from '../../common';
import {LOGIN} from '../../../navigation/routes';
import {steps} from '../Registration/RegistrationView';
import {DOMAIN_LANDING_URL} from "../../../service/apiConstants";

const LoginView = ({
                     onChange,
                     onSubmit,
                     errors,
                     navTo,
                   }) => {
  return (
    <div className={'auth__background'}>
       <StepsIndicator
        steps={steps}
        activeStepIndex={0}
      />
      <AuthFormView title={'Sign the BRAINS Guestbook'}>
        <div className='row mx-sm-n1'>
          <div className='col-sm-6 px-sm-1'>
            <div className={'auth__inputWrapper'}>
              <Input
                type='text'
                onChange={onChange('firstName')}
                label={'First Name'}
                error={errors['firstName']}
              />
            </div>
          </div>
          <div className='col-sm-6 px-sm-1'>
            <div className={'auth__inputWrapper'}>
              <Input
                type='text'
                onChange={onChange('lastName')}
                label={'Last Name'}
                error={errors['lastName']}
              />
            </div>
          </div>
        </div>
        <div className={'auth__inputWrapper'}>
          <Input
            type='text'
            onChange={onChange('email')}
            label={'Email'}
            error={errors['email']}
            autocomplete='off'
          />
        </div>
        <div className='row mx-sm-n1'>
          <div className='col-sm-6 px-sm-1'>
            <div className={'auth__inputWrapper'}>
              <Input
                type='password'
                onChange={onChange('password')}
                label={'Password'}
                error={errors['password']}
                autocomplete='new-password'
              />
            </div>
          </div>
          <div className='col-sm-6 px-sm-1'>
            <div className={'auth__inputWrapper'}>
              <Input
                type='password'
                onChange={onChange('repeat_password')}
                label={'Re-Type Password'}
                error={errors['repeat_password']}
                autocomplete='new-password'
              />
            </div>
          </div>
        </div>
        <div className={' mb-4'}>
          <Checkbox
            text={
              <div>I agree to
                <a href={`${DOMAIN_LANDING_URL}/terms-of-use.php`} target='_blank' rel='noopener noreferrer'>
                  <b> Terms And Conditions</b>
                </a>
              </div>
            }
            onChange={onChange('isAgree')}
            error={errors['isAgree']}
          />
        </div>
        <div className={'auth__btnWrapper'}>
          <Button
            onClick={onSubmit}
            title='Start to Explore'
          />
        </div>
        <div className={'auth__signIn'}>
          {'Already have an account? '}
          <a href='#' onClick={navTo(LOGIN)}>Log in</a>
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

import React from 'react';
import {Button, Input, Checkbox} from '../../../controls';
import {AuthFormView} from '../../../common';
import styles from '../PortfolioCreateStyles.scss';
import {LOGIN, RECOMMENDED_PORTFOLIO} from "../../../../navigation/routes";

export const RenderFirstStep = ({
                                  currentStep,
                                  navTo,
                                  user,
                                  changeStep,
                                  onChange,
                                  errors,
                                  submitProfileData,
                                }) => {
  // if (currentStep === 1 && user && user.utype !== 0) {
  //   changeStep(true);
  // }

  return (
    <div className={`${styles.pt} auth__background justify-content-center`}>
      <AuthFormView title={'Create your BRAINS Portfolio'}>
        <div className='d-flex flex-wrap mx-md-n1'>
          <div className='col-sm-6 px-1'>
            <div className={'auth__inputWrapper'}>
              <Input
                type='text'
                onChange={onChange('firstName')}
                label={'First Name'}
                error={errors['firstName']}
                value={user ? user.first_name : ''}
                disabled={user && user.first_name}
              />
            </div>
          </div>
          <div className='col-sm-6 px-1'>
            <div className={'auth__inputWrapper'}>
              <Input
                type='text'
                onChange={onChange('lastName')}
                label={'Last Name'}
                error={errors['lastName']}
                value={user ? user.last_name : ''}
                disabled={user && user.last_name}
              />
            </div>
          </div>
        </div>

        <div className={'auth__inputWrapper px-1'}>
          <Input
            type='text'
            onChange={onChange('email')}
            label={'Email Address'}
            error={errors['email']}
            value={user ? user.email : ''}
            disabled={user && user.email}
          />
        </div>

        <div className={'auth__inputWrapper px-1'}>
          <Input
            type='text'
            onChange={onChange('username')}
            label={'Member Name'}
            error={errors['username']}
          />
        </div>

        <div className='d-flex flex-wrap mx-md-n1'>
          <div className='col-sm-6 px-1'>
            <div className={'auth__inputWrapper'}>
              <Input
                type='password'
                onChange={onChange('password')}
                label={'Password'}
                error={errors['password']}
              />
            </div>
          </div>

          <div className='col-sm-6 px-1'>
            <div className={'auth__inputWrapper'}>
              <Input
                type='password'
                onChange={onChange('repeat_password')}
                label={'Re-Type Password'}
                error={errors['repeat_password']}
              />
            </div>
          </div>
        </div>

        <div className={' mb-4'}>
          <Checkbox
            text={
              <div>I agree to
                <a href='#' onClick={navTo(LOGIN)}>
                  <b> Terms And Conditions</b>
                </a>
              </div>
            }
            onChange={onChange('isAgree')}
            error={errors['isAgree']}
          />
        </div>

        <div className={'auth__btnWrapper d-flex justify-content-between'}>
          <div className={styles.nextButton}>
            <Button
              title={'Cancel'}
              onClick={navTo(RECOMMENDED_PORTFOLIO)}
              transparent
              size={'md'}
            />
          </div>
          <div className={styles.nextButton}>
            <Button
              title={'Next'}
              onClick={submitProfileData}
              size={'md'}
            />
          </div>
        </div>
      </AuthFormView>
    </div>
  );
};

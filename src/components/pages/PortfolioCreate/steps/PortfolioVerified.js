import React from 'react';
import {Button} from '../../../controls';
import {AuthFormView} from '../../../common';
import styles from '../PortfolioCreateStyles.scss';

export const PortfolioVerified = ({changeStep}) => (
  <div className={'auth__background justify-content-center'}>

    <AuthFormView title={'Thank You!'}>
      <p className={`${styles.form__textBold} mb-4`}>
        You have been successfully verified.
      </p>

      <div className='row justify-content-center'>
        <div className={styles.nextButton}>
          <Button
            title={'Next'}
            onClick={() => changeStep(true)}
            size={'md'}
          />
        </div>
      </div>
    </AuthFormView>
  </div>
);

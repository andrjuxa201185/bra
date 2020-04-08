import React from 'react';
import {Button} from '../../../controls';
import {AuthFormView} from '../../../common';
import styles from '../PortfolioCreateStyles.scss';
import {CURRENT_PORTFOLIO} from "../../../../navigation/routes";

export const ThankYouStep = ({navTo, handleGetCurrentPortfolio}) => (
  <div className={`${styles.pt} auth__background justify-content-center`}>

    <AuthFormView title={'Thank You!'}>
      <p className={`${styles.form__textBold} mb-4`}>
        That wasn`t too bad, was it?
        The good news is you are all signed up and now it should only take a few days until your bank transfers the money
        you requested to Brains,
        and then we`ll automatically invest your funds in the portfolio you selected.
      </p>

      <div className='row justify-content-center'>
        <div className={styles.nextButton}>
          <Button
            title={'Done'}
            onClick={
              //handleGetCurrentPortfolio
              navTo(CURRENT_PORTFOLIO)
            }
            size={'md'}
          />
        </div>
      </div>
    </AuthFormView>
  </div>
);

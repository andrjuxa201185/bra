import React from 'react';
import {Button} from '../../../controls';
import {AuthFormView} from '../../../common';
import {RECOMMENDED_PORTFOLIO} from "../../../../navigation/routes";

import styles from '../PortfolioCreateStyles.scss';
import {globals} from "../../../../store/globals";

export const WelcomeStep = ({changeStep, user}) => (
  <div className={`${styles.pt} auth__background justify-content-center`}>
    <AuthFormView>
      <p className={`${styles.form__textBold} mb-4`}>
        Welcome to the Brains onboarding process where we gather a bit more information from you so we can help you
        transfer funds from your bank to Brains so you can invest in your first portfolio!
      </p>
      <p className={`${styles.form__text} mb-5`}>
        The information we’re collecting is required by the US Securities and Exchange Commission to ensure we’re
        providing the best investment advisory guidance based on your investment
        experience and risk tolerance, as well as personal information
        for your bank and our custodial and clearing affiliates.
      </p>

      <div className='row justify-content-center'>
        <div className={styles.nextButton}>
          <Button
            title={'Prev'}
            onClick={() => {
              if (user && user.utype !== 0) {
                globals.history.push(RECOMMENDED_PORTFOLIO);
                return;
              }
              changeStep(false);
            }
            }
            transparent
            size={'md'}
          />
        </div>
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

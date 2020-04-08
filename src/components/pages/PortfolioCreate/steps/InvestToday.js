import React, {useEffect} from 'react';
import {Button, Input} from '../../../controls';
import {AuthFormView} from '../../../common';
import styles from '../PortfolioCreateStyles.scss';
import NumberFormat from "react-number-format";

export const InvestToday = ({
                             changeStep,
                             errors,
                             investQuestionData,
                             getOnboardingInvest,
                             onInvestInputChange,
                             sendInvestQuestionData,
                             investValue,
                           }) => {
  useEffect(() => {
    if (!investQuestionData) {
      getOnboardingInvest();
    }
  }, []);

  return (
    <>
      {investQuestionData && <div className={`${styles.pt} auth__background justify-content-center`}>
        <AuthFormView subTitle={investQuestionData[0].text} desc={'(Minimum $50.00 Investment)'}>
          <div className={'auth__inputWrapper'}>
            <NumberFormat
              value={investValue}
              thousandSeparator
              prefix={'$'}
              placeholder='$'
              label={'Enter an Amount'}
              error={errors['tgj']}
              customInput={Input}
              onValueChange={({value}) => onInvestInputChange(value)}
            />
          </div>

          <div className='row justify-content-center'>
            <div className={styles.nextButton}>
              <Button
                title={'Prev'}
                onClick={() => changeStep(false)}
                transparent
                size={'md'}
              />
            </div>
            <div className={styles.nextButton}>
              <Button
                title={'Next'}
                onClick={() => sendInvestQuestionData()}
                size={'md'}
                //TODO set || investValue < 50
                disabled={!investValue
                // || investValue < 50
                }
              />
            </div>
          </div>
        </AuthFormView>
      </div>}
    </>
);
};

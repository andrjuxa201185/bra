import React from 'react';
import {Button} from '../../../controls';
import {AuthFormView} from '../../../common';
import styles from '../PortfolioCreateStyles.scss';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import {useState} from 'react';
import Script from 'react-load-script';

const PLAID_INITIALIZE_URL = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js';

export const BankAccountStep = ({
                                   changeStep,
                                   fieldsPortfolio,
                                   setPlaidInfo,
                                   onInit,
                                   settingsData,
                                 }) => {

  const [linkHandler, setLinkHandler] = useState(null);

  const onScriptLoaded = () => {
    const scriptHandler = window.Plaid.create({
      apiVersion: 'v2',
      clientName: 'Plaid Client',
      key: settingsData.PLAID_PUBLIC_KEY,
      // sandbox || development || production
      env: 'production',
      product: ['auth', 'transactions',
          // 'identity', 'transactions'
      ],
      onSuccess: (publicToken, metadata) => {
        setPlaidInfo({public_token: publicToken, account_id: metadata.account_id, link_session_id: metadata.link_session_id});
        changeStep(true);
      },
    });

    setLinkHandler(scriptHandler);
    onInit(scriptHandler);
  };

  const onScriptError = () => {
    console.error('There was an issue loading the link-initialize.js script');
  };

  return (
    <div className={`${styles.pt} auth__background justify-content-center`}>
      <AuthFormView title={'Please, link your bank account'}>
        <div className={'auth__btnWrapper d-flex justify-content-center'}>
          <div className={styles.nextButton}>
            <Button
              title={'Next'}
              onClick={onScriptLoaded}
              size={'md'}
            />
          </div>
        </div>
      </AuthFormView>
      <Script
        url={PLAID_INITIALIZE_URL}
        onError={onScriptError}
        onLoad={onScriptLoaded} />
    </div>
  );
};

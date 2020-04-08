import React from 'react';
import {Button, Spinner} from '../../../controls';
import {AuthFormView} from '../../../common';
import styles from '../PortfolioCreateStyles.scss';
import SignatureCanvas from 'react-signature-canvas';
import {globals} from "../../../../store/globals";
import {RECOMMENDED_PORTFOLIO} from "../../../../navigation/routes";
import {DOMAIN_LANDING_URL} from "../../../../service/apiConstants";

export default class AlmostDone extends React.Component {

  constructor(props) {
    super(props);
  }

  state = { trimmedDataURL: null };

  sigPad = {};

  clear = () => {
    this.sigPad.clear();
  };

  trim = () => {
    this.props.submitSignature(
      {signature: this.sigPad.getTrimmedCanvas().toDataURL('image/png')}
    )
  };

  componentDidMount() {
    this.props.cleanFolioStatus();
    this.props.checkFolioStatus();
  }

  componentDidUpdate(prevProps, prevState) {
    const { folioSignatureData } = this.props;
    if (folioSignatureData && folioSignatureData.signature && folioSignatureData && folioSignatureData.owner_ach_verification) {
      this.props.changeStep(true);
    }
  }

  render() {
    const {
      checkFolioStatus,
      folioCheckData,
      folioSignatureData,
      changeStep
    } = this.props;

    const errors = folioCheckData && folioCheckData.errors;
    const signature = folioCheckData && folioCheckData.signature;
    const owner_ach_verification = folioCheckData && folioCheckData.owner_ach_verification;
    const verification = folioCheckData && folioCheckData.verification_status;

    if (this.props.folioSignatureStatus.loading) {
      return (<div className={'auth__background justify-content-center'}>
        <Spinner size='lg'/>
      </div>)
    }

    if (errors && ((errors.member && errors.member.length)
      || (errors.account && errors.account.length)
      || (errors.bank_link && errors.bank_link.length))) {
      return (
        <div className={'auth__background justify-content-center'}>

          <AuthFormView title={'Oops, something went wrong!'}>
            {
              errors.member &&
              <>
                <p className={`${styles.form__textBold} mb-4`}>
                  Member was not created in Folio. Please check the errors.
                </p>
                {
                  errors.member.map((error, index) => (
                    <p key={index} className={`${styles.form__textBold} mb-4`}>
                      - {error.text ? error.text : 'text will be placed here'}
                    </p>
                  ))
                }
              </>
            }
            {
              errors.account &&
              <>
                <p className={`${styles.form__textBold} mb-4`}>
                  Account was not created in Folio. Please check the errors.
                </p>
                {
                  errors.account.map((error, index) => (
                    <p key={index} className={`${styles.form__textBold} mb-4`}>
                      - {error.text ? error.text : 'text will be placed here'}
                    </p>
                  ))
                }
              </>
            }
            {
              errors.bank_link && !!errors.bank_link.length &&
              <>
                <p className={`${styles.form__textBold} mb-4`}>
                  Bank Link was not created in Folio. Please check the errors.
                </p>
                {
                  errors.bank_link.map((error, index) => (
                    <p key={index} className={`${styles.form__textBold} mb-4`}>
                      - {error.text ? error.text : 'text will be placed here'}
                    </p>
                  ))
                }
              </>
            }
            <p className={`${styles.form__textBold} mb-4`}>
              Please update you data and try again!
            </p>
            <div className='row justify-content-center'>
              <div className={styles.nextButton}>
                <Button
                  title={'Next'}
                  onClick={() => globals.history.push(RECOMMENDED_PORTFOLIO)}
                  size={'md'}
                />
              </div>
            </div>
          </AuthFormView>
        </div>
      );
    }
    return (
      <div className={'auth__background justify-content-center'}>
        <AuthFormView title={'Almost done!'}>
          <p className={`${styles.form__textBold} mb-4`}>
            By signing below, I acknowledge and agree that:
            <p>1. I am opening a brokerage account with Folio Investments, Inc., Brains’ chosen custodian.</p>
            <p>2. I am the Primary Account Holder listed below.</p>
            <p>3. I have received, read and agree to the terms and conditions set forth in (1) the Folio Investments, Inc. Customer Agreement <a
              href='https://www.folioinstitutional.com/servlets/ProcessAction/document/folioDoc?docTypeCode=ACA&partnerCode=IAFIRM' rel='noopener noreferrer' target='_blank'>link</a>;
            (2) the Brains Investment Management Agreement <a
                href={`${DOMAIN_LANDING_URL}/Brains_Advisory_Agreement.pdf`} rel='noopener noreferrer' target='_blank'>link</a>.</p>
            <p>4.  Brains and Folio Client will share your personal and financial information between themselves as needed to service your account and consistent with each firm’s privacy policy.</p>
            <p>5. I am a U.S. Person, and the tax identification number provided is correct.</p>
            <p>6. I am not subject to backup withholding as a result of my failure to report all interest and dividends, or the Internal Revenue Service (IRS) has notified me that I am subject to backup withholding.</p>
            <p>7. By entering your bank account information and clicking submit, you are authorizing Brains Investments, LLC to communicate your bank account information to Folio Institutional. You also authorize Brains Investments, LLC to make transfers between this bank account and your account that is custodied at Folio Institutional.</p>
          </p>
          {
            ((signature || (folioSignatureData && folioSignatureData.signature)) &&
            (owner_ach_verification || (folioSignatureData && folioSignatureData.owner_ach_verification))) &&

            <>
              <p className={`${styles.form__textBold} mb-4`}>
                You signature is <span style={{color: 'green'}}>SUBMITTED</span>
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
            </>
          }
          {
            ((!signature && (!folioSignatureData || !folioSignatureData.signature))
            || (!owner_ach_verification && (!folioSignatureData || !folioSignatureData.owner_ach_verification))) &&
            <>
              <p className={`${styles.form__textBold} mb-4`}>
                Please sign below to confirm.
              </p>
              <SignatureCanvas
                canvasProps={{
                  width: 450,
                  height: 400,
                  className: 'sigCanvas',
                }}
                penColor={'blue'}
                ref={ref => {
                  this.sigPad = ref
                }}
              />
              <div className='row justify-content-center'>
                <div className={styles.nextButton}>
                  <Button
                    title={'Clear'}
                    onClick={this.clear}
                    size={'md'}
                  />
                </div>
                <div className={styles.nextButton}>
                  <Button
                    title={'Submit'}
                    onClick={this.trim}
                    size={'md'}
                  />
                </div>
              </div>
            </>
          }
        </AuthFormView>
      </div>
    )
  }
}


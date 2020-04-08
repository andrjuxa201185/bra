import React from 'react';
import PropTypes from 'prop-types';
import {OopsView} from '../../common';
import styles from './PortfolioCreateStyles.scss';
import {
  RenderFirstStep,
  WelcomeStep,
  RenderSecondStep,
  RenderQuestionStep,
  PortfolioVerified,
  ThankYouStep,
  AlmostDone,
  InvestToday,
} from './steps';
import {BankAccountStep} from './steps/BankAccountStep';

export const PortfolioQuestionsTypes = {
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  INPUTS: 'inputs',
  INPUT: 'input',
  SELECT: 'select',
  ADDRESS: 'address',
};

const PortfolioCreateView = ({
                               checkboxHandler, currentStep,
                               changeStep, radioHandler,
                               inputHandler, inputsHandler,
                               user, navTo,
                               onChange, errors, dataStatus,
                               questionsDataStatus,
                               onChangeDate, questionsData,
                               isOld, submitAnswers,
                               portfolio,
                               portfolioDataStatus,
                               submitPortfolio,
                               fieldsPortfolio,
                               onLocation, submitProfileData,
                               getPortfolio,
                               getOnboardingInvest,
                               investValue,
                               investQuestionData,
                               onInvestInputChange,
                               sendInvestQuestionData,
                               getQuestions, isShowPostalCode,
                               setPlaidInfo,
                               settingsData,
                               onInit,
                               folioCheckData,
                               checkFolioStatus,
                               isShowCompanySymbols,
                               isShowFirmName,
                               isShowOrganization,
                               isShowFamily,
                               isShowExperienceSector,
                               submitSignature,
                               folioSignatureData,
                               cleanFolioStatus,
                               isShowEmployment,
                               fullAddress,
                               addressHandler,
                               locationChangeHandler,
                               addressInputChange,
                               folioSignatureStatus,
                               handleGetCurrentPortfolio,
                             }) => {
  const steps = {
    1: <RenderFirstStep
      submitProfileData={submitProfileData}
      fieldsPortfolio={fieldsPortfolio}
      currentStep={currentStep}
      navTo={navTo}
      user={user}
      changeStep={changeStep}
      onChange={onChange}
      errors={errors}
    />,
    2: <WelcomeStep changeStep={changeStep} navTo={navTo} user={user}/>,
    3: <RenderSecondStep
      portfolio={portfolio}
      isOld={isOld}
      changeStep={changeStep}
      onChange={onChange}
      fullAddress={fullAddress}
      errors={errors}
      onChangeDate={onChangeDate}
      fieldsPortfolio={fieldsPortfolio}
      submitPortfolio={submitPortfolio}
      onLocation={onLocation}
      isShowPostalCode={isShowPostalCode}
      settingsData={settingsData}
      getPortfolio={getPortfolio}
    />,
    4: <InvestToday
      changeStep={changeStep}
      errors={errors}
      getOnboardingInvest={getOnboardingInvest}
      investQuestionData={investQuestionData}
      onInvestInputChange={onInvestInputChange}
      sendInvestQuestionData={sendInvestQuestionData}
      investValue={investValue}
      fullAddress
    />,
    5: <RenderQuestionStep
      questionsDataStatus={questionsDataStatus}
      getQuestions={getQuestions}
      questionStep={1}
      submitAnswers={submitAnswers}
      questionsData={questionsData}
      changeStep={changeStep}
      checkboxHandler={checkboxHandler}
      inputHandler={inputHandler}
      inputsHandler={inputsHandler}
      radioHandler={radioHandler}
      addressInputChange={addressInputChange}
      isShowEmployment={isShowEmployment}
      addressHandler={addressHandler}
      onLocation={onLocation}
      fullAddress={fullAddress}
      onChange={onChange}
      locationChangeHandler={locationChangeHandler}
      isShowPostalCode={isShowPostalCode}
    />,
    6: <RenderQuestionStep
      questionStep={2}
      questionsDataStatus={questionsDataStatus}
      getQuestions={getQuestions}
      submitAnswers={submitAnswers}
      questionsData={questionsData}
      changeStep={changeStep}
      checkboxHandler={checkboxHandler}
      inputHandler={inputHandler}
      inputsHandler={inputsHandler}
      radioHandler={radioHandler}
      addressInputChange={addressInputChange}
      fullAddress={fullAddress}
      onChange={onChange}
    />,
    7: <RenderQuestionStep
      questionStep={3}
      questionsDataStatus={questionsDataStatus}
      getQuestions={getQuestions}
      submitAnswers={submitAnswers}
      questionsData={questionsData}
      changeStep={changeStep}
      checkboxHandler={checkboxHandler}
      inputHandler={inputHandler}
      inputsHandler={inputsHandler}
      radioHandler={radioHandler}
      addressInputChange={addressInputChange}
      isShowCompanySymbols={isShowCompanySymbols}
      isShowFirmName={isShowFirmName}
      isShowOrganization={isShowOrganization}
      isShowFamily={isShowFamily}
      isShowExperienceSector={isShowExperienceSector}
      onChange={onChange}
    />,
    8: <BankAccountStep
      portfolio={portfolio}
      isOld={isOld}
      changeStep={changeStep}
      onChange={onChange}
      errors={errors}
      onChangeDate={onChangeDate}
      fieldsPortfolio={fieldsPortfolio}
      submitPortfolio={submitPortfolio}
      onLocation={onLocation}
      isShowPostalCode={isShowPostalCode}
      onInit={onInit}
      settingsData={settingsData}
      setPlaidInfo={setPlaidInfo}
      getPortfolio={getPortfolio}
    />,
    9: <AlmostDone
      changeStep={changeStep}
      checkFolioStatus={checkFolioStatus}
      folioCheckData={folioCheckData}
      submitSignature={submitSignature}
      folioSignatureData={folioSignatureData}
      cleanFolioStatus={cleanFolioStatus}
      folioSignatureStatus={folioSignatureStatus}
    />,
    // 10: <PortfolioVerified changeStep={changeStep}/>,
    10: <ThankYouStep
        navTo={navTo}
        handleGetCurrentPortfolio={handleGetCurrentPortfolio}
    />,
  };

  if (questionsDataStatus.fail || portfolioDataStatus.fail || dataStatus.fail) {
    return <OopsView/>;
  }


  return (
    <div className={styles.positionFixed}>
      {steps[currentStep]}
    </div>
  );
};

PortfolioCreateView.propTypes = {
  submitProfileData: PropTypes.func.isRequired,
  submitPortfolio: PropTypes.func.isRequired,
  onLocation: PropTypes.func.isRequired,
  checkboxHandler: PropTypes.func.isRequired,
  changeStep: PropTypes.func.isRequired,
  radioHandler: PropTypes.func.isRequired,
  inputHandler: PropTypes.func.isRequired,
  submitAnswers: PropTypes.func.isRequired,
  inputsHandler: PropTypes.func.isRequired,
  navTo: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
  setPlaidInfo: PropTypes.func.isRequired,
  //data
  fieldsPortfolio: PropTypes.object,
  user: PropTypes.object,
  isOld: PropTypes.bool.isRequired,
  dataStatus: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeDate: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  currentStep: PropTypes.number.isRequired,
  answeredQuestions: PropTypes.number,
  questionsData: PropTypes.object,
  questionsDataStatus: PropTypes.object,
  portfolioDataStatus: PropTypes.object,
  isShowPostalCode: PropTypes.bool.isRequired,
};

export default PortfolioCreateView;

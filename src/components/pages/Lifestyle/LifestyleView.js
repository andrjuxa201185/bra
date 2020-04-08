import React from 'react';
import PropTypes from 'prop-types';
import {RenderQuestionStep} from "../PortfolioCreate/steps";

const LifestyleView = ({
                         questionsDataStatus, questionsData,
                         checkboxHandler, currentStep,
                         changeStep, radioHandler,
                         inputHandler, inputsHandler,
                         submitAnswers,
                       }) => {
  if (questionsData) {
    return (
      <>
        <div className='topPanel'>
          <div className='contentContainer'>
            <h1>Lifestyle</h1>
          </div>
        </div>
        <div className='mainContent'>
          <div className='contentContainer'>
            <p className='mb-5'>
              Tell us a bit about who you are, your lifestyle and plans to customize your portfolio even further. Brains
              can also use this information to learn what features and services might be appealing to you.
            </p>
            <RenderQuestionStep
              questionsDataStatus={questionsDataStatus}
              questionStep={currentStep}
              submitAnswers={submitAnswers}
              questionsData={questionsData}
              changeStep={changeStep}
              checkboxHandler={checkboxHandler}
              inputHandler={inputHandler}
              inputsHandler={inputsHandler}
              radioHandler={radioHandler}
              lifestyle
            />
          </div>
        </div>
      </>
    );
  }
  return null;
};

LifestyleView.propTypes = {
  checkboxHandler: PropTypes.func.isRequired,
  changeStep: PropTypes.func.isRequired,
  radioHandler: PropTypes.func.isRequired,
  inputHandler: PropTypes.func.isRequired,
  inputsHandler: PropTypes.func.isRequired,
  submitAnswers: PropTypes.func.isRequired,
  navTo: PropTypes.func.isRequired,
  //data
  questionsData: PropTypes.object,
  questionsDataStatus: PropTypes.object,
  currentStep: PropTypes.number.isRequired,
  answeredQuestions: PropTypes.number.isRequired,
};

export default LifestyleView;

import React, {useState} from 'react';
import {Button, Input, Select} from '../../../controls';
import {
  StepsIndicator,
  AuthFormView,
  CirculsQuestion,
  ImageCheckboxForm,
  MapGoogle
} from '../../../common';
import styles from '../PortfolioCreateStyles.scss';
import {PortfolioQuestionsTypes} from "../PortfolioCreateView";
import {Spinner} from '../../../controls';
import {useEffect} from 'react';
import NumberFormat from 'react-number-format';
import Autocomplete from "react-google-autocomplete";

// const order = [1, 2, 3, 35, 36, 46, 37, 38, 39, 40, 41, 4, 5, 7, 8, 9, 10, 11, 12, 42, 32, 14, 31, 13, 33, 34, 43, 44];

export const RenderQuestionStep = ({
                                     changeStep,
                                     questionsData,
                                     checkboxHandler,
                                     inputHandler,
                                     submitAnswers,
                                     inputsHandler,
                                     radioHandler,
                                     questionStep,
                                     getQuestions,
                                     questionsDataStatus,
                                     isShowCompanySymbols,
                                     isShowFirmName,
                                     isShowOrganization,
                                     isShowFamily,
                                     isShowExperienceSector,
                                     isShowEmployment,
                                     lifestyle,
                                     fullAddress,
                                     addressHandler,
                                     onLocation,
                                     onChange,
                                     locationChangeHandler,
                                     addressInputChange,
                                   }) => {

  useEffect(() => {
    if (!questionsData) {
      getQuestions();
    }
  }, []);
  const [address, setAddress] = useState({
    lat: 0,
    lng: 0,
    zoom: 1,
    showMap: false,
  });


  const onSelectedLocationHandler = place => {
    place.geometry &&
    setAddress({
      lat: +place.geometry.location.lat(),
      lng: +place.geometry.location.lng(),
      zoom: 12,
      showMap: true,
    });
    this.props.locationChangeHanlder(place);
  };

  const renderQuestion = questionData => {
    if (!questionData) return null;

    const foundAddress = Object.values(questionsData).find(item => item.type === 'address');

    const addressValue = foundAddress && Object.values(foundAddress.answers).reduce((acc, curr) => {
      return {
        ...acc,
        [curr.name]: curr.value,
      };
    }, {});

    switch (questionData.type) {
      case PortfolioQuestionsTypes.INPUT:
        return (
          <div className='mb-5' key={questionData.id}>
            <div className={styles.quiz}>
              <div className={styles.quiz__title}>
                <h3>{questionData.text}</h3>
              </div>
              <div className={`${styles.largeInput} mb-5`}>
                {
                  (questionData.answers.params && questionData.answers.params.type && questionData.answers.params.type === 'number') ?
                    <NumberFormat
                      value={questionData.answers.value}
                      thousandSeparator
                      prefix={questionData.answers.params.maskType && questionData.answers.params.maskType === 'money' && '$'}
                      placeholder={questionData.answers.params.maskType && questionData.answers.params.maskType === 'money' && '$'}
                      customInput={Input}
                      onValueChange={({value}) => inputHandler(questionData.id, value)}
                    />
                    :
                    <>
                        <Input
                          type='text'
                          value={questionData.answers.value}
                          onChange={e => inputHandler(questionData.id, e.target.value)}
                          placeholder={questionData.id === 31 ? 'e.g. GOOG.C' : null}
                        />
                        {questionData.id === 31 ? (<span className={styles.tips}>Allowed only letters, digits and dot (can be separated using commas).</span>) : null}
                    </>
                }
              </div>
            </div>
          </div>
        );

      case PortfolioQuestionsTypes.CHECKBOX:
        return (
          <div className='mb-5' key={questionData.id}>
            <div className={styles.quiz}>
              <div className={styles.quiz__title}>
                <h3>
                  {questionData.text}
                </h3>
              </div>
              <ImageCheckboxForm
                data={questionData.answers}
                handleFormData={checkboxHandler}
                id={questionData.id}
              />
            </div>
          </div>
        );

      case PortfolioQuestionsTypes.SELECT:
        return (
          <div className='mb-5' key={questionData.id}>
            <div className={styles.quiz}>
              <div className={styles.quiz__title}>
                <h3>
                  {questionData.text}
                </h3>
              </div>
              <div className={`${styles.largeInput} mb-5`}>
                <Select
                  options={Object.values(questionData.answers)}
                  onSelect={e => radioHandler({
                    questionId: questionData.id,
                    answerId: e.target.value,
                  })}
                />
              </div>
            </div>
          </div>
        );

      case PortfolioQuestionsTypes.ADDRESS:
        return (
          <div className='mb-5' key={questionData.id}>
            <div className={styles.quiz}>
              <div className={styles.quiz__title}>
                <h3>
                  {questionData.text}
                </h3>
              </div>
              <div className={`${styles.largeInput} mb-5`}>
                <div className={`auth__inputWrapper ${styles.autocompleteWrapper}`}>
                  <Autocomplete
                    placeholder={''}
                    onChange={addressInputChange}
                    defaultValue={fullAddress({'userAddress': addressValue})}
                    onPlaceSelected={locationChangeHandler}
                    types={['address']}
                    componentRestrictions={{country: "us"}}
                  />
                </div>
                {/*<Select*/}
                {/*  options={Object.values(questionData.answers)}*/}
                {/*  onSelect={e => radioHandler({*/}
                {/*    questionId: questionData.id,*/}
                {/*    answerId: e.target.value,*/}
                {/*  })}*/}
                {/*/>*/}
              </div>
            </div>
          </div>
        );

      case PortfolioQuestionsTypes.INPUTS:
        return (
          <div className='mb-5' key={questionData.id}>
            <div className={styles.quiz}>
              <h3 className={styles.quiz__title}>
                {questionData.text}
              </h3>
              <div className={` ${styles.form} row mb-5 mx-auto`}>
                {Object.values(questionData.answers).map(answer => {
                  return (
                    <div className='col-sm-6' key={answer.id}>
                      <div className={styles.form__field}>
                        <div className={styles.form__title}>
                          {answer.name}
                        </div>
                        <div className={styles.form__input}>
                          {
                            (answer.params && answer.params.type && answer.params.type === 'number') ?
                              <NumberFormat
                                value={answer.value}
                                thousandSeparator
                                prefix={answer.params.maskType && answer.params.maskType === 'money' && '$'}
                                placeholder={answer.params.maskType && answer.params.maskType === 'money' && '$'}
                                customInput={Input}
                                onValueChange={({value}) => inputsHandler(questionData.id, answer.id, value)}
                              />
                              :
                              <Input
                                type='text'
                                defaultValue={questionData.answers.value}
                                onChange={e => inputHandler(questionData.id, e.target.value)}
                              />
                          }
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case PortfolioQuestionsTypes.RADIO:
        return (
          <div className='mb-5' key={questionData.id}>
            <div className={styles.quiz}>
              <h3 className={styles.quiz__title}>
                {questionData.text}
              </h3>
              <div className={'mb-5'}>
                <CirculsQuestion
                  options={Object.values(questionData.answers)}
                  questionId={questionData.id}
                  onClick={radioHandler}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  const isAnswered = questionsData => {
    if (!questionsData) return false;
    return !Object.values(questionsData).filter(item => item.step === questionStep).some(item => !item.isAnswered);
  };

  const questionsToRender = Object.values(questionsData || {}).filter(item => {
    if (item.step !== questionStep) {
      return false;
    }

    switch (item.name) {
      case 'applicants.disclosures.companySymbols':
        return isShowCompanySymbols;
      case 'applicants.disclosures.politicalExposureDetail.politicalOrganization':
        return isShowOrganization;
      case 'applicants.disclosures.politicalExposureDetail.immediateFamily':
        return isShowFamily;
      case 'applicants.disclosures.firmName':
        return isShowFirmName;
      case 'previousExperienceSector':
        return isShowExperienceSector;
      case 'occupationType':
        return isShowEmployment;
      case 'employerName':
        return isShowEmployment;
      case 'employerAddress':
        return isShowEmployment;
      default:
        return true;
    }
  });
  return (
    <div className={'auth__background justify-content-start'}>
      <div className={`${styles.stepIndicator}`}>
        <StepsIndicator steps={['step1', 'step2', 'step3']} activeStepIndex={questionStep - 1}/>
      </div>

      <AuthFormView className={styles.questionWrapper}>
        <div className={'container'}>
          {
            questionsDataStatus && questionsDataStatus.loading && <Spinner size='lg'/>
          }
            {console.log(questionsData)}
          {questionsToRender.sort((a, b) => {
              if (a.position > b.position) {
                return 1;
              }
              if (a.position < b.position) {
                return -1;
              }
              return 0;
            }).map(question => {
            return renderQuestion(question);
          })}
        </div>
        {
          lifestyle ?
          <div className={'auth__btnWrapper container d-flex justify-content-between pb-5'}>
            <div className={styles.nextButton}>
              { questionStep !== 1 && <Button
                title={'Prev'}
                onClick={() => changeStep('prev')}
                transparent
                size={'md'}
              />}
            </div>
            <div className={`${styles.nextButton} ${questionStep === 3 && styles.saveButton}`}>
              <Button
                // disabled={!isAnswered(questionsToRender)}
                title={questionStep !== 3 ? 'Next' : 'Save'}
                transparent={!!lifestyle && questionStep !== 3}
                onClick={questionStep !== 3 ? () => changeStep('next') : () => submitAnswers('third')}
                size={'md'}
              />
            </div>
            {questionStep === 3 && <div className={styles.nextButton}>
            </div>}
          </div>
            :
            <div className={'auth__btnWrapper container d-flex justify-content-around pb-5'}>
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
                  disabled={!isAnswered(questionsToRender)}
                  title={'Next'}
                  transparent={!!lifestyle}
                  onClick={submitAnswers}
                  size={'md'}
                />
              </div>
            </div>
        }
      </AuthFormView>
    </div>
  );
};


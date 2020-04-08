import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {LIFESTYLE} from "../../../../navigation/routes";
import {bindActionCreators} from "redux";
import {Spinner} from '../../../controls';
import {OopsView} from '../../../common';
import connect from "react-redux/es/connect/connect";
import {getQuestions} from "../../../../store/lifestyle/lifestyleActions";
import {numberWithCommas} from '../../../../helpers/common'
import {PortfolioQuestionsTypes} from "../../PortfolioCreate/PortfolioCreateView";

const SettingsLifestyleProfile = ({styles, getQuestions, questionsData, questionsDataStatus}) => {
  useEffect(() => {
    getQuestions();
  }, []);

  const capitalLabels = [
    'Marital status',
    'Life Changes',
    'Employment status',
    'Annual income',
    'Total net worth',
  ];
  const investLabels = [
    'Brains moving forward one a monthly basis',
    'Risk Strategy',
    'Investment experience',
  ];
  const financialLabels = [
    'Percent invested from salary',
    'Current total investment',
    'Assumed amount to Brains Investment',
  ];

  if (questionsDataStatus.loading) {
    return <Spinner size='lg'/>;
  }

  if (questionsDataStatus.fail) {
    return <OopsView/>;
  }

  const renderLifestyleList = (label, {type, id, answers}, isRow) => {
    switch (type) {
      case PortfolioQuestionsTypes.INPUT:
        return (
          <div key={id} className={isRow ? styles.card__content : ''}>
            <div key={id} className={`d-flex justify-content-between ${styles.card__field}`}>
              <span>{label}</span>
              <span>{answers.value ? `$ ${numberWithCommas(answers.value)}` : '---'}</span>
            </div>
          </div>
        );
      case PortfolioQuestionsTypes.CHECKBOX: {
        const answersChecked = Object.values(answers).filter(item => item.checked);
        return (
          <div key={id} className={`d-flex justify-content-between ${styles.card__field}`}>
            <span>{label}</span>
            <div className={'d-flex flex-column align-items-end'}>
              {

                answersChecked.map(({id, value}) => (
                  <span key={id}>{value}</span>
                ))
              }
              {
                !answersChecked.length && <span>---</span>
              }
            </div>
          </div>
        );
      }
      case PortfolioQuestionsTypes.INPUTS: {
        return (
          <div key={id} className={isRow ? styles.card__content : ''}>
            {
              Object.values(answers).map(({value, name, id}) => (
                <div key={id} className={`d-flex justify-content-between ${styles.card__field}`}>
                  <span>{name}</span>
                  <span>{value ? `$ ${numberWithCommas(value)}` : '---'}</span>
                </div>
              ))
            }
          </div>
        );
      }
      case PortfolioQuestionsTypes.RADIO: {
        const answersChecked = Object.values(answers).filter(item => item.checked);
        let val;
        if (answersChecked.length > 0) {
          val = answersChecked[0].value;
        } else {
          return (
            <div key={id} className={isRow ? styles.card__content : ''}>
              <div className={`d-flex justify-content-between ${styles.card__field}`}>
                <span>{label}</span>
                <span>---</span>
              </div>
            </div>
          );
        }

        return (
          <div key={id} className={isRow ? styles.card__content : ''}>
            <div className={`d-flex justify-content-between ${styles.card__field}`}>
              <span>{label}</span>
              {
                typeof val === 'string' &&
                <span>{answersChecked[0].name}</span>
              }
              {
                typeof val === 'object' &&
                <div className={'d-flex flex-column align-items-end'}>
                  {
                    Object.entries(val).map(([key, value]) => {

                        return (
                          <span key={value}>{`${key} - $ ${value}`}</span>
                        );
                      }
                    )
                  }
                </div>
              }
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className='d-flex flex-wrap'>
      <div className='col-md-6 px-1 d-flex flex-column align-items-stretch'>
        <div className='panel mb-2 flex-grow-1 '>
          <div className={styles.card__header}>
            Capital
          </div>
          <div className={styles.card__content}>
            {
              questionsData && questionsData.filter(item => item.step === 1).map((item, i) => {
                return renderLifestyleList(capitalLabels[i], item);
              })
            }
          </div>
          <div className={styles.card__edit}>
            <Link to={{pathname: LIFESTYLE, state: {step: 1}}}>Edit</Link>
          </div>
        </div>
        <div className='panel mb-2 flex-grow-1'>
          <div className={styles.card__header}>
            Invest Strategy
          </div>
          <div className={styles.card__content}>
            {
              questionsData && questionsData.filter(item => item.step === 3).map((item, i) => {
                return renderLifestyleList(investLabels[i], item);
              })
            }
          </div>
          <div className={styles.card__edit}>
            <Link to={{pathname: LIFESTYLE, state: {step: 3}}}>Edit</Link>
          </div>
        </div>
      </div>

      <div className='col-md-6 px-1 d-flex flex-column align-items-stretch'>
        <div className='panel mb-2'>

          <div className={styles.card__header}>
            Financial
          </div>
          {
            questionsData && questionsData.filter(item => item.step === 2).map((item, i) => {
              return renderLifestyleList(financialLabels[i], item, true);
            })
          }
          <div className={styles.card__edit}>
            <Link to={{pathname: LIFESTYLE, state: {step: 2}}}>Edit</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

SettingsLifestyleProfile.propTypes = {
  styles: PropTypes.object.isRequired,
  questionsDataStatus: PropTypes.object.isRequired,
  questionsData: PropTypes.array,
  getQuestions: PropTypes.func,
};

const mapStateToProps = ({userProfile: {data}, lifestyle: {questionsData, questionsDataStatus}}) => ({
  data,
  questionsData: questionsData && Object.values(questionsData),
  questionsDataStatus,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getQuestions: getQuestions.request,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SettingsLifestyleProfile);

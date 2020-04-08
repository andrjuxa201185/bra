import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {EXPRESS_PORTFOLIO, DEEP_PORTFOLIO, EXPERT_PORTFOLIO} from "../../../navigation/routes";
import {TabNav, LinearProgress, Button, Spinner} from '../../controls';
import { Question, CircularCategory, DeepDiveSelectButtons } from '../../common';
import EnergyIcon from '../../../assets/images/icons/energy.png';
import styles from './DeepPortfolioStyles.scss';

const tabLinks = [
  {title: 'Express Portfolio', route: EXPRESS_PORTFOLIO, active: false},
  {title: 'Deep Dive Portfolio', route: DEEP_PORTFOLIO, active: true},
  {title: 'Experts Portfolio', route: EXPERT_PORTFOLIO, active: false},
];

const DeepPortfolioView = ({
                             data,
                             progress,
                             answers,
                             deepDiveSeen,
                             onClickContinue,
                             onCategoryClick,
                             currentCategory,
                             onSubmit,
                             onAnswer,
                             submitLoading,
                             dataStatus,
                             isOpenAlert,
                             updatedCategoryPosition,
                           }) => {
  const renderContent = () => {
    if (dataStatus.loading) {
      return <Spinner size='lg'/>;
    }

    if (data.length) {
      return (
        <>
          {deepDiveSeen ?
            <p className='mb-5'>
              Select the circles below to answer a few questions in each category. You can check out your progress for
              each by the inner circles within each of the eight big circles, and overall with the progress bar. When
              you complete the assessment, you are ready to invest in your future!
            </p> : null
          }
          <div className='panel'>
            <div className={styles.categories__wrapper}>

              <div className={`${styles.categories} ${!isOpenAlert ? styles.animateRun : styles.animateStop}`}>
                {data.map(({category_progress, color, icon, name, id, position}) => {
                  return (
                    <CircularCategory
                      isUpdated={position === updatedCategoryPosition && progress === 100}
                      key={id}
                      value={category_progress}
                      color={color}
                      icon={icon || EnergyIcon}
                      title={name}
                      isActive={currentCategory && currentCategory.id === id || false}
                      onClick={onCategoryClick(id)}
                    />
                  );
                })}
              </div>

              {progress ?
                <div className='col-12'>
                  <h3 className={styles.progress__title}>Your progress</h3>
                  <LinearProgress
                    value={progress}
                    type={'secondary'}
                  />
                </div> : null
              }
            </div>
          </div>
          {!deepDiveSeen ?
            <div>
              <h2 className={styles.pageHeading}>Welcome to Deep Dive Portfolio</h2>
              <p className='mb-4'>Select the circles below to answer a few questions in each category. You can check out
                your progress for each by the inner circles within each of the eight big circles, and overall with the
                progress bar. When you complete the assessment, you are ready to invest in your future!</p>
              <div className={styles.buttonWrapper}>
                <Button
                  title='Continue'
                  onClick={onClickContinue}
                />
              </div>
            </div> : null}
          {currentCategory ?
            <div>
              <h2 className={styles.pageHeading}>{currentCategory.name}</h2>
              {currentCategory.question.map((item, index) => {
                return (
                  <Question
                    currentCategory={currentCategory && currentCategory.name}
                    data={item}
                    key={item.id}
                    onAnswer={onAnswer}
                    index={index}
                    userAnswer={item.answer_value}
                    quizType={Question.quizTypes.DEEP_DIVE}
                  />
                );
              })}
              <div className={styles.buttonWrapper}>
                <Button
                  title={'Save and Next'}
                  onClick={onSubmit}
                  loading={submitLoading}
                />
              </div>
            </div> : null
          }
        </>
      );
    }
    return null;
  };
  return (
    <div>
      <div className='topPanel'>
        <div className='contentContainer'>
          <div className="worldViewTitle">
            <h1>Deep Dive Portfolio</h1>
            <DeepDiveSelectButtons quizType={'deep_dive'}/>
          </div>
          <TabNav links={tabLinks}/>
        </div>
      </div>

      <div className='mainContent'>
        <div className='contentContainer'>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

DeepPortfolioView.propTypes = {
  //data
  data: PropTypes.array.isRequired,
  dataStatus: PropTypes.object.isRequired,
  answers: PropTypes.object.isRequired,
  progress: PropTypes.number.isRequired,
  deepDiveSeen: PropTypes.bool.isRequired,
  submitLoading: PropTypes.bool.isRequired,
  isOpenAlert: PropTypes.bool.isRequired,
  currentCategory: PropTypes.object,
  updatedCategoryPosition:PropTypes.number,
  //handlers
  onClickContinue: PropTypes.func.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isOpenAlert: state.alert.isOpen,
});

export default connect(mapStateToProps)(DeepPortfolioView);


import React from 'react';
import PropTypes from "prop-types";
import { EXPRESS_PORTFOLIO, DEEP_PORTFOLIO, EXPERT_PORTFOLIO } from '../../../navigation/routes';
import { Spinner, TabNav } from '../../controls';
import { Question, DeepDiveSelectButtons } from '../../common';
//import styles from './ExpressPortfolioStyles.scss';

const tabLinks = [
  {title: 'Express Portfolio', route: EXPRESS_PORTFOLIO, active: true},
  {title: 'Deep Dive Portfolio', route: DEEP_PORTFOLIO, active: false},
  {title: 'Experts Portfolio', route: EXPERT_PORTFOLIO, active: false},
];

const ExpressPortfolioView = ({data, onPressButton, dataStatus, currentQuestionIndex}) => {

  const renderQuestion = () => {
    if (dataStatus.loading) {
      return <Spinner size='lg'/>;
    }
    if (data.length) {
      return (
        <Question
          data={data[currentQuestionIndex]}
          userAnswer={data[currentQuestionIndex].answer_value}
          index={currentQuestionIndex}
          onPressButton={onPressButton}
          questionQuantity={data.length}
          quizType={Question.quizTypes.EXPRESS}
        />);
    }
  };

  return (
    <div>
      <div className='topPanel'>
        <div className='contentContainer'>
          <div className="worldViewTitle">
            <h1>Express Portfolio</h1>
            <DeepDiveSelectButtons quizType={'express'}/>
          </div>
          <TabNav links={tabLinks}/>
        </div>
      </div>
      <div className='mainContent'>
        <div className='contentContainer'>
          {renderQuestion()}
        </div>
      </div>
    </div>
  );
};

ExpressPortfolioView.propTypes = {
  data: PropTypes.array.isRequired,
  dataStatus: PropTypes.object.isRequired,
  onPressButton: PropTypes.func.isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
};

export default ExpressPortfolioView;

import React from 'react';
import PropTypes from "prop-types";
import { Spinner, TabNav, Button } from '../../controls';
import { DeepDiveSelectButtons, Question } from '../../common';
import { EXPRESS_PORTFOLIO, DEEP_PORTFOLIO, EXPERT_PORTFOLIO } from "../../../navigation/routes";

// import PropTypes from 'prop-types';
import styles from './ExpertPortfolioStyles.scss';

const tabLinks = [
  {title: 'Express Portfolio', route: EXPRESS_PORTFOLIO, active: false},
  {title: 'Deep Dive Portfolio', route: DEEP_PORTFOLIO, active: false},
  {title: 'Experts Portfolio', route: EXPERT_PORTFOLIO, active: true},
];

const ExpertPortfolioView = ({
                               dataStatus, data,
                               onAnswer, onSubmit,
                               submitLoading,
}) => {
  const renderQuestion = () => {
    if (dataStatus.loading) {
      return <Spinner size='lg'/>;
    }
    if (data.length) {
      return (
        <>
          {data.map((item, index) => (
            <Question
              key={item.id}
              index={index}
              data={item}
              //onAnswer={onAnswer}
              userAnswer={item.recommended_weight}
              quizType={Question.quizTypes.EXPERT}
            />
          ))}
          <div className={styles.buttonWrapper}>
            <Button
              title='Submit'
              onClick={onSubmit}
              loading={submitLoading}
            />
          </div>
        </>
      );
    }
  };
  return (
    <div>
      <div className='topPanel'>
        <div className='contentContainer'>
          <div className="worldViewTitle">
            <h1>Experts Portfolio</h1>
            <DeepDiveSelectButtons quizType={'expert'} fillExpertsQuiz={onSubmit}/>
          </div>
          <TabNav links={tabLinks}/>
        </div>
      </div>
      <div className='mainContent'>
        <div className='contentContainer'>
          <p className='mb-5'>
            Our panel of economic and financial experts have selected a portfolio based on their assessment of the world
            across the eight category questions below (the small colored Brains logo is their selection). If you want to
            invest using their portfolio simply select Submit. Although you {'can\'t'} make changes to our Brains Experts World
            View on this page, you can select your own responses on the Express or Deep Dive paths.
          </p>
          {renderQuestion()}
        </div>
      </div>
    </div>
  );
};

ExpertPortfolioView.propTypes = {
  data: PropTypes.array.isRequired,
  dataStatus: PropTypes.object.isRequired,
  submitLoading: PropTypes.bool.isRequired,
  //actions
  onSubmit: PropTypes.func.isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default ExpertPortfolioView;

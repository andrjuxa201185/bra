import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import {globals} from '../../../store/globals';
import { Tooltip } from "../../controls";
import styles from './DeepDiveSelectButtonsStyles.scss';
import {getQuizTitle} from '../../../helpers/common';

import {RECOMMENDED_PORTFOLIO} from '../../../navigation/routes';

const DeepDiveSelectButtons = ({quizIsComplete, quizType, currentPortfolio, fillExpertsQuiz}) => {
  const isCurrent = quizType === currentPortfolio;

  const onClick = () => e => {
    e.preventDefault();
    if (quizType === 'expert' && fillExpertsQuiz) {
      fillExpertsQuiz();
      return null;
    }
    globals.history.push(RECOMMENDED_PORTFOLIO, {quizType});
  };

  if (!quizIsComplete) {
    return null;
  }

  // const buttonsData = [
  //   {quizType: 'express'},
  //   {quizType: 'deep_dive'},
  //   {quizType: 'expert'},
  // ];
  const tooltipCurrentText = 'This assessment is currently used for the recommended portfolio. You can select another assessment by clicking on the Invest button';
  const tooltipInvestInText = 'You can select this completed assessment to generate the recommended portfolio. When you select this assessment the button change to Current';

  return (
    <div className={styles.container}>
      {/*{buttonsData.map(item => {*/}
        {/*return (*/}
          {/*<div key={item.quizType} className={styles.buttonContainer} data-tip data-for={item.quizType}>*/}
            {/*{quizIsComplete[item.quizType] ?*/}
              {/*<>*/}
                {/*<a href=""*/}
                   {/*onClick={navTo(item.quizType)}*/}
                   {/*className={`${styles.button} ${!isCurrent(item.quizType) ? styles.button_transparent : ''}`}*/}
                {/*>*/}
                 {/*{isCurrent(item.quizType) ? 'Current' : 'Invest In'}*/}
                {/*</a>*/}
                {/*<ReactTooltip className={globalStyles.toolTip} id={item.quizType} type='info'>*/}
                  {/*{isCurrent(item.quizType) ? tooltipCurrentText : tooltipInvestInText}*/}
                {/*</ReactTooltip>*/}
              {/*</>: null*/}
            {/*}*/}
          {/*</div>*/}
        {/*);*/}
      {/*})}*/}

      <div className={styles.buttonContainer} data-tip data-for={quizType}>
        {quizIsComplete[quizType] ?
          <>
            <Tooltip text={isCurrent ? tooltipCurrentText : tooltipInvestInText}>
              <a href=""
                 onClick={onClick()}
                 className={`${styles.button}`}
              >
                {isCurrent ? 'Current' : `Invest In This ${getQuizTitle(quizType)} Portfolio`}
              </a>
            </Tooltip>
          </>: null
        }
      </div>
    </div>
  );
};

DeepDiveSelectButtons.propTypes = {
  currentPortfolio: PropTypes.string,
  quizType: PropTypes.string.isRequired,
  quizIsComplete: PropTypes.object,
  fillExpertsQuiz: PropTypes.func,
};
//
// DeepDiveSelectButtons.defaultProps = {
// };

const mapStateToProps = ({userProfile: {data}}) => {
  return {
    currentPortfolio: data && data.current_portfolio,
    quizIsComplete: data && data.quiz_is_complete,
  };
};

export default connect(mapStateToProps)(DeepDiveSelectButtons);

import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '../../controls';
import styles from "./QuizFinishedStyles.scss";
import { globals } from "../../../store/globals";
import { INTERESTS, RECOMMENDED_PORTFOLIO } from "../../../navigation/routes";

const QuizFinishedView = ({quizType}) => {
  const navTo = route => {
    globals.history.push(route, {quizType});
  };

  return (
    <div className='mainContent'>
      <div className='contentContainer'>
        <div className='panel'>
          <div className={styles.container}>
            <div className={styles.icon}>
              <img src={require('../../../assets/images/icons/big-done-icon.png')} alt='Congratulations'/>
            </div>
            <div className={styles.title}>Congratulations!</div>
            <p>Now that you have a World View you can invest now or move onto your Interests. The Interests assessment
              takes only a few minutes and will help us craft an even more customized portfolio for you.</p>
            <p>
              If you are ready to invest now submit your portfolio below and you’ll be taken to your Recommended
              Portfolio where you can invest according to your previous responses, or tailor your portfolio even further
              by selecting which of our Brains craft funds you would like to invest in.</p>
          </div>
        </div>
        <div className='mt-4 row mx-md-n3'>
          <div className='col-sm-6 px-sm-3 mb-3'>
            <Button
              title='Continue with Interests'
              onClick={() => navTo(INTERESTS)}
              transparent
            />
          </div>
          <div className='col-sm-6 px-sm-3 mb-3'>
            <Button
              title='Invest Now'
              onClick={() => navTo(RECOMMENDED_PORTFOLIO)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

QuizFinishedView.propTypes = {
  quizType: PropTypes.string.isRequired,
};

// const mapDispatchToProps = dispatch => bindActionCreators({
// }, dispatch);

export default QuizFinishedView;

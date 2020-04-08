import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Button} from '../../controls';
import styles from './QuestionStyles.scss';
import {Question} from "../index";

const range = [1, 2, 3, 4, 5, 6, 7];
const answerExpertExpress = {
  Medical: {sun: 'Advances', clouds: 'Regression'},
  Agricultural: {sun: 'Sufficient to Feed World', clouds: 'Failure & Starvation'},
  Environment: {sun: 'No Problem', clouds: 'Devastation'},
  Security: {sun: 'Low Probability', clouds: 'High Probability'},
  Population: {sun: 'Positive effect', clouds: 'Negative Effect'},
  Energy: {sun: 'Sufficient Supply', clouds: 'Insufficient Supply'},
  Technology: {sun: 'Positive', clouds: 'Harmful'},
  Economic: {sun: 'Healthy', clouds: 'Downturn'},
};
const answerDeepDive = {
  Medical: {
    Q1: {sun: 'Advances', clouds: 'Regression'},
    Q2: {sun: 'Life Extension', clouds: 'No Influence'},
    Q3: {sun: 'Available', clouds: 'Not Available'},
    Q4: {sun: 'None', clouds: 'Significant'},
  },
  Agricultural: {
    Q1: {sun: 'Sufficient to Feed World', clouds: 'Failure & Starvation'},
    Q2: {sun: 'Positive Force', clouds: 'Dangerous Ramifications'},
    Q3: {sun: 'Great Help', clouds: 'No Influence'},
  },
  Environment: {
    Q1: {sun: 'No Problem', clouds: 'Devastation'},
    Q2: {sun: 'No Problem', clouds: 'Devastation'},
    Q3: {sun: 'No Problem', clouds: 'Devastation'},
    Q4: {sun: 'No Problem', clouds: 'Devastation'},
  },
  Security: {
    Q1: {sun: 'Low Probability', clouds: 'High Probability'},
    Q2: {sun: 'Low Probability', clouds: 'High Probability'},
    Q3: {sun: 'Low Probability', clouds: 'High Probability'},
    Q4: {sun: 'Low Probability', clouds: 'High Probability'},
  },
  Population: {
    Q1: {sun: 'Significant Decrease', clouds: 'Significant Increase'},
    Q2: {sun: 'Positive effect', clouds: 'Negative Effect'},
  },
  Energy: {
    Q1: {sun: 'Alternative', clouds: 'Traditional'},
    Q2: {sun: 'Sufficient Supply', clouds: 'Insufficient'},
  },
  Technology: {
    Q1: {sun: 'Positive', clouds: 'Harmful'},
    Q2: {sun: 'Positive', clouds: 'Harmful'},
    Q3: {sun: 'Futuristic', clouds: 'Regression'},
  },
  Economic: {
    Q1: {sun: 'Decrease', clouds: 'Increase'},
    Q2: {sun: 'Increase', clouds: 'Decrease'},
    Q3: {sun: 'Increase', clouds: 'Decrease'},
    Q4: {sun: 'Low', clouds: 'High'},
  },
};

const QuestionView = ({
                        data, index, onAnswer,
                        userAnswer,
                        onPressButton,
                        questionQuantity,
                        quizType, currentCategory,
                      }) => {
  let [selectedItemIndex, setNewItemIndex] = useState(userAnswer || null);
  let [questionIndex, setQuestionIndex] = useState(index);

  const handleSelect = val => e => {
    e.preventDefault();
    if (quizType === QuestionView.quizTypes.EXPERT) {
      return null;
    }
    setNewItemIndex(val);
    if (onAnswer) {
      onAnswer(data.id, val);
    }
  };

  useEffect(() => {
    if (questionIndex !== index) {
      setQuestionIndex(index);
      setNewItemIndex(userAnswer || null);
    }
  });

  return (
    <div className={`${styles.container} panel`}>
      <div className={`${styles.header}`}>
        {quizType === Question.quizTypes.EXPRESS ?
          <React.Fragment>
            <div className={`${styles.header__title}`}>
              {index + 1}. {data.name}
            </div>
            <div className={`${styles.header__info}`}>
              Question of {index + 1} of {questionQuantity}
            </div>
          </React.Fragment> :
          <div className={`${styles.header__title}`}>
            {index + 1}. {quizType === QuestionView.quizTypes.DEEP_DIVE ? data.text : data.name}
          </div>
        }
      </div>
      {quizType !== QuestionView.quizTypes.DEEP_DIVE &&
        <div className={styles.text}>
          {data.text}
        </div>
      }
      <div className={styles.answer__container}>

        <div className={styles.answer__option}>
          <div className={`${styles.answer__point} ${styles.answer__point_sun}`}/>
          <div className={styles.answer__title}>
            {currentCategory
              ? data && answerDeepDive[currentCategory] && answerDeepDive[currentCategory][data.name] && answerDeepDive[currentCategory][data.name].sun
              : data && answerExpertExpress[data.name] && answerExpertExpress[data.name].sun
            }
          </div>
        </div>

        <div className={styles.answer__options}>
          {range.map((item, index) => (
            <>
              <a href='#'
                 key={index}
                 className={`
                 ${styles.circle__container}
                 ${data.recommended_weight === item ? styles.circle__container_recomended : ''}
                 ${selectedItemIndex === item ? styles.circle__container_active : ''}
                 ${quizType === QuestionView.quizTypes.EXPERT ? styles.disabled : ''}
                 `}
                 onClick={handleSelect(item)}
              >
                <div className={`
                  ${styles.circle__points}
                  circle__points
                `}>
                  <span/><span/><span/><span/>
                </div>
                <div className={`${styles.circle} circle`}>
                  <span/>
                </div>
              </a>
              <span key={`line-${index}`} className={styles.circle__line}>
              </span>
            </>
          ))}
        </div>

        <div className={styles.answer__option}>
          <div className={`${styles.answer__point} ${styles.answer__point_cloud}`}/>
          <a href='#' className={styles.answer__title}>
            {currentCategory
              ? data && answerDeepDive[currentCategory] && answerDeepDive[currentCategory][data.name] && answerDeepDive[currentCategory][data.name].clouds
              : data && answerExpertExpress[data.name] && answerExpertExpress[data.name].clouds
            }
          </a>
        </div>
      </div>

      {quizType === Question.quizTypes.EXPRESS ?
        <div className='d-flex justify-content-between'>
          {index === 0 ? <div/> :
          <div className={styles.button}>
            <Button
                onClick={() => onPressButton(data.id, selectedItemIndex, false)}
                style='primal'
                title={'Prev Category'}
                transparent
              />
          </div>
          }
          <div className={styles.button}>
            <Button
              onClick={() => onPressButton(data.id, selectedItemIndex, true)}
              style='primal'
              title={questionQuantity === index + 1 ? 'Submit' : 'Next Category'}
              transparent
            />
          </div>
        </div> : null
      }
    </div>
  );
};

QuestionView.quizTypes = {
  DEEP_DIVE: 'DEEP_DIVE',
  EXPERT: 'EXPERT',
  EXPRESS: 'EXPRESS',
};

QuestionView.propTypes = {
  onAnswer: PropTypes.func,
  onPressButton: PropTypes.func,
  //data
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  userAnswer: PropTypes.number,
  questionQuantity: PropTypes.number,
  currentCategory: PropTypes.string,
  quizType: PropTypes.oneOf([
    QuestionView.quizTypes.DEEP_DIVE,
    QuestionView.quizTypes.EXPERT,
    QuestionView.quizTypes.EXPRESS,
  ]).isRequired,
};

export default QuestionView;

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import animateScrollTo from 'animated-scroll-to';
import DeepPortfolioView from './DeepPortfolioView';
import {QuizFinished, OopsView} from '../../common';
import {getDeepQuiz, updateDeepQuiz} from '../../../store/quiz/quizActions';
import {showAlert} from '../../../store/alert/alertActions';
import {userHasSeen} from '../../../store/userExplainers/userExplainersActions';

class DeepPortfolioContainer extends Component {

  state = {
    updatedCategory: 0,
    currentCategory: null,
    answers: {},
    submitLoading: false,
  };

  componentDidMount() {
    this.props.getDeepQuiz();
  }

  _getNextCatIndex = () => {
    const {currentCategory} = this.state;
    if (!currentCategory) return null;
    const {data} = this.props;
    const index = data.findIndex(item => currentCategory.id === item.id);
    return index + 1;
  };

  isCategoryPassed = () => {
    const {currentCategory, answers} = this.state;
    let result = true;
    currentCategory.question.forEach(item => {
      if (!item.answer_value && !answers[item.id]) {
        result = false;
      }
    });

    return result;
  };

  setCurrentCategory = index => {
    const {data} = this.props;
    this.setState({currentCategory: data[index], answers: {}});

  };

  onClickContinue = () => {
    this.props.userHasSeen('deepDiveSeen');
    this.setCurrentCategory(0);
  };

  onCategoryClick = id => e => {
    e.preventDefault();
    const {data, deepDiveSeen} = this.props;
    const index = data.findIndex(item => item.id === id);
    this.setCurrentCategory(index);
    if (!deepDiveSeen) {
      this.props.userHasSeen('deepDiveSeen');
    }
    setTimeout(() => {
      animateScrollTo(600);
    });
  };

  onAnswer = (questionId, value) => {
    this.setState(prevState => {
      return {
        ...prevState,
        updatedCategory: this.state.currentCategory.position,
        answers: {
          ...prevState.answers,
          [questionId]: value,
        },
      };
    });
  };

  onSubmit = () => {
    const {currentCategory, answers} = this.state;
    const {data, showAlert, updateDeepQuiz, responseId} = this.props;

    if (!this.isCategoryPassed()) {
      showAlert({title: 'Warning', msg: 'You have not answered all questions'});
      return null;
    }
    const requestData = {
      category: [{
        id: currentCategory.id,
        answers: [],
      }],
    };

    for (let answer in answers) {
      const obj = {questionId: Number(answer), value: answers[answer]};
      requestData.category[0].answers.push(obj);
    }
    this.setState({submitLoading: true});
    updateDeepQuiz(requestData, responseId, progress => {
      if (this._getNextCatIndex() > data.length - 1) {
        this.setCurrentCategory(0);
        animateScrollTo(200);
        this.setState({submitLoading: false});
        return null;
      }
      this.setState({submitLoading: false, updatedCategory: 0});
      this.setCurrentCategory(this._getNextCatIndex());
      animateScrollTo(200);
    });
  };

  render() {
    const {currentCategory, submitLoading, answers} = this.state;
    const {data, dataStatus, progress, deepDiveSeen, isComplete} = this.props;

    if (isComplete) {
      return <QuizFinished quizType={'deep_dive'}/>;
    }
    if (dataStatus.fail) {
      return <OopsView/>;
    }
    return (
      <DeepPortfolioView
        data={data}
        answers={answers}
        progress={progress}
        deepDiveSeen={deepDiveSeen}
        currentCategory={currentCategory}
        submitLoading={submitLoading}
        onClickContinue={this.onClickContinue}
        onCategoryClick={this.onCategoryClick}
        onSubmit={this.onSubmit}
        onAnswer={this.onAnswer}
        dataStatus={dataStatus}
        updatedCategoryPosition={this.state.updatedCategory}
      />);
  }
}

DeepPortfolioContainer.propTypes = {
  //actions
  getDeepQuiz: PropTypes.func.isRequired,
  userHasSeen: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
  updateDeepQuiz: PropTypes.func.isRequired,
  //data
  data: PropTypes.array.isRequired,
  dataStatus: PropTypes.object.isRequired,
  progress: PropTypes.number.isRequired,
  responseId: PropTypes.number,
  deepDiveSeen: PropTypes.bool.isRequired,
  isComplete: PropTypes.bool,
};

const mapStateToProps = ({
                           quiz: {
                             deepDiveData,
                             deepDiveDataStatus,
                             deepDiveProgress,
                             responseId,
                             isComplete,
                           }, userExplainers: {
    deepDiveSeen,
  },
                         }) => ({
  data: deepDiveData,
  dataStatus: deepDiveDataStatus,
  progress: deepDiveProgress,
  deepDiveSeen,
  responseId,
  isComplete,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getDeepQuiz: getDeepQuiz.request,
  updateDeepQuiz: updateDeepQuiz.request,
  showAlert,
  userHasSeen,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeepPortfolioContainer);

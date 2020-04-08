import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { getExpressQuiz, updateExpressQuiz } from '../../../store/quiz/quizActions';
import ExpressPortfolioView from './ExpressPortfolioView';
import { OopsView, QuizFinished } from "../../common";
import {showAlert} from "../../../store/alert/alertActions";
import { globals } from '../../../store/globals';
import { RECOMMENDED_PORTFOLIO } from '../../../navigation/routes';

class ExpressPortfolioContainer extends Component {

  state = {
    currentQuestionIndex: 0,
  };

  componentDidMount() {
    this.props.getExpressQuiz();
  }

  goToCategory = isNext => {
    const {currentQuestionIndex} = this.state;
    const {data} = this.props;
    if (isNext && currentQuestionIndex < data.length-1) {
      this.setState({currentQuestionIndex: currentQuestionIndex+1});
    } else if (!isNext && currentQuestionIndex !== 0) {
      this.setState({currentQuestionIndex: currentQuestionIndex-1});
    }
  };

  onPressButton = (id, value, isNext) => {
    const {updateExpressQuiz, responseId, data, showAlert} = this.props;
    const currentQuestion = data.find(item => item.id === id);
    const isLastQuestion = data[data.length - 1].id === currentQuestion.id;

    if (!isNext) {
      this.goToCategory(isNext);
      return null;
    }

    if (!value && !currentQuestion.answer_value) {
      showAlert({title: 'Warning', msg: 'Please answer the question'});
      return null;
    }

    const requestData = {
      category: [{id, value}],
    };

    updateExpressQuiz(requestData, responseId, isShowThankPage => {
      if (isLastQuestion && !isShowThankPage) {
        globals.history.push(RECOMMENDED_PORTFOLIO, {quizType: 'express'});
      } else {
        this.goToCategory(isNext);
      }
    });
  };

  render() {
    const {data, dataStatus, isComplete} = this.props;
    const {currentQuestionIndex} = this.state;

    if (isComplete) {
      return <QuizFinished quizType={'express'}/>;
    }
    if (dataStatus.fail) {
      return <OopsView/>;
    }

    return (
      <ExpressPortfolioView
        data={data}
        onPressButton={this.onPressButton}
        dataStatus={dataStatus}
        currentQuestionIndex={currentQuestionIndex}
      />
    );
  }
}

ExpressPortfolioContainer.propTypes = {
  data: PropTypes.array.isRequired,
  dataStatus: PropTypes.object.isRequired,
  responseId: PropTypes.number,
  isComplete: PropTypes.bool,
  //actions
  getExpressQuiz: PropTypes.func.isRequired,
  updateExpressQuiz: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
};

const mapStateToProps = ({
                           quiz: {
                             expressData,
                             expressDataStatus,
                             responseId,
                             isComplete,
                           },
                         }) => ({
  data: expressData,
  dataStatus: expressDataStatus,
  responseId,
  isComplete,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getExpressQuiz: getExpressQuiz.request,
  updateExpressQuiz: updateExpressQuiz.request,
  showAlert,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExpressPortfolioContainer);

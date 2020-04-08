import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { getExpertQuiz, updateExpertQuiz } from '../../../store/quiz/quizActions';
import { showAlert } from '../../../store/alert/alertActions';
import { OopsView, QuizFinished } from "../../common";
import ExpertPortfolioView from './ExpertPortfolioView';
import { globals } from '../../../store/globals';
import { RECOMMENDED_PORTFOLIO } from '../../../navigation/routes';

class ExpertPortfolioContainer extends Component {

  state = {
    answers: {},
    submitLoading: false,
  };

  componentDidMount() {
    this.props.getExpertQuiz();
  }

  onSubmit = () => {
    let {answers} = this.state;
    const { updateExpertQuiz, responseId} = this.props;

    if (!Object.keys(answers).length) {
      // showAlert({
      //   title: 'Warning',
      //   msg: 'To submit quiz please answer at least one question',
      // });

      this.props.data.length && this.props.data.map(item => {
        answers = {...answers, [item.id]: item.recommended_weight};
      });
      //return null;
    }
    const requestData = {
      category: [],
    };
    for ( let answer in answers ) {
      const obj = {id: Number(answer), value: answers[answer]};
      requestData.category.push(obj);
    }
    updateExpertQuiz(requestData, responseId, isShowThankPage => {
      //console.log('requestData OK!');
      if (!isShowThankPage) {
        globals.history.push(RECOMMENDED_PORTFOLIO, {quizType: 'expert'});
      }
    });
  };

  onAnswer = (questionId, value) => {
    this.setState(prevState => {
      return {
        ...prevState,
        answers: {
          ...prevState.answers,
          [questionId]: value,
        },
      };
    });
  };

  render() {
    const {data, dataStatus, isComplete} = this.props;
    const {submitLoading} = this.state;

    if (isComplete) {
      return <QuizFinished quizType={'expert'}/>;
    }
    if (dataStatus.fail) {
      return <OopsView/>;
    }

    return (
      <ExpertPortfolioView
        data={data}
        dataStatus={dataStatus}
        onAnswer={this.onAnswer}
        submitLoading={submitLoading}
        onSubmit={this.onSubmit}
      />
    );
  }
}

ExpertPortfolioContainer.propTypes = {
  data: PropTypes.array.isRequired,
  dataStatus: PropTypes.object.isRequired,
  responseId: PropTypes.number,
  isComplete: PropTypes.bool,
  //actions
  getExpertQuiz: PropTypes.func.isRequired,
  updateExpertQuiz: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
};

const mapStateToProps = ({
                           quiz: {
                             expertData,
                             expertDataStatus,
                             responseId,
                             isComplete,
                           },
                         }) => ({
  data: expertData,
  dataStatus: expertDataStatus,
  responseId,
  isComplete,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getExpertQuiz: getExpertQuiz.request,
  updateExpertQuiz: updateExpertQuiz.request,
  showAlert,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExpertPortfolioContainer);

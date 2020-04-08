import React, {Component} from "react";
import {setIsAnswered} from "../../../helpers/lifestyle";

export const withHandlers = WrappedComponent => {
  class WithHandlers extends Component {
    state = {
      questions: null,
      answers: {},
      addressInputs: {}
    };

    componentDidUpdate(prevState) {
      this.setQuestionDataToState(prevState);
    }

    resetAnswers = () => {
      this.setState({
        answers: {}
      });
    }

    setQuestionDataToState(prevProps) {
      if (prevProps.questionsData !== this.props.questionsData) {
        const {questionsData} = this.props;
        const {questions} = this.state;

        if (questionsData && !questions) {
          this.setState({
            questions: questionsData,
          });
        }
      }
    }

    inputHandler = (questionId, value) => {
      // Change string for Trading symbols
      if (questionId === 31) {
        value = value.replace(/[^a-z0-9,.]/gi,'');
      }
      const {questions, answers} = this.state;
      const curQuestionAnswers = questions[questionId].answers;
      curQuestionAnswers.value = value;
      answers[questionId] = {value};
      this.setState({questions: setIsAnswered(questions), answers});
    };

    inputsHandler = (questionId, answerId, value) => {
      const {questions, answers} = this.state;
      const curQuestionAnswers = questions[questionId].answers;

      curQuestionAnswers[answerId].value = value;

      if (answers[questionId]) {
        answers[questionId] = {
          ...answers[questionId],
          [answerId]: {value},
        };
      } else {
        answers[questionId] = {[answerId]: {value}};
      }
      this.setState({questions: setIsAnswered(questions), answers});
    };

    radioHandler = ({questionId, answerId}) => {
      const {questions, answers} = this.state;
      const curQuestionAnswers = questions[questionId].answers;
      for (let answer in curQuestionAnswers) {
        curQuestionAnswers[answer].checked = false;
      }
      curQuestionAnswers[answerId].checked = !curQuestionAnswers[answerId].checked;
      answers[questionId] = {[answerId]: {checked: curQuestionAnswers[answerId].checked}};
      this.setState({questions: setIsAnswered(questions), answers});
    };

    checkboxHandler = checkedItem => {
      const {questions, answers} = this.state;
      const [questionId] = Object.keys(checkedItem);
      const [answerId] = Object.values(checkedItem)[0].id;
      const curQuestionAnswers = questions[questionId].answers;
      curQuestionAnswers[answerId].checked = !curQuestionAnswers[answerId].checked;
      if (answers[questionId]) {
        answers[questionId] = {
          ...answers[questionId],
          [answerId]: {checked: curQuestionAnswers[answerId].checked},
        };
      } else {
        answers[questionId] = {[answerId]: {checked: curQuestionAnswers[answerId].checked}};
      }
      this.setState({questions: setIsAnswered(questions), answers});
    };

    locationChangeHandler = place => {
      const types = {
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'short_name',
        postal_code: 'short_name',
      };
      const translator = {
        country: [5, 'country'],
        route: [4, 'address'],
        postal_code: [3, 'postal'],
        locality: [1, 'city'],
        administrative_area_level_1: [2, 'state'],
      };
      const result = {};

      for (let i = 0; i < place.address_components.length; i++) {
        let [addressType] = place.address_components[i].types;
        if (types[addressType]) {
          let value = place.address_components[i][types[addressType]];
          result[translator[addressType][0]] = {value};
        }
      }

      if (!result[1]) {
        // result[21] = {value: result[22] && result[22].value};
        result[1] = {value: Object.values(place.address_components).filter(item => item.types[0] === 'administrative_area_level_1')[0].long_name};
      }

      const {questions} = this.state;
      const key = Object.values(questions).find(item => item.type === 'address');
      const currAnswers = {...key.answers};
      for (let i = 1; i <= 5; i++) {
        currAnswers[i].value = result[i] ? result[i].value : '';
      }

      this.setState({
        questions: {
          ...this.state.questions,
          [key.id]: {
            ...this.state.questions[key.id],
            answers: currAnswers,
          }
        },
        answers: {
          ...this.state.answers,
          [key.id]: result,
        },
      }, () => setIsAnswered(this.state.questions));
    };

    addressInputChange = e => {
      if (e.target.value) {
        return;
      }

      const {questions} = this.state;
      const key = Object.values(questions).find(item => item.type === 'address');
      const currAnswers = {...key.answers};
      for (let i = 1; i <= 5; i++) {
        currAnswers[i].value = '';
      }

      this.setState({
        questions: {
          ...this.state.questions,
          [key.id]: {
            ...this.state.questions[key.id],
            answers: currAnswers,
          }
        },
        answers: {
          ...this.state.answers,
          [key.id]: {},
        },
      }, () => setIsAnswered(this.state.questions));
    };

    addressInputChange = e => {
      if (e.target.value) {
        return;
      }

      const {questions} = this.state;
      const key = Object.values(questions).find(item => item.type === 'address');
      const currAnswers = {...key.answers};
      for (let i = 1; i <= 5; i++) {
        currAnswers[i].value = '';
      }

      this.setState({
        questions: {
          ...this.state.questions,
          [key.id]: {
            ...this.state.questions[key.id],
            answers: currAnswers,
          }
        },
        answers: {
          ...this.state.answers,
          [key.id]: {},
        },
      }, () => setIsAnswered(this.state.questions));
    };

    render() {
      const handlers = {
        radioHandler: this.radioHandler,
        inputHandler: this.inputHandler,
        inputsHandler: this.inputsHandler,
        checkboxHandler: this.checkboxHandler,
        locationChangeHandler: this.locationChangeHandler,
        addressInputChange: this.addressInputChange,
      };

      return (
        <WrappedComponent {...this.props} {...handlers} {...this.state} resetAnswers={this.resetAnswers} />
      );
    }
  }

  return WithHandlers;
};

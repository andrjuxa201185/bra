import { PortfolioQuestionsTypes } from '../components/pages/PortfolioCreate/PortfolioCreateView';

const {CHECKBOX, INPUT, INPUTS, RADIO, SELECT, ADDRESS} = PortfolioQuestionsTypes;

export const setIsAnswered = questions => {
  const newQuestions = {...questions};
  for (let id in newQuestions) {
    switch (questions[id].type) {
      case SELECT:
      case RADIO:
      case CHECKBOX: {
        let isAnswered = false;
        Object.values(questions[id].answers).forEach(answer => {
          if (answer.checked) {
            isAnswered = true;
          }
        });
        questions[id].isAnswered = isAnswered;
      }
        break;
      case INPUT: {
        let isAnswered = false;
        if (questions[id].answers.value) {
          isAnswered = true;
        }
        questions[id].isAnswered = isAnswered;
      }
        break;
      case INPUTS: {
        let isAnswered = true;
        Object.values(questions[id].answers).forEach(answer => {
          if (!answer.value) {
            isAnswered = false;
          }
        });
        questions[id].isAnswered = isAnswered;
      }
        break;

      case ADDRESS: {
        let isAnswered = true;
        Object.values(questions[id].answers).forEach(answer => {
          if (!answer.value) {
            isAnswered = false;
          }
        });
        questions[id].isAnswered = isAnswered;
      }
    }
  }
  return newQuestions;
};

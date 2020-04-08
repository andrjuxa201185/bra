import { createSelector } from 'reselect';
import { setIsAnswered } from "./lifestyle";

const selector = data => data;

export const selectHasCheckedInterest = createSelector(
  selector,
  interestsData => {
    if (interestsData) {
      let isChecked = false;
      for (let i in interestsData) {
        const {funds} = interestsData[i];
        if (isChecked) break;

        for (let j in funds) {
          if (isChecked) break;
          if (funds[j].checked) {
            isChecked = true;
          }
        }
      }
      return isChecked;
    }

    return null;
  }
);

export const selectQuestions = createSelector(
  selector,
  questionsData => {
    if (questionsData) {
      questionsData = setIsAnswered(questionsData);

      Object.values(questionsData).forEach(question => {
        //step
        if (question.id >= 1 && question.id <= 6) {
          question.step = 1;
        }
        if (question.id >= 7 && question.id <= 9) {
          question.step = 2;
        }
        if (question.id >= 10 && question.id <= /*10*/ 20) {
          question.step = 3;
        }

      });

      return questionsData;
    }

    return null;

  }
);

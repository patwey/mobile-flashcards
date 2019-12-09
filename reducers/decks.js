import {
  ADD_DECK,
  ADD_DECK_QUESTION,
  ADD_DECK_QUESTION_CORRECT,
  RESET_DECK_CORRECTS,
  RECEIVE_DECKS,
} from '../actions';

export default function decks(state = {}, action) {
  switch (action.type) {
    case ADD_DECK: {
      const newState = {
        ...state,
        [action.deck.id]: action.deck,
      };
      
      return newState;
    }
    case ADD_DECK_QUESTION: {
      const { deckId, question } = action.deckQuestion;
      const deck = state[deckId];
      
      return {
        ...state,
        [deckId]: {
          ...deck,
          questions: {
            ...deck.questions,
            [question.id]: question,
          },
        },
      };
    }
    case ADD_DECK_QUESTION_CORRECT: {
      const { deckId, questionId, correct } = action.deckQuestionCorrect;
      const deck = state[deckId];
      const questions = deck.questions;
      const question = questions[questionId];

      return {
        ...state,
        [deckId]: {
          ...deck,
          questions: {
            ...questions,
            [questionId]: {
              ...question,
              correct,
            },
          },
        },
      };
    }
    case RESET_DECK_CORRECTS: {
      const deck = state[action.id];

      return {
        ...state,
        [action.id]: {
          ...deck,
          questions: Object.values(deck.questions).reduce(
            (acc, question) => {
              acc[question.id] = { ...question, correct: null };
              return acc;
            },
            {},
          ),
        },
      };
    }
    case RECEIVE_DECKS:
      return action.decks;
    default:
      return state;
  }
};

export const ADD_DECK = 'ADD_DECK';
export const ADD_DECK_QUESTION = 'ADD_DECK_QUESTION';
export const ADD_DECK_QUESTION_CORRECT = 'ADD_DECK_QUESTION_CORRECT';
export const RESET_DECK_CORRECTS = 'RESET_DECK_CORRECTS';
export const RECEIVE_DECKS = 'RECEIVE_DECKS'

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
};

export function addDeckQuestion(deckQuestion) {
  return {
    type: ADD_DECK_QUESTION,
    deckQuestion,
  };
};

export function addDeckQuestionCorrect(deckQuestionCorrect) {
  return {
    type: ADD_DECK_QUESTION_CORRECT,
    deckQuestionCorrect,
  };
};

export function resetDeckCorrects(id) {
  return {
    type: RESET_DECK_CORRECTS,
    id,
  };
};

export function recieveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

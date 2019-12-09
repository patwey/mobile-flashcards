import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'DECKS';

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY);
};

export function saveDeck(deck) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deck.id]: deck,
  }));
};

export function saveDeckQuestion(deckQuestion) {
  const { deckId, question } = deckQuestion;

  return getDecks().then((results) => {
    const decks = JSON.parse(results);
    const deck = decks[deckId];
    
    AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [deckId]: {
        ...deck,
        questions: {
          ...deck.questions,
          [question.id]: question,
        },
      },
    }));
  });
};

export function saveDeckQuestionCorrect(deckQuestionCorrect) {
  const { deckId, questionId, correct } = deckQuestionCorrect;
  
  return getDecks().then((results) => {
    const decks = JSON.parse(results);
    const deck = decks[deckId];
    const question = deck.questions[questionId];

    AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [deckId]: {
        ...deck,
        questions: {
          ...deck.questions,
          [questionId]: {
            ...question,
            correct,
          },
        },
      },
    }));
  });
};

export function saveResettedDeck(deckId) {
  return getDecks().then((results) => {
    const decks = JSON.parse(results);
    const deck = decks[deckId];

    AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [deckId]: {
        ...deck,
        questions: Object.values(deck.questions).reduce(
          (acc, question) => {
            acc[question.id] = { ...question, correct: null };
            return acc;
          },
          {},
        ),
      },
    }));
  });
};

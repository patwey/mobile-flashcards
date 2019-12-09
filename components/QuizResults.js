import React from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { saveResettedDeck } from '../api';
import { resetDeckCorrects } from '../actions';

function QuizResults({ decks, navigation, dispatch }) {
  const deckId = navigation.getParam('deckId', null);
  const deck = decks[deckId];
  const questionsArray = Object.values(deck.questions);
  const cardCount = questionsArray.length;
  const correctCount = questionsArray
    .filter((question) => question.correct)
    .length;

  const handleRestart = () => {
    saveResettedDeck(deckId).then(() => {
      dispatch(resetDeckCorrects(deckId));
    });
  }

  const viewDeck = () => {
    navigation.navigate('DeckDetail', { deckId });
  }

  return (
    <View style={styles.center}>
      <Text style={[styles.h3, { marginTop: 40 }]}>YOU ANSWERED</Text>
      <Text style={styles.h3}>{correctCount}/{cardCount}</Text>
      <Text style={styles.h3}>QUESTION(S) CORRECTLY</Text>
      <TouchableOpacity style={styles.button} onPress={handleRestart}>
        <Text style={styles.buttonText}>RESTART QUIZ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => viewDeck()}>
        <Text style={styles.buttonText}>BACK TO DECK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  h3: {
    color: '#000000',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#dbd9d9',
  },
  buttonText: {
    fontSize: 15,
  },
});

const QuizResultsWithNavigation = withNavigation(QuizResults);

const mapStateToProps = ({ decks }) => ({ decks });

export default connect(mapStateToProps)(QuizResultsWithNavigation);

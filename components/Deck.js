import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

function Deck({ deck, navigation }) {
  const { id, title, questions } = deck;

  const visitAddCardForm = () => {
    navigation.navigate('AddCardForm', { deckId: id });
  };

  const visitQuiz = () => {
    clearLocalNotification()
      .then(setLocalNotification);
    navigation.navigate('Quiz', { deckId: id });
  };

  return (
    <View style={styles.center}>
      <Text style={styles.headerText}>{title}</Text>
      <Text style={styles.cardCount}>
        {Object.keys(questions).length} CARD(S)
      </Text>
      <TouchableOpacity style={styles.button} onPress={visitAddCardForm}>
        <Text style={styles.buttonText}>ADD CARD</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={visitQuiz}>
        <Text style={styles.buttonText}>START QUIZ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#000000',
    textTransform: 'uppercase',
    fontSize: 35,
    marginTop: 40,
  },
  cardCount: {
    color: '#7d7d7d',
    fontSize: 15,
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
  }
})

const mapStateToProps = ({ decks }, { navigation }) => {
  const deckId = navigation.getParam('deckId', null);
  
  return {
    deck: decks[deckId],
  };
};

export default connect(mapStateToProps)(Deck);

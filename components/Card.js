import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { saveDeckQuestionCorrect } from '../api';
import { addDeckQuestionCorrect } from '../actions';

class Card extends React.Component {
  state = {
    showAnswer: false,
  };

  toggleShowAnswer() {
    this.setState((prevState) => ({ showAnswer: !prevState.showAnswer }));
  }

  handleCorrect(correct) {
    const { dispatch, deckId, card } = this.props;
    const deckQuestionCorrect = {
      deckId: deckId,
      questionId: card.id,
      correct,
    };

    saveDeckQuestionCorrect(deckQuestionCorrect)
      .then(() => {
        this.setState({ showAnswer: false });
        dispatch(addDeckQuestionCorrect(deckQuestionCorrect));
      });
  }

  render() {
    const { card } = this.props
    
    return (
      <View style={styles.center}>
        <Text style={[styles.questionText, { marginTop: 40 }]}>
          {card.question}
        </Text>
        <TouchableOpacity onPress={() => this.toggleShowAnswer()}>
          <Text
            style={[styles.buttonText, { color: '#2f8bfa', marginTop: 20 }]}
          >
            SHOW ANSWER
          </Text>
        </TouchableOpacity>
        {this.state.showAnswer && (
          <Text style={[styles.questionText, { marginTop: 20 }]}>
            {card.answer}
          </Text>
        )}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#48b51d' }]}
          onPress={() => this.handleCorrect(true)}
        >
          <Text style={[styles.buttonText, { color: '#ffffff' }]}>
            CORRECT
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#e04848' }]}
          onPress={() => this.handleCorrect(false)}
        >
          <Text style={[styles.buttonText, { color: '#ffffff' }]}>
            INCORRECT
          </Text>
        </TouchableOpacity>
        <Text style={[styles.buttonText, { marginTop: 20 }]}>
          {this.props.questionsRemaining} QUESTION(S) REMAINING
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
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

export default connect()(Card);

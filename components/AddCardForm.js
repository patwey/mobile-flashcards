import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { createId } from '../utils/helpers';
import { saveDeckQuestion } from '../api';
import { addDeckQuestion } from '../actions';

class AddCardForm extends React.Component {
  state = {
    question: 'QUESTION',
    answer: 'ANSWER',
  };

  handleTextChange(text, key) {
    this.setState({ [key]: text })
  }

  handleSubmit() {
    const deckId = this.props.navigation.getParam('deckId', null);
    const { question, answer } = this.state;
    const newQuestion = {
      deckId: deckId,
      question: {
        id: createId(),
        correct: null,
        question,
        answer,
      },
    }

    saveDeckQuestion(newQuestion)
      .then(() => {
        this.props.dispatch(addDeckQuestion(newQuestion));
        this.setState({ question: 'QUESTION', answer: 'ANSWER' });
        this.props.navigation.goBack();
      });
  }

  render() {
    const { question, answer } = this.state;
    const disabled = question === 'QUESTION' || answer === 'ANSWER';
    
    return (
      <View style={styles.center}>
        <Text style={styles.headerText}>ADD CARD</Text>
        <TextInput
          style={styles.textInput}
          value={question}
          onChangeText={(text) => this.handleTextChange(text, 'question')}
        />
        <TextInput
          style={styles.textInput}
          value={answer}
          onChangeText={(text) => this.handleTextChange(text, 'answer')}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleSubmit()}
          disabled={disabled}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#000000',
    fontSize: 35,
    marginTop: 40,
  },
  textInput: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ededed',
    borderRadius: 50
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

const mapStateToProps = (_, { navigation }) => ({ navigation });

export default connect(mapStateToProps)(AddCardForm);

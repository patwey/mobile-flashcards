import React from 'react';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import { saveDeck } from '../api';
import { createId } from '../utils/helpers';
import { addDeck } from '../actions';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

class AddDeckForm extends React.Component {
  state = {
    title: 'TITLE',
  };

  handleTitleChange(title) {
    this.setState({ title });
  }

  handleSubmit() {
    const { dispatch, navigation } = this.props;
    const { title } = this.state;
    const id = createId();
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    const newDeck = { id, title, questions: {} };
    
    saveDeck(newDeck)
      .then(() => {
        dispatch(addDeck(newDeck));
        this.setState({ title: 'TITLE' });
        this.props.navigation.dispatch(resetAction);
        navigation.navigate('DeckDetail', { deckId: id });
      })
  }

  render() {
    const { title } = this.state;
    const disabled = title === 'TITLE';
    
    return (
      <View style={styles.center}>
        <Text style={styles.headerText}>ADD DECK</Text>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={(text) => this.handleTitleChange(text)}
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

export default connect()(AddDeckForm);

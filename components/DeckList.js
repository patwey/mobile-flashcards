import React from 'react';
import { connect } from 'react-redux';
import { getDecks } from '../api';
import { recieveDecks } from '../actions';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DeckOverview from './DeckOverview';

class DeckList extends React.Component {
  componentDidMount() {
    getDecks()
      .then((results) => {
        const decks = JSON.parse(results) || {};

        this.props.dispatch(recieveDecks(decks));
      });
  }

  viewDeck(id) {
    this.props.navigation.navigate('DeckDetail', { deckId: id });
  }

  viewAddDeckForm() {
    this.props.navigation.navigate('AddDeckForm');
  }

  render() {
    return (
      <View style={styles.center}>
        <Text style={styles.headerText}>DECKS</Text>
        <TouchableOpacity onPress={() => this.viewAddDeckForm()}>
          <Text style={[this.buttonText, { color: '#2f8bfa', marginTop: 20 }]}>
            ADD DECK
          </Text>
        </TouchableOpacity>
        {Object.entries(this.props.decks).map(([id, deck]) => (
          <DeckOverview key={id} deck={deck} onPress={() => this.viewDeck(id)} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    marginTop: 40,
    alignItems: 'center',
  },
  headerText: {
    color: '#000000',
    fontSize: 35,
  },
  buttonText: {
    fontSize: 15,
  },
});

const mapStateToProps = ({ decks }) => ({ decks });

export default connect(mapStateToProps)(DeckList);

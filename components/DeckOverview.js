import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function Deck({ deck, onPress }) {
  const { id, title, questions } = deck;

  return (
    <View>
      <TouchableOpacity style={styles.deck} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.cardCount}>
          {Object.keys(questions).length} CARD(S)
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  deck: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#dbd9d9',
  },
  title: {
    textTransform: 'uppercase',
    color: '#000000',
    fontSize: 15,
  },
  cardCount: {
    color: '#7d7d7d',
    fontSize: 12,
  }
});

export default Deck;

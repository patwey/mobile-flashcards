import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import QuizResults from './QuizResults';
import Card from './Card';

class Quiz extends React.Component {
  render() {
    const { deck, navigation } = this.props;
    const unansweredQuestions = Object.values(deck.questions)
      .filter(question => question.correct === null);
    const questionsRemaining = unansweredQuestions.length;

    return (
      <View>
        {questionsRemaining > 0 ? (
          <Card
            card={unansweredQuestions[0]}
            deckId={deck.id}
            questionsRemaining={questionsRemaining}
          />
        ) : (
          <QuizResults deckId={deck.id} />
        )}    
      </View>
    );
  }
}

const mapStateToProps = ({ decks }, { navigation }) => {
  const deckId = navigation.getParam('deckId', null);
    
  return {
    deck: decks[deckId],
  };
};

export default connect(mapStateToProps)(Quiz);

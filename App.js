import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { setLocalNotification } from './utils/helpers';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import AddCardForm from './components/AddCardForm';
import Quiz from './components/Quiz';
import Card from './components/Card';
import QuizResults from './components/QuizResults';
import AddDeckForm from './components/AddDeckForm';

const AppNavigator = createStackNavigator(
  {
    Home: DeckList,
    DeckDetail: Deck,
    AddCardForm: AddCardForm,
    AddDeckForm: AddDeckForm,
    Quiz: Quiz,
    Card: Card,
    QuizResults: QuizResults,
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;

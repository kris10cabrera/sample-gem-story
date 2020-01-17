import React from 'react';
import { connect } from 'react-redux';
import Scene from './Scene';
import Choices from './Choices';
import Story from './Story';
import { makeChoice } from './state/actions';
import './App.css';

const App = props => 
props.ending ? (
  <div className="ending">This is the end! <span role="image" aria-label="party" >🎉</span></div>
) : (
  <div className="App">
    <Story sceneText={props.sceneText} />
    <Choices choices={props.currentChoices} makeChoice={props.makeChoice} />
    <Scene tags={props.tags} />
  </div>
);

const stateToProps = state => ({
  tags: state.tags,
  currentChoices: state.currentChoices,
  sceneText: state.sceneText,
  ending: state.ending
});

const dispatchToProps = dispatch => ({
  makeChoice: index => dispatch(makeChoice(index))
});

export default connect(stateToProps, dispatchToProps)(App);
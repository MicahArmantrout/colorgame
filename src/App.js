import React from 'react';
import './App.css';
import * as _ from 'lodash';

const colors = ['black', 'blue', 'red', 'green', 'yellow'];


class Game extends React.Component {
  state = {
    meaningWord: _.sample(colors),
    inkWord: _.sample(colors),
    inkColor: _.sample(colors),
    gameStatus: 'playing', // Possible other values: correct, wrong
  };


  handleClick = (yesClick) => {

    this.setState((prevState) => {
      if (prevState.gameStatus !== 'playing') {
        return null;
      }
      const meaningInkMatch = prevState.meaningWord === prevState.inkColor;
      const correct = (meaningInkMatch ^ yesClick) === 0;
      return { gameStatus: correct ? 'correct' : 'wrong' };
    }, this.resetGameAfterDelay() );
  };

  resetGameAfterDelay = () => {
    setTimeout(() => {
      this.setState({
        meaningWord: _.sample(colors),
        inkWord: _.sample(colors),
        inkColor: _.sample(colors),
        gameStatus: 'playing',
      })
    }, 500);
  }

  render() {
    return (
      <div className="game">
        <div className="help">
          Does the meaning of the top word match the ink
          color of the bottom word?
        </div>
        <div className="body">
          <div
            className={`game-status status-${
              this.state.gameStatus
              }`}
          />
          <div className="meaning">
            {this.state.meaningWord.toUpperCase()}
          </div>
          <div
            className="ink"
            style={{ color: this.state.inkColor }}
          >
            {this.state.inkWord.toUpperCase()}
          </div>
          <div className="buttons">
            <button onClick={() => this.handleClick(true)}>YES</button>
            <button onClick={() => this.handleClick(false)}>NO</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;

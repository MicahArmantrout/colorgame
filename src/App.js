import React from 'react';
import './App.css';
import * as _ from 'lodash';


const colors = [ 'black', 'blue', 'red', 'green', 'yellow', 'purple' ];
const randomColors = () => {
  const meaningWord = _.sample(colors);
  const inkWord = _.sample(colors);
  const inkColor = _.sample(colors);

  return {
    meaningWord,
    inkWord,
    inkColor, 
    meaningInkMatch: meaningWord === inkColor,
  };
};

class Game extends React.Component {
  state = {
    gameStatus: 'playing', 
  };





  colorValues = randomColors();

  handleClick = (yesClick) => {

    this.setState((prevState) => {
      if (prevState.gameStatus !== 'playing') {
        return null;
      }
      const meaningInkMatch = prevState.meaningWord === prevState.inkColor;
      const correctClick = (this.colorValues.meaningInkMatch ^ yesClick) === 0;
      return { gameStatus: correctClick ? 'correct' : 'wrong' };
    }, this.resetGameAfterDelay());
  };

  resetGameAfterDelay = () => {
    setTimeout(() => {

      this.colorValues = randomColors();

      this.setState({
        gameStatus: 'playing',
      })
    }, 500);
  }

 


  render() {

    const {
      meaningWord,
      inkWord,
      inkColor,
    } = this.colorValues;

    const { gameStatus } = this.state;

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
            {meaningWord.toUpperCase()}
          </div>
          <div
            className="ink"
            style={{ color: inkColor.toUpperCase() }}
          >
            {inkWord.toUpperCase()}
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

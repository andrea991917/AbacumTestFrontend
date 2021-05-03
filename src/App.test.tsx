import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Game from "./pages/Game";
import {MovesEnum,checkMove,getWinner,getMove,winnerSelection} from "./services/game"


test('test initialCard', () => {
  render(<Game />);
  const linkElement = screen.getByText(/Rock, Paper, Scissors, Lizard, Spock/i);
  expect(linkElement).toBeInTheDocument();
});


test('test function checkMove', () => {
  let moves = [
    'MOVE_SCISSORS',
    'MOVE_PAPER',
    'MOVE_ROCK',
    'MOVE_SPOCK',
    'MOVE_LIZARD'
  ]
  let testMatrix = [
    [0,1,0,0,1], // MOVE_SCISSORS
    [0,0,1,1,0], // MOVE_PAPER
    [1,0,0,0,1], // MOVE_ROCK
    [1,0,1,0,0], // MOVE_SPOCK
    [0,1,0,1,0] // MOVE_LIZARD
  ]
  for (let a = 0; a < moves.length; a++) {
    for (let b = 0; b < moves.length; b++) {
      const checkMoveTest = checkMove(moves[a], moves[b]);
      expect(checkMoveTest).toEqual(!!testMatrix[a][b])
    }
  }

});


test('test function winner', () => {
  let moves = [
    'MOVE_SCISSORS',
    'MOVE_PAPER',
    'MOVE_ROCK',
    'MOVE_SPOCK',
    'MOVE_LIZARD'
  ]
  let testMatrix = [
    [0,1,2,2,1], // MOVE_SCISSORS
    [2,0,1,1,2], // MOVE_PAPER
    [1,2,0,2,1], // MOVE_ROCK
    [1,2,1,0,2], // MOVE_SPOCK
    [2,1,2,1,0] // MOVE_LIZARD
  ]
  for (let a = 0; a < moves.length; a++) {
    for (let b = 0; b < moves.length; b++) {
      const checkMoveTest = getWinner(moves[a], moves[b]);
      console.log(checkMoveTest,winnerSelection[testMatrix[a][b]], moves[a],moves[b])
      expect(checkMoveTest).toEqual(testMatrix[a][b])
    }
  }

});

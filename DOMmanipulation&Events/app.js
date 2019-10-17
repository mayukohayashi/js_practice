/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

PIG GAMES!
*/


var scores, roundScore, activePlayer, dice;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

// can check on console about this math
dice = Math.floor(Math.random() * 6) + 1
// console.log(dice); //ok for in console

// '#current-' then 0 or 1
// textContent only give plain text, if i want to giv HTML...
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
document.querySelector('#current-' + activePlayer).textContent = dice;

// show what the ID has *Getter!
var x = document.querySelector('#score-0').textContent;
console.log(x)

// hide the dice in the beginning
// need to change CSS property! so use style method!!!
document.querySelector('.dice').style.display = 'none';
document.querySelector('.btn-roll').addEventListener('click')





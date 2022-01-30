let playerScore = 0
let computerScore = 0
let roundWinner = ''

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    roundWinner = 'tie'
  }
  if (
    (playerSelection === 'GUN' && computerSelection === 'BEAR') ||
    (playerSelection === 'BEAR' && computerSelection === 'FARMER') ||
    (playerSelection === 'FARMER' && computerSelection === 'GUN')
  ) {
    playerScore++
    roundWinner = 'player'
  }
  if (
    (computerSelection === 'GUN' && playerSelection === 'BEAR') ||
    (computerSelection === 'BEAR' && playerSelection === 'FARMER') ||
    (computerSelection === 'FARMER' && playerSelection === 'GUN')
  ) {
    computerScore++
    roundWinner = 'computer'
  }
  updateScoreMessage(roundWinner, playerSelection, computerSelection)
}

function getRandomChoice() {
  let randomNumber = Math.floor(Math.random() * 3)
  switch (randomNumber) {
    case 0:
      return 'GUN'
    case 1:
      return 'FARMER'
    case 2:
      return 'BEAR'
  }
}

function isGameOver() {
  return playerScore === 5 || computerScore === 5
}


const scoreInfo = document.getElementById('scoreInfo')
const scoreMessage = document.getElementById('scoreMessage')
const playerScorePara = document.getElementById('playerScore')
const computerScorePara = document.getElementById('computerScore')
const playerSign = document.getElementById('playerSign')
const computerSign = document.getElementById('computerSign')
const rockBtn = document.getElementById('rockBtn')
const paperBtn = document.getElementById('paperBtn')
const scissorsBtn = document.getElementById('scissorsBtn')
const endgameModal = document.getElementById('endgameModal')
const endgameMsg = document.getElementById('endgameMsg')
const overlay = document.getElementById('overlay')
const restartBtn = document.getElementById('restartBtn')

rockBtn.addEventListener('click', () => handleClick('GUN'))
paperBtn.addEventListener('click', () => handleClick('FARMER'))
scissorsBtn.addEventListener('click', () => handleClick('BEAR'))
restartBtn.addEventListener('click', restartGame)
overlay.addEventListener('click', closeEndgameModal)

function handleClick(playerSelection) {
  if (isGameOver()) {
   
    return
  }

  const computerSelection = getRandomChoice()
  playRound(playerSelection, computerSelection)
  updateChoices(playerSelection, computerSelection)
  updateScore()

  if (isGameOver()) {

  }
}

function updateChoices(playerSelection, computerSelection) {
  switch (playerSelection) {
    case 'GUN':
      playerSign.textContent = '🔫'
      break
    case 'FARMER':
      playerSign.textContent = '👨‍🌾'
      break
    case 'BEAR':
      playerSign.textContent = '🐻'
      break
  }

  switch (computerSelection) {
    case 'GUN':
      computerSign.textContent = '🔫'
      break
    case 'FARMER':
      computerSign.textContent = '👨‍🌾'
      break
    case 'BEAR':
      computerSign.textContent = '🐻'
      break
  }
}

function updateScore() {
  if (roundWinner === 'tie') {
    scoreInfo.textContent = "It's a tie!"
  } else if (roundWinner === 'player') {
    scoreInfo.textContent = 'You won!'
  } else if (roundWinner === 'computer') {
    scoreInfo.textContent = 'You lost!'
  }

  playerScorePara.textContent = `Player: ${playerScore}`
  computerScorePara.textContent = `Computer: ${computerScore}`
}

function updateScoreMessage(winner, playerSelection, computerSelection) {
  if (winner === 'player') {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} kills the ${computerSelection.toLowerCase()}`
    return
  }
  if (winner === 'computer') {
    scoreMessage.textContent = `The ${
      playerSelection.toLowerCase()
    } is killed by the ${computerSelection.toLowerCase()}`
    return
  }

  scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} ties with ${computerSelection.toLowerCase()}`
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}


function restartGame() {
  playerScore = 0
  computerScore = 0
  scoreInfo.textContent = 'Choose your weapon'
  scoreMessage.textContent = 'First to score 5 points wins the game'
  playerScorePara.textContent = 'Player: 0'
  computerScorePara.textContent = 'Computer: 0'
  playerSign.textContent = '❔'
  computerSign.textContent = '❔'
 
}
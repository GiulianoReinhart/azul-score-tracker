import Board from './components/Board/Board'
import './styles/reset.scss'
import {useEffect, useState} from 'react'
import GlobalStyle from './styles/GlobalStyle'

function App() {
  let emptyBoard = []

  for (let i = 0; i < 5; i++) {
    emptyBoard.push([false, false, false, false, false])
  }

  const [board, setBoard] = useState(emptyBoard)
  const [roundBoard, setRoundBoard] = useState(emptyBoard)
  const [currentRound, setCurrentRound] = useState(1)
  const [roundTiles, setRoundTiles] = useState([])
  const [points, setPoints] = useState(0)

  useEffect(() => {
    console.log(roundTiles)
    recalculatePoints(roundBoard, roundTiles)
  }, [roundTiles])

  useEffect(() => {
    //console.log(board)
  }, [board])

  const checkBoundaries = (_row, _column) => {
    if (_row > 4 || _row < 0 || _column > 4 || _column < 0) {
      return false
    } else {
      return true
    }
  }

  const recalculatePoints = (_board, _roundTiles) => {
    setPoints(0)
    let tempBoard = JSON.parse(JSON.stringify(_board))
    //console.log(_roundTiles)
    let sortedRoundTiles = _roundTiles.sort((a, b) => a.row - b.row)
    //console.log(sortedRoundTiles)
    sortedRoundTiles.forEach(tile => {
      //console.log(tile)
      tempBoard[tile.row][tile.column] = !tempBoard[tile.row][tile.column]
      countPoints(tempBoard, tile.row, tile.column)
    })
  }

  const countPoints = (_board, _row, _column) => {
    let tilePoints = 0

    if (!_board[_row][_column]) {
      console.log('Tile not placed')
      return 0
    }

    if (!checkBoundaries(_row, _column)) {
      console.log('Out of boundaries')
      return 0
    }

    let rowPoints =
      checkConections(_board, _row, _column, 0, 1) +
      checkConections(_board, _row, _column, 0, -1)
    let columnPoints =
      checkConections(_board, _row, _column, -1, 0) +
      checkConections(_board, _row, _column, 1, 0)

    console.log('rowPoints: ' + rowPoints)
    console.log('columnPoints: ' + columnPoints)
    if (rowPoints && columnPoints) {
      console.log('Connections in both directions')
      tilePoints += 2
    } else {
      console.log('Connection in one or no direction')
      tilePoints += 1
    }

    tilePoints += rowPoints + columnPoints
    console.log('Calculation result: ' + tilePoints)
    //setPoints(0)
    setPoints(prevPoints => prevPoints + tilePoints)
  }

  const checkConections = (_board, _row, _column, _incrRow, _incrColumn) => {
    let target_row = _row + _incrRow
    let target_column = _column + _incrColumn

    if (!checkBoundaries(target_row, target_column)) {
      return 0
    }

    if (_board[target_row][target_column]) {
      return (
        checkConections(
          _board,
          target_row,
          target_column,
          _incrRow,
          _incrColumn
        ) + 1
      )
    } else {
      return 0
    }
  }

  return (
    <div className="App">
      <GlobalStyle />
      <div className="column left-column">
        <h1>Azul Score Tracker</h1>
        <p>Points this round: XX</p>
        <p>Total points: {points}</p>
        <div>
          <button>First round</button>
          <button>Add round</button>
        </div>
      </div>
      <div className="column right-column">
        <Board
          board={board}
          setBoard={setBoard}
          currentRound={currentRound}
          countPoints={countPoints}
          roundTiles={roundTiles}
          setRoundTiles={setRoundTiles}
          recalculatePoints={recalculatePoints}
          setPoints={setPoints}
        />
      </div>
    </div>
  )
}

export default App

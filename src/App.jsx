import Board from './components/Board/Board'
import FloorRow from './components/FloorRow/FloorRow'
import './styles/reset.scss'
import {useEffect, useState} from 'react'
import GlobalStyle from './styles/GlobalStyle'

function App() {
  let emptyBoard = []

  for (let i = 0; i < 5; i++) {
    emptyBoard.push([0, 0, 0, 0, 0])
  }

  const [board, setBoard] = useState(emptyBoard)
  const [roundBoard, setRoundBoard] = useState(emptyBoard)
  const [currentRound, setCurrentRound] = useState(1)
  const [roundTiles, setRoundTiles] = useState([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [roundPoints, setRoundPoints] = useState(0)
  const [gameEnd, setGameEnd] = useState(false)
  const [fullRows, setFullRows] = useState(0)
  const [fullColumns, setFullColumns] = useState(0)
  const [fullColours, setFullColours] = useState(0)
  const [minusPoints, setMinusPoints] = useState(0)
  const [activeMinusTiles, setActiveMinusTiles] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ])

  useEffect(() => {
    if (!gameEnd) {
      recalculatePoints(roundBoard, roundTiles)
    }
  }, [roundTiles])

  useEffect(() => {
    if (gameEnd) {
      setTotalPoints(
        _prevTotalPoints =>
          _prevTotalPoints + fullRows * 2 + fullColumns * 7 + fullColours * 10
      )
    }
  }, [gameEnd])

  useEffect(() => {
    let pointSum = 0
    let indexOfLastTrue = activeMinusTiles.lastIndexOf(true)
    let minusPointArray = [-1, -1, -2, -2, -2, -3, -3]

    if (indexOfLastTrue !== -1) {
      for (let i = 0; i <= indexOfLastTrue; i++) {
        pointSum += minusPointArray[i]
      }
    }

    setMinusPoints(pointSum)
  }, [activeMinusTiles])

  const checkBoundaries = (_row, _column) => {
    if (_row > 4 || _row < 0 || _column > 4 || _column < 0) {
      return false
    } else {
      return true
    }
  }

  const recalculatePoints = (_board, _roundTiles) => {
    setRoundPoints(0)
    let tempBoard = JSON.parse(JSON.stringify(_board))
    //console.log(_roundTiles)
    let sortedRoundTiles = _roundTiles.sort((a, b) => a.row - b.row)
    //console.log(sortedRoundTiles)
    sortedRoundTiles.forEach(tile => {
      //console.log(tile)
      tempBoard[tile.row][tile.column] = 1
      countPoints(tempBoard, tile.row, tile.column)
    })
  }

  const countPoints = (_board, _row, _column) => {
    let tilePoints = 0

    if (!_board[_row][_column]) {
      return 0
    }

    if (!checkBoundaries(_row, _column)) {
      return 0
    }

    let rowPoints =
      checkConections(_board, _row, _column, 0, 1) +
      checkConections(_board, _row, _column, 0, -1)
    let columnPoints =
      checkConections(_board, _row, _column, -1, 0) +
      checkConections(_board, _row, _column, 1, 0)

    //console.log('rowPoints: ' + rowPoints)
    //console.log('columnPoints: ' + columnPoints)

    if (rowPoints && columnPoints) {
      tilePoints += 2
    } else {
      tilePoints += 1
    }

    tilePoints += rowPoints + columnPoints
    setRoundPoints(_prevPoints => _prevPoints + tilePoints)
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

  const lockBoard = _roundNumber => {
    let lockedBoard = board.map(_currentRow => {
      return _currentRow.map(_currentColumn => {
        if (_currentColumn === 1) {
          //console.log(_currentColumn)
          return (_currentColumn = _roundNumber + 1)
        } else {
          return _currentColumn
        }
      })
    })

    setBoard(lockedBoard)
  }

  const incrementRound = () => {
    lockBoard(currentRound)
    setCurrentRound(_prevRound => _prevRound + 1)
    setRoundBoard(board)
    setRoundTiles([])
    setTotalPoints(_prevTotalPoints => {
      let finalPoints = _prevTotalPoints + roundPoints + minusPoints
      if (finalPoints < 0) {
        return 0
      }
      return finalPoints
    })
    setActiveMinusTiles(activeMinusTiles.map(tile => (tile = false)))
    setMinusPoints(0)
    setRoundPoints(0)
  }

  const checkForFullRow = _row => {
    setFullRows(_prevFullRows =>
      board[_row].find(_tile => _tile === 0) === undefined
        ? _prevFullRows + 1
        : _prevFullRows
    )
  }

  const checkForFullColumn = _column => {
    for (let i = 0; i < 5; i++) {
      if (board[i][_column] === 0) {
        return
      }
    }

    setFullColumns(_prevFullColumns => _prevFullColumns + 1)
  }

  const checkForFullColour = _tiles => {
    for (let i = 0; i < 5; i++) {
      if (board[i][_tiles[i]] === 0) {
        return
      }
    }

    setFullColours(_prevFullColours => _prevFullColours + 1)
  }

  const endGame = () => {
    setGameEnd(true)
    lockBoard(currentRound)

    for (let i = 0; i < 5; i++) {
      checkForFullRow(i)
      checkForFullColumn(i)
    }

    let blackTiles = [3, 4, 0, 1, 2]
    let blueTiles = [0, 1, 2, 3, 4]
    let redTiles = [2, 3, 4, 0, 1]
    let turquoiseTiles = [4, 0, 1, 2, 3]
    let yellowTiles = [1, 2, 3, 4, 0]

    checkForFullColour(blackTiles)
    checkForFullColour(blueTiles)
    checkForFullColour(redTiles)
    checkForFullColour(turquoiseTiles)
    checkForFullColour(yellowTiles)

    setTotalPoints(_prevTotalPoints => {
      if (_prevTotalPoints + roundPoints + minusPoints < 0) {
        return 0
      }

      return _prevTotalPoints + roundPoints + minusPoints
    })

    setTotalPoints(_prevTotalPoints => {
      let finalPoints =
        _prevTotalPoints +
        roundPoints +
        fullRows +
        fullColumns +
        fullColours +
        minusPoints

      if (finalPoints < 0) {
        return 0
      }

      return finalPoints
    })

    setMinusPoints(0)
    setRoundPoints(0)
  }

  return (
    <div className="App">
      <GlobalStyle />
      <div className="column left-column">
        <section>
          <h1>Azul Score Tracker</h1>
          <p>
            Round points:{' '}
            {roundPoints + minusPoints < 0 ? 0 : roundPoints + minusPoints}
          </p>
          <p>Total points: {totalPoints}</p>
          <div>
            <p>Current round: {currentRound}</p>
            <button onClick={incrementRound}>Add round</button>
            <button onClick={endGame}>Finish last round</button>
            <p>
              Row bonus: {fullRows} full rows, {fullRows * 2} extra points
            </p>
            <p>
              Column bonus: {fullColumns} full columns, {fullColumns * 7} extra
              points
            </p>
            <p>
              Colour bonus: {fullColours} full colours, {fullColours * 10} extra
              points
            </p>
          </div>
        </section>
        <FloorRow
          gameEnd={gameEnd}
          activeMinusTiles={activeMinusTiles}
          setActiveMinusTiles={setActiveMinusTiles}
        />
      </div>
      <div className="column right-column">
        <Board
          board={board}
          setBoard={setBoard}
          roundTiles={roundTiles}
          setRoundTiles={setRoundTiles}
          gameEnd={gameEnd}
        />
      </div>
    </div>
  )
}

export default App

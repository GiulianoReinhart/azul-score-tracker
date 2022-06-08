import Stats from './components/Stats/Stats'
import Board from './components/Board/Board'
import Tile from './components/Tile/Tile'
import FloorRow from './components/FloorRow/FloorRow'
import './styles/reset.scss'
import {useEffect, useState} from 'react'
import GlobalStyle from './styles/GlobalStyle'
import backgroundImage from './images/background.svg'
import {motion} from 'framer-motion'
import UpdateModal from './components/UpdateModal/UpdateModal'
import {useCookies} from 'react-cookie'
import {ThemeProvider} from 'styled-components'
import {theme} from './styles/theme'
import {ReactComponent as SvgLogo} from './images/logo.svg'
import CacheBuster from 'react-cache-buster'

function App() {
  let appVersion = '1.3'
  let emptyBoard = []

  for (let i = 0; i < 5; i++) {
    emptyBoard.push([0, 0, 0, 0, 0])
  }

  const changeTheme = () => {
    if (themeColour === 4) {
      setThemeColour(0)
    } else {
      setThemeColour(prevThemeColour => prevThemeColour + 1)
    }
  }

  const [themeColour, setThemeColour] = useState(0)
  const [cookies, setCookie] = useCookies(['app'])
  const [modal, setModal] = useState(false)
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
  const [resetWarning, setResetWarning] = useState(false)

  useEffect(() => {
    let currentGame = {
      themeColour: themeColour,
      board: board,
      roundBoard: roundBoard,
      currentRound: currentRound,
      roundTiles: roundTiles,
      totalPoints: totalPoints,
      roundPoints: roundPoints,
      gameEnd: gameEnd,
      fullRows: fullRows,
      fullColours: fullColours,
      minusPoints: minusPoints,
      activeMinusTiles: activeMinusTiles
    }

    setCookie('currentGame', JSON.stringify(currentGame), {path: '/'})
  }, [
    themeColour,
    board,
    roundBoard,
    currentRound,
    roundTiles,
    totalPoints,
    roundPoints,
    gameEnd,
    fullRows,
    fullColours,
    minusPoints,
    activeMinusTiles
  ])

  useEffect(() => {
    if (resetWarning) {
      const timer = setTimeout(() => {
        setResetWarning(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [resetWarning])

  const resetGame = () => {
    if (resetWarning) {
      setResetWarning(false)
      setBoard(emptyBoard)
      setRoundBoard(emptyBoard)
      setCurrentRound(1)
      setRoundTiles([])
      setTotalPoints(0)
      setRoundPoints(0)
      setGameEnd(false)
      setFullRows(0)
      setFullColours(0)
      setMinusPoints(0)
      setActiveMinusTiles([false, false, false, false, false, false, false])
    } else {
      setResetWarning(true)
    }
  }

  useEffect(() => {
    setRoundTiles(() => {
      let newRoundTiles = board.flatMap((_row, _index) => {
        let rowCount = _index
        return _row.flatMap((_tile, _index) => {
          let columnCount = _index
          if (_tile === 1) {
            return [{row: rowCount, column: columnCount}]
          } else {
            return []
          }
        })
      })

      return newRoundTiles
    })
  }, [board])

  useEffect(() => {
    if (!cookies['version'] || cookies['version'] !== appVersion) {
      setModal(true)
    }

    if (cookies['currentGame']) {
      let previousGame = cookies['currentGame']

      'themeColour' in previousGame && setThemeColour(previousGame.themeColour)
      setBoard(previousGame.board)
      setRoundBoard(previousGame.roundBoard)
      setCurrentRound(previousGame.currentRound)
      setRoundTiles(previousGame.roundTiles)
      setTotalPoints(previousGame.totalPoints)
      setRoundPoints(previousGame.roundPoints)
      setGameEnd(previousGame.gameEnd)
      setFullRows(previousGame.fullRows)
      setFullColours(previousGame.fullColours)
      setMinusPoints(previousGame.MinusPoints)
      setActiveMinusTiles(previousGame.activeMinusTiles)
    }
  }, [])

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
    <CacheBuster
      currentVersion={appVersion}
      isEnabled={true}
      isVerboseMode={false}
    >
      <ThemeProvider theme={theme[themeColour]}>
        <div className="App">
          <GlobalStyle />
          {modal && (
            <UpdateModal
              version={appVersion}
              setCookie={setCookie}
              modal={modal}
              setModal={setModal}
            />
          )}
          <motion.img
            className="bg-image"
            src={backgroundImage}
            alt=""
            initial={{opacity: 0}}
            animate={{opacity: 0.1}}
            transition={{delay: 0.2}}
          ></motion.img>
          <motion.div
            className="column left-column"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.4}}
          >
            <SvgLogo onClick={changeTheme} className="logo" />
            <Stats
              roundPoints={roundPoints}
              minusPoints={minusPoints}
              totalPoints={totalPoints}
              currentRound={currentRound}
              incrementRound={incrementRound}
              endGame={endGame}
              gameEnd={gameEnd}
              fullRows={fullRows}
              fullColumns={fullColumns}
              fullColours={fullColours}
              resetGame={resetGame}
              resetWarning={resetWarning}
            />
            <FloorRow
              gameEnd={gameEnd}
              activeMinusTiles={activeMinusTiles}
              setActiveMinusTiles={setActiveMinusTiles}
            />
          </motion.div>
          <motion.div
            className="column right-column"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.6}}
          >
            <Board gameEnd={gameEnd}>
              {board.map((_row, _index) => {
                let rowCount = _index

                return _row.map((_column, _index) => {
                  let columnCount = _index

                  return (
                    <Tile
                      key={_index}
                      placed={board[rowCount][columnCount]}
                      row={rowCount}
                      column={columnCount}
                      board={board}
                      setBoard={setBoard}
                      roundTiles={roundTiles}
                      setRoundTiles={setRoundTiles}
                    />
                  )
                })
              })}
            </Board>
          </motion.div>
          <footer>
            <a
              href="https://twitter.com/messages/compose?recipient_id=1405559022611320835"
              target="_blank"
              rel="noreferrer"
            >
              Report bug
            </a>
            <small onClick={() => setModal(true)}>v{appVersion}</small>
          </footer>
        </div>
      </ThemeProvider>
    </CacheBuster>
  )
}

export default App

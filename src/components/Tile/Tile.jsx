import {StyledTile} from './Tile.styled'
import tileBlack from '../../images/tile-black.svg'
import tileBlue from '../../images/tile-blue.svg'
import tileRed from '../../images/tile-red.svg'
import tileTurquoise from '../../images/tile-turquoise.svg'
import tileYellow from '../../images/tile-yellow.svg'
import {useState, useEffect} from 'react'

const Tile = props => {
  let tilePosition = props.row * 5 + props.column
  let imgSrc

  useEffect(() => {
    props.setRoundTiles(() => {
      if (props.placed === 0) {
        return props.roundTiles.filter((_currentTile, _index) => {
          return (
            _currentTile.row !== props.row ||
            _currentTile.column !== props.column
          )
        })
      } else if (props.placed === 1) {
        return [...props.roundTiles, {row: props.row, column: props.column}]
      } else {
        return [...props.roundTiles]
      }
    })
  }, [props.placed])

  useEffect(() => {}, [props.board])

  switch (tilePosition) {
    case 3:
    case 9:
    case 10:
    case 16:
    case 22:
      imgSrc = tileBlack
      break
    //   return <img src={tileBlack} alt="black" />
    case 0:
    case 6:
    case 12:
    case 18:
    case 24:
      imgSrc = tileBlue
      break
    //   return <img src={tileBlue} alt="black" />
    case 2:
    case 8:
    case 14:
    case 15:
    case 21:
      imgSrc = tileRed
      break
    //   return <img src={tileRed} alt="black" />
    case 4:
    case 5:
    case 11:
    case 17:
    case 23:
      imgSrc = tileTurquoise
      break
    //   return <img src={tileTurquoise} alt="black" />
    default:
      imgSrc = tileYellow
    //   return <img src={tileYellow} alt="blue" />
  }

  const handleClick = (_row, _column) => {
    if (props.board[_row][_column] > 1) {
      return 0
    } else {
      let updatedBoard = props.board.map((_currentRow, _index) => {
        if (_index === _row) {
          //console.log('Row index:' + _index)
          return _currentRow.map((_currentColumn, _index) => {
            if (_index === _column) {
              //console.log(_currentColumn)
              return _currentColumn === 0 ? 1 : 0
            } else {
              return _currentColumn > 1 ? _currentColumn : 0
            }
          })
        } else {
          return _currentRow
        }
      })

      props.setBoard(updatedBoard)
    }
  }

  return (
    <StyledTile
      currentRound={props.board[props.row][props.column] - 1}
      placed={props.placed}
      onClick={() => handleClick(props.row, props.column)}
    >
      <img title={props.placed} src={imgSrc} alt="" draggable="false" />
    </StyledTile>
  )
}

export default Tile

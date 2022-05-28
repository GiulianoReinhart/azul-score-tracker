import {StyledBoard} from './Board.styled'
import Tile from '../Tile/Tile'

const Board = props => {
  return (
    <StyledBoard>
      {props.board.map((_row, _index) => {
        let rowCount = _index

        return _row.map((_column, _index) => {
          let columnCount = _index

          return (
            <Tile
              key={_index}
              placed={props.board[rowCount][columnCount]}
              row={rowCount}
              column={columnCount}
              board={props.board}
              setBoard={props.setBoard}
              currentRound={props.currentRound}
              countPoints={props.countPoints}
              roundTiles={props.roundTiles}
              setRoundTiles={props.setRoundTiles}
              recalculatePoints={props.recalculatePoints}
              setPoints={props.setPoints}
            />
          )
        })
      })}
    </StyledBoard>
  )
}

export default Board

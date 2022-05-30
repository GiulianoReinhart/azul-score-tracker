import {StyledBoard} from './Board.styled'
import Tile from '../Tile/Tile'

const Board = props => {
  return (
    <StyledBoard gameEnd={props.gameEnd}>
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
              roundTiles={props.roundTiles}
              setRoundTiles={props.setRoundTiles}
            />
          )
        })
      })}
    </StyledBoard>
  )
}

export default Board

import {StyledBoard} from './Board.styled'

const Board = props => {
  return <StyledBoard gameEnd={props.gameEnd}>{props.children}</StyledBoard>
}

export default Board

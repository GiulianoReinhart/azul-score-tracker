import styled from 'styled-components'

export const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 560px;
  gap: 10px;
  user-select: none;
  pointer-events: ${props => (props.gameEnd ? 'none' : 'auto')};
  padding: 10px;
  //box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`

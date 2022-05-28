import styled from 'styled-components'

export const StyledTile = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  opacity: ${props => (props.placed ? 1 : 0.3)};
  transition: all 0.1s ease-out;
  cursor: pointer;
  transform: scale(${props => (props.placed ? 1.05 : 1)});

  :hover {
    transform: scale(1.05);
  }
`

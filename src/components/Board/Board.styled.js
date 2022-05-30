import styled from 'styled-components'

export const StyledBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  height: 100%;
  user-select: none;
  pointer-events: ${props => (props.gameEnd ? 'none' : 'auto')};
  //box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  background: #d9f8ff;
  padding: 10px;
  border-radius: 10px;

  @media (orientation: portrait) and (max-width: 1024px) {
    width: calc(100vw - 40px);
    height: calc(100vw - 40px);
  }
`

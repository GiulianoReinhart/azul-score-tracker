import styled from 'styled-components'

export const StyledBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
  height: auto;
  pointer-events: ${props => (props.$gameEnd ? 'none' : 'auto')};
  background: ${props => props.theme.light};
  padding: 1rem;
  border-radius: 1rem;

  @media (orientation: portrait) {
    width: calc(100vw - 6rem);
    height: calc(100vw - 6rem);
  }
`

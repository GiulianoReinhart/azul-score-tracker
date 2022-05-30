import styled from 'styled-components'
import overlayImg from '../../images/tile-overlay-dark.svg'

export const StyledFloorRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    font-weight: 700;
  }

  .floor-row-wrapper {
    display: flex;
    gap: 2rem;
    pointer-events: ${props => (props.gameEnd ? 'none' : 'auto')};

    @media (max-width: 1023px) {
      justify-content: center;
    }
  }
`

export const StyledFloorTile = styled.div`
  flex: 0 1 6rem;
  width: 6rem;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d9f8ff;
  background-image: url(${overlayImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: ${props => (props.active ? '100%' : '250%')};
  border-radius: 1rem;
  transition: all 0.1s ease-out;
  cursor: pointer;
  font-family: 'Noto Sans', sans-serif;
  color: #1c2426;
  font-weight: 700;
  //opacity: 0.3;

  :hover {
    transform: scale(1.05);
  }
`

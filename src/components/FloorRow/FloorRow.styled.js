import styled from 'styled-components'
import overlayImg from '../../images/tile-overlay-dark.svg'

export const StyledFloorRow = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  user-select: none;
  pointer-events: ${props => (props.gameEnd ? 'none' : 'auto')};
`

export const StyledFloorTile = styled.div`
  flex: 0 1 60px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  //border: 5px solid #d9f8ff;
  background-color: #d9f8ff;
  background-image: url(${overlayImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: ${props => (props.active ? '100%' : '250%')};
  border-radius: 5px;
  transition: all 0.1s ease-out;
  cursor: pointer;
  font-family: 'Noto Sans', sans-serif;
  color: #1c2426;
  font-size: 20px;
  font-weight: 700;
  //opacity: 0.3;

  :hover {
    transform: scale(1.05);
  }
`

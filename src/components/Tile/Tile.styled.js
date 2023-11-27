import styled from 'styled-components'
import overlayImg from '../../images/tile-overlay-light.svg'

export const StyledTile = styled.div`
  position: relative;
  opacity: ${props => (props.$placed > 0 ? 1 : 0.3)};
  transition: all 0.1s ease-out;
  cursor: pointer;
  flex: 0 1 calc(100% / 5 - 4rem / 5);
  aspect-ratio: 1;
  border-radius: 0.5rem;
  overflow: hidden;
  vertical-align: top;
  font-size: 4rem;
  font-weight: 700;
  color: #fff;

  img {
    transition: padding 0.21s ease-out;
  }

  :hover {
    transform: scale(${props => (props.$placed > 1 ? 1 : 1.05)});
  }

  :after {
    content: ${props => `'${props.$currentRound}'`};
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    background-image: url(${overlayImg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: ${props => (props.$placed > 1 ? '100%' : '250%')};
    backdrop-filter: blur(0.5rem);
    opacity: ${props => (props.$placed > 1 ? '1' : '0')};
    transition: all 0.2s ease-out;
  }

  @media (max-width: 1023px) {
    font-size: 2rem;
  }
`

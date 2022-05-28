import styled from 'styled-components'
import lockImg from '../../images/lock.svg'

export const StyledTile = styled.div`
  position: relative;
  opacity: ${props => (props.placed > 0 ? 1 : 0.3)};
  transition: all 0.2s ease-out;
  //transform: scale(${props => (props.placed === 1 ? 1.05 : 1)});
  cursor: pointer;
  width: 100px;
  height: 100px;
  border-radius: 5px;
  overflow: hidden;
  vertical-align: top;

  img {
    //padding: ${props => (props.placed > 1 ? '4px' : '')};
    transition: padding 0.21s ease-out;
  }

  :hover {
    transform: scale(1.05);
  }

  :after {
    content: ${props => `'Round ${props.currentRound}'`};
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 20px;
    font-size: 16px;
    color: #fff;
    font-family: 'Noto Sans', sans-serif;
    background-color: rgba(0, 0, 0, 0.3);
    background-image: url(${lockImg});
    background-repeat: no-repeat;
    background-position: center 25px;
    background-size: 20px;
    backdrop-filter: blur(5px);
    opacity: ${props => (props.placed > 1 ? '1' : '0')};
    transition: opacity 0.2s ease-out;
  }

  /* :after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 5px;
    box-shadow: inset 0 0 0 5px #a9a29b;
    opacity: ${props => (props.placed > 1 ? '1' : '0')};
    transition: opacity 0.2s ease-out;
  }

  :before {
    content: ${props => `'${props.currentRound}'`};
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.2em 0.4em;
    background-color: #a9a29b;
    color: #1c2426;
    border-radius: 0 0 5px 0;
    font-size: 20px;
    z-index: 4;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${props => (props.placed > 1 ? '1' : '0')};
    transition: opacity 0.2s ease-out;
  } */
`

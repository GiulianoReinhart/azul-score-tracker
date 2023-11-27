import styled from 'styled-components'

export const StyledUpdateModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(1rem);
  z-index: 100;
  color: #1c2426;

  svg {
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
    transition: transform 0.1s ease-out;

    &:hover {
      transform: scale(0.8);
    }
  }

  .modal-wrapper {
    position: absolute;
    max-width: 80rem;
    width: calc(100% - 8rem);
    max-height: calc(100vh - 11rem);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${props => props.theme.light};
    padding: 4rem;
    overflow: auto;
    border-radius: 1rem;

    h2:not(:first-child) {
      margin-top: 2em;
    }

    @media (max-width: 767px) {
      width: calc(100% - 4rem);
    }

    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.15);
      border-radius: 5px;
    }
  }
`

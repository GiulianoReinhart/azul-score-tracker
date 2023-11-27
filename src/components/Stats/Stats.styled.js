import styled from 'styled-components'

export const StyledStats = styled.section`
  width: 100%;
  max-width: 540px;

  > div {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 2rem;

    &.wide-grid {
      grid-template-columns: 1fr 1fr 1fr;

      > * {
        grid-column: span 1;

        &.double-size {
          grid-column: span 2;
        }
      }
    }

    > * {
      border-radius: 1rem;
      padding: 2rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 6rem;
      grid-column: span 4;

      &.double-size {
        grid-column: span 8;
      }

      @media (max-width: 1023px) {
        padding: 1rem;
      }
    }

    > div {
      border: 0.5rem solid ${props => props.theme.light};
      gap: 1rem;
      justify-content: space-between;
    }

    > button {
      background-color: ${props => props.theme.light};
      color: #1c2426;
      justify-content: center;
      transition: all 0.1s ease-out;
      grid-column: span 3;

      @keyframes shake {
        0% {
          transform: translate(1px, 1px) rotate(0deg);
        }
        10% {
          transform: translate(-1px, -2px) rotate(-1deg);
        }
        20% {
          transform: translate(-3px, 0px) rotate(1deg);
        }
        30% {
          transform: translate(3px, 2px) rotate(0deg);
        }
        40% {
          transform: translate(1px, -1px) rotate(1deg);
        }
        50% {
          transform: translate(-1px, 2px) rotate(-1deg);
        }
        60% {
          transform: translate(-3px, 1px) rotate(0deg);
        }
        70% {
          transform: translate(3px, 1px) rotate(-1deg);
        }
        80% {
          transform: translate(-1px, -1px) rotate(1deg);
        }
        90% {
          transform: translate(1px, 2px) rotate(0deg);
        }
        100% {
          transform: translate(1px, -2px) rotate(-1deg);
        }
      }

      &.reset-button,
      &.new-game-button {
        animation: ${props => (props.$resetWarning ? 'shake 0.5s' : 'none')};
        animation-iteration-count: infinite;
        grid-column: span 2;
      }

      &.back-to-game-button {
        grid-column: span 1;
      }

      :hover {
        transform: scale(1.05);
      }
    }

    p,
    strong,
    button {
      text-align: center;
      font-weight: 700;
    }

    p,
    button {
      line-height: 1.2;
    }
  }
`

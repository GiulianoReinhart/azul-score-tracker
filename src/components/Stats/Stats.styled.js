import styled from 'styled-components'

export const StyledStats = styled.section`
  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    &.wide-grid {
      grid-template-columns: 1fr 1fr 1fr;
    }

    > * {
      border-radius: 1rem;
      padding: 2rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 6rem;

      &.double-size {
        grid-column: span 2;
      }

      @media (max-width: 1023px) {
        padding: 1rem;
      }
    }

    > div {
      border: 0.5rem solid #d9f8ff;
      gap: 1rem;
      justify-content: space-between;
    }

    > button {
      background-color: #d9f8ff;
      color: #1c2426;
      justify-content: center;
      transition: all 0.1s ease-out;

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

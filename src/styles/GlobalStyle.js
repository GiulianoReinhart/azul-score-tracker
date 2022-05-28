import {createGlobalStyle, css} from 'styled-components'

export default createGlobalStyle`${css`
  html {
    font-family: 'Noto Serif', serif;
    font-size: 10px;

    @media (max-width: 511px) {
      font-size: 8px;
    }

    body {
      background-color: #dfd3bc;
      color: #d9f8ff;

      .App {
        min-height: 100vh;
        display: flex;
        align-items: center;

        .column {
          height: 100vh;
        }

        .left-column {
          flex: 1 0 auto;
          background-color: #1c2426;
        }

        .right-column {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 0 0 100vh;
          background-color: #d9f8ff;
        }

        @media (max-width: 1024px) {
          flex-wrap: wrap;

          .left-column,
          .right-column {
            flex: 0 0 100%;
          }
        }
      }

      p,
      span,
      strong,
      ul,
      li,
      button {
        font-size: 16px;
        line-height: 1.5;
      }

      button {
        line-height: 1;
      }

      h1,
      h2 {
        line-height: 1.2;
        font-weight: 700;
      }

      a {
        color: #007ecc;
      }

      h1 {
        font-size: 4rem;
      }

      h2 {
        font-size: 3rem;
      }

      strong {
        font-weight: 700;
      }
    }
  }
`}`

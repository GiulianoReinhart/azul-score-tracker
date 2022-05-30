import {createGlobalStyle, css} from 'styled-components'

export default createGlobalStyle`${css`
  html {
    font-family: 'Noto Sans', sans-serif;
    font-size: 10px;

    @media (max-width: 511px) {
      font-size: 8px;
    }

    body {
      background-color: #007ecc;
      color: #d9f8ff;

      .App {
        min-height: 100vh;
        display: flex;
        align-items: center;
        user-select: none;

        .bg-image {
          position: fixed;
          top: -60vw;
          left: -60vw;
          height: 120vw;
          width: 120vw;
          z-index: -10;
          opacity: 0.1;
          animation: spin 60s linear infinite;

          @keyframes spin {
            100% {
              transform: rotate(360deg);
            }
          }

          @media (max-width: 1023px) {
            top: -80vw;
            left: -80vw;
            height: 160vw;
            width: 160vw;
          }

          @media (orientation: portrait) {
            top: -90vh;
            left: -90vh;
            height: 180vh;
            width: 180vh;
          }
        }

        .logo {
          width: 20rem;
          max-width: 100%;
        }

        .column {
          height: 100vh;
          gap: 4rem;
          padding: 5rem;
        }

        .left-column {
          //flex: 1 0 auto;
          flex: 1 1 50vw;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
        }

        .right-column {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          flex-direction: column;
          //flex: 0 1 100vh;
          flex: 0 1 clamp(100vh, 50vw, 100vh);
        }

        @media (max-width: 1023px) {
          flex-direction: column;

          .column {
            width: 100%;
            height: unset;
            padding: 3rem;
            flex: unset;
          }

          .left-column,
          .right-column {
            align-items: center;
          }

          .right-column {
            padding-top: 1rem;
          }

          .left-column {
            padding-bottom: 1rem;
          }
        }

        @media (max-width: 540px) {
          .logo {
            margin: 0 auto;
          }

          .left-column {
            align-items: stretch;
          }
        }
      }

      div,
      p,
      span,
      ul,
      li,
      button {
        font-size: 18px;
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
        line-height: 1;
        font-size: 4rem;
        font-weight: 700;
      }

      @media (max-width: 1023px) {
        div,
        p,
        span,
        strong,
        ul,
        li,
        button {
          font-size: 16px;
        }

        strong {
          font-size: 3rem;
        }
      }
    }
  }
`}`

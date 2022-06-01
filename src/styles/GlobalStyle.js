import {createGlobalStyle, css} from 'styled-components'

export default createGlobalStyle`${css`
  html {
    font-family: 'Noto Sans', sans-serif;
    font-size: 10px;

    @media (max-width: 511px) {
      font-size: 8px;
    }

    body {
      background-color: ${props => props.theme.main};
      color: ${props => props.theme.light};
      transition: all 0.1s ease-out;

      .App {
        position: relative;
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
          animation: spin 200s linear infinite;

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
          vertical-align: top;
          transition: transform 0.1s ease-out;
          cursor: pointer;
          fill: ${props => props.theme.light};

          :hover {
            transform: scale(1.05);
          }
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

        footer {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          display: flex;
          gap: 2rem;

          a,
          small {
            font-size: 1.5rem;
            cursor: pointer;
            transition: transform 0.1s ease-out;

            :hover {
              transform: scale(1.05);
            }
          }
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

          footer {
            bottom: 0.4rem;
            right: 3rem;
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

      h1 {
        font-size: 4rem;
      }

      h2 {
        font-size: 3rem;
        margin-bottom: 2rem;
      }

      strong {
        line-height: 1;
        font-size: 4rem;
        font-weight: 700;
      }

      ul {
        list-style: disc;
        list-style: disc;
        padding-left: 1.2em;

        li:not(:last-of-type) {
          margin-bottom: 0.5em;
        }
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

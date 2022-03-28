import { useContext } from "react"
import { ThemeContext } from "styled-components"

const AppLogo = (props) => {
    const theme = useContext(ThemeContext)
    return (
        <svg
          viewBox="190.097 139.002 150.222 174.698"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              x1={261.312}
              y1={168.667}
              x2={261.312}
              y2={294.804}
              id="a"
              spreadMethod="pad"
            >
              <stop
                offset={0}
                style={{
                  stopColor: theme.accent,
                }}
              />
              <stop
                offset={1}
                style={{
                  stopColor: theme.secondaryAccent,
                }}
              />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              x1={248.827}
              y1={155.481}
              x2={248.827}
              y2={280.164}
              id="b"
              spreadMethod="pad"
            >
              <stop
                offset={0}
                style={{
                  stopColor: theme.accent,
                }}
              />
              <stop
                offset={1}
                style={{
                  stopColor: theme.secondaryAccent,
                }}
              />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              x1={265.208}
              y1={139.002}
              x2={265.208}
              y2={313.7}
              id="c"
              spreadMethod="pad"
            >
              <stop
                offset={0}
                style={{
                  stopColor: theme.accent,
                }}
              />
              <stop
                offset={1}
                style={{
                  stopColor: theme.secondaryAccent,
                }}
              />
            </linearGradient>
          </defs>
          <path
            style={{
              fill: "none",
              stroke: "url(#a)",
              strokeLinecap: "round",
              strokeMiterlimit: 1,
              strokeWidth: 8,
            }}
            d="m207.38 296.301 91.042-.051c20.599-.728 24.963-3.635 25.084-31.988l.207-94.562"
          />
          <path
            style={{
              fill: "none",
              stroke: "url(#b)",
              strokeLinecap: "round",
              strokeMiterlimit: 1,
              strokeWidth: 8,
            }}
            d="m190.436 279.861 94.86.303c21.155-.129 22.361.224 21.834-26.825l-.364-97.858"
          />
          <path
            style={{
              fill: "none",
              stroke: "url(#c)",
              strokeLinecap: "round",
              strokeMiterlimit: 1,
              strokeWidth: 8,
              fillRule: "nonzero",
            }}
            d="m190.461 139.214-.364 142.133 35.624 32.353 83.971-.364c13.679.991 29.202-6.148 29.808-25.082l.727-106.146c1.105-10.193-7.945-13.139-16.358-11.996 1.212-13.262-8.152-16.75-17.085-13.813 1.919-13.802-4.129-18.387-12.359-17.085H190.461Z"
          />
          <g>
            <path
              d="M403.914 0 54.044 349.871 0 512l162.128-54.044L512 108.086 403.914 0zM295.829 151.319l21.617 21.617-206.808 206.809-21.617-21.617 206.808-206.809zM71.532 455.932l-15.463-15.463 18.015-54.043 51.491 51.491-54.043 18.015zm82.339-32.953-21.617-21.617 206.809-206.809 21.617 21.617-206.809 206.809zm228.426-228.424-64.852-64.852 21.617-21.617 64.852 64.852-21.617 21.617zM360.679 86.468l43.234-43.235 64.853 64.853-43.235 43.234-64.852-64.852z"
              style={{
                fill: theme.accent,
              }}
              transform="matrix(.18124 0 0 .18648 199.12 161.893)"
            />
          </g>
        </svg>
      )
}

export default AppLogo

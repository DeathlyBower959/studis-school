import styled from 'styled-components'

const LeftCompetitorArrow = (props) => {
  return (
    <Arrow
      onClick={() => {
        const container = document.getElementById('competitor-inner')
        const children = container?.children

        if (!children) return

        for (var i = 0; i < children.length; i++) {
          let prevChild = children[i - 1]
          let child = children[i]

          let prevVisible = false
          let currentVisible = false

          if (!prevChild) continue

          const prevObserver = new IntersectionObserver(
            function (prevEntries) {
              prevVisible = prevEntries[0].isIntersecting

              const currentObserver = new IntersectionObserver(
                function (currentEntries) {
                  currentVisible = currentEntries[0].isIntersecting

                  currentObserver.unobserve(currentEntries[0].target)
                  if (!prevVisible && currentVisible) {
                    prevChild.scrollIntoView({
                      behavior: 'smooth',
                      block: 'nearest',
                      inline: 'nearest'
                    })

                    return
                  }
                },
                { threshold: [0.8] }
              )

              currentObserver.observe(child)
              prevObserver.unobserve(prevEntries[0].target)
            },
            { threshold: [0.8] }
          )

          if (prevChild) prevObserver.observe(prevChild)
        }
      }}
      width="21"
      height="46"
      viewBox="0 0 21 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M16 4.57898L6 22.6316L16 40.6842"
        strokeWidth="9"
        strokeLinecap="round"
      />
    </Arrow>
  )
}

const Arrow = styled.svg`
  height: 100%;
  width: 1em;

  path {
    stroke: ${(props) => props.theme.inputBackground};
  }

  transition: filter 300ms ease-out;
  cursor: pointer;

  &:hover {
    filter: brightness(1.2);
  }
`

export default LeftCompetitorArrow

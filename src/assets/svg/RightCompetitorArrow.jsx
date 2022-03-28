import styled from "styled-components"

const RightCompetitorArrow = (props) => {
    
  return (
    <Arrow
      width="21"
      height="46"
      viewBox="0 0 21 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => {
        const container = document.getElementById('competitor-inner')
        const children = container?.children

        if (!children) return

        for (var i = 0; i < children.length; i++) {
          let child = children[i]
          let nextChild = children[i + 1]

          let currentVisible = false
          let nextVisible = false

          if (!nextChild) continue

          const nextObserver = new IntersectionObserver(
            function (nextEntries) {
              nextVisible = nextEntries[0].isIntersecting

              const currentObserver = new IntersectionObserver(
                function (currentEntries) {
                  currentVisible = currentEntries[0].isIntersecting

                  if (!nextVisible && currentVisible) {
                    nextChild.scrollIntoView({
                      behavior: 'smooth',
                      block: 'nearest',
                      inline: 'nearest'
                    })
                  }

                  currentObserver.unobserve(currentEntries[0].target)
                },
                { threshold: [0.8] }
              )

              currentObserver.observe(child)
              nextObserver.unobserve(nextEntries[0].target)
            },
            { threshold: [0.8] }
          )

          if (nextChild) nextObserver.observe(nextChild)
        }
      }}
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

export default RightCompetitorArrow

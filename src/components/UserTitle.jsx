import styled from 'styled-components'
import { calculateTitle } from '../utils/ranking'


const UserTitle = ({exp, ...props}) => {
    return (
        <Title {...props}>{calculateTitle(exp)}</Title>
    )
}

export default UserTitle

const Title = styled.div`
  color: ${(props) => props.theme.secondaryForeground};
  background-color: ${props => props.theme.inputBackground};
  border-radius: 15px;
  margin: 0;
  padding: 0.25em 0.75em;
  font-size: 0.9em;

  display: flex;
  justify-content: center;
  align-items: center;
`
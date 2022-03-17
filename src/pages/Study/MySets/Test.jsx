import styled from "styled-components";
import { useParams } from "react-router-dom";

const TestingSet = () => {
  const { setId } = useParams();

  return (
    <>
      <Header>Testing Sets | setId: {setId}</Header>
    </>
  );
};

const Header = styled.h1`
  color: red;
`

export default TestingSet

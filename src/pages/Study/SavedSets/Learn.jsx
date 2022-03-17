import styled from "styled-components";
import { useParams } from "react-router-dom";

const LearnSaved = () => {
  const { setId } = useParams();

  return (
    <>
      <Header>Learning Saved Flash Cards | setId: {setId}</Header>
    </>
  );
};

const Header = styled.h1`
  color: red;
`

export default LearnSaved

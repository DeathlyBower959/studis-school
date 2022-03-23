import styled from "styled-components";
import { useParams } from "react-router-dom";

const LearnSet = () => {
  const { setId } = useParams();

  return (
    <>
      <Header>Learning Sets Flash Cards | setId: {setId}</Header>
    </>
  );
};

const Header = styled.h1`
  color: red;
`

export default LearnSet

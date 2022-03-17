import styled from "styled-components";
import { useParams } from "react-router-dom";

const FlashSet = () => {
  const { setId } = useParams();

  return (
    <>
      <Header>Studying Set Flash Cards | setId: {setId}</Header>
    </>
  );
};

const Header = styled.h1`
  color: red;
`

export default FlashSet

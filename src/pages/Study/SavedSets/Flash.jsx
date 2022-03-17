import styled from "styled-components";
import { useParams } from "react-router-dom";

const FlashSaved = () => {
  const { setId } = useParams();

  return (
    <>
      <Header>Studying Saved Flash Cards | setId: {setId}</Header>
    </>
  );
};

const Header = styled.h1`
  color: red;
`

export default FlashSaved

import styled from "styled-components";
import { useParams } from "react-router-dom";

const ViewSet = () => {
  const { setId } = useParams();

  return (
    <>
      <Header>View Set | setId: {setId}</Header>
    </>
  );
};

const Header = styled.h1`
  color: red;
`

export default ViewSet

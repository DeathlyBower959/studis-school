import styled from "styled-components";
import { useParams } from "react-router-dom";

const ViewSaved = () => {
  const { setId } = useParams();

  return (
    <>
      <Header>View Saved Set | setId: {setId}</Header>
    </>
  );
};

const Header = styled.h1`
  color: red;
`

export default ViewSaved
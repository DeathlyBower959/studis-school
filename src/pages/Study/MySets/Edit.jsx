import styled from "styled-components";
import { useParams } from "react-router-dom";

const EditSets = () => {
  const { setId } = useParams();

  return (
    <>
      <Header>Editing Set | setId: {setId}</Header>
    </>
  );
};

const Header = styled.h1`
  color: red;
`

export default EditSets

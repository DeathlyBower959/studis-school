import styled from "styled-components";
import { useParams } from "react-router-dom";

const EditSaved = () => {
  const { setId } = useParams();

  return (
    <>
      <Header>Editing Saved Set | setId: {setId}</Header>
    </>
  );
};

const Header = styled.h1`
  color: red;
`

export default EditSaved

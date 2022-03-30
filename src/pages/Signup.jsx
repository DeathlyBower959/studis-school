import { useContext } from "react";
import styled from "styled-components";
import Account from "../contexts/AccountContext";
import { Link } from "react-router-dom";

import useForm from "../hooks/useForm";
import Form from "../components/Forms/Form";
import validate from "../validations/Signup";

import ToastNotif from "../contexts/ToastNotifContext";

// API
import { signup } from "../api/user";
import useProfilePicture from "../hooks/useProfilePicture";

const Signup = () => {
  const { AuthLogin } = useContext(Account);
  const SendToast = useContext(ToastNotif);

  const Signup = async () => {
    const createdAccount = await signup(
      values.name,
      values.email?.toLowerCase(),
      values.password
    );
    if (!createdAccount.status === 200)
      return SendToast("Failed to signup!", "error");
    AuthLogin(values.email?.toLowerCase(), values.password);
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    Signup,
    validate
  );

  return (
    <Wrapper>
      <InnerWrapper>
        <FormContainer onSubmit={handleSubmit} noValidate>
          <Header>Signup</Header>
          <TextInput
            name="name"
            onChange={handleChange}
            value={values.name || ""}
            placeholder="Name"
            required
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          <TextInput
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email || ""}
            placeholder="Email"
            required
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          <TextInput
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password || ""}
            placeholder="Password"
            required
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          <TextInput
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={values.confirmPassword || ""}
            placeholder="Confirm Password"
            required
          />
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
          )}
          <br />
          <SubmitButton onClick={handleSubmit}>Signup</SubmitButton>
        </FormContainer>

        <MutedText style={{ margin: "10px auto 0 auto" }} href="#">
          Already have an account?
        </MutedText>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <BoldLink style={{ marginBottom: "10px" }}>Log in</BoldLink>
        </Link>
      </InnerWrapper>
    </Wrapper>
  );
};

const SubmitButton = styled(Form.Button)`
  width: 100%;
`;

const MutedText = styled.p`
  font-size: 11px;
  color: ${(props) => props.theme.muted};
  font-weight: 500;
  text-decoration: none;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Header = styled.p`
  color: ${(props) => props.theme.secondaryForeground};
  font-size: 2.5em;
  margin: 0.5em;
`;

const InnerWrapper = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  max-width: 400px;

  padding: 1em 3em;
  background-color: ${(props) => props.theme.tertiaryBackground};
  border-radius: 20px;
`;

const TextInput = styled(Form.Text)`
  width: 100%;
  margin-bottom: 5px;
  margin-left: 0;
`;

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const BoldLink = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => props.theme.accent};
  cursor: pointer;
  margin: 0 4px;
  transition: filter 250ms ease-in-out;
`;

const ErrorMessage = styled.p`
  margin-left: 3px;
  margin-top: 3px;
  color: ${(props) => props.theme.error};
  font-size: 14px;
`;

export default Signup;

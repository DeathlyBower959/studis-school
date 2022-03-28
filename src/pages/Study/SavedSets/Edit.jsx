import styled, { ThemeContext } from 'styled-components'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Form from '../../../components/Forms/Form'
import { useContext, useEffect, useState } from 'react'
import { Trash2, PlusCircle } from 'react-feather'
import { v4 as uuidv4 } from 'uuid'
import useForm from '../../../hooks/useForm'
import { updateRemixedSet } from '../../../api/community'
import validate from '../../../validations/CreateSet'
import ToastNotif from '../../../contexts/ToastNotifContext'
import Account from '../../../contexts/AccountContext'
import { MOBILE } from '../../../constants/sizes'
import Spinner from '../../../atoms/Loaders/Spinner'

function Edit() {
  const { setId } = useParams()
  const { localAuth, userData, setUserData } = useContext(Account)

  const theme = useContext(ThemeContext)
  const SendToast = useContext(ToastNotif)

  const navigate = useNavigate()

  const [newTerm, setNewTerm] = useState({
    term: '',
    def: ''
  })

  const UpdateSet = () => {
    const UpdateSetPromise = new Promise(async (resolve, reject) => {
      const updateResult = await updateRemixedSet(localAuth, setId, values)


      if (!updateResult?.data?.newUser) reject(updateResult.data)

      setUserData(updateResult.data.newUser)
      navigate(-1)
      resolve(updateResult.data.newUser)
    })

    SendToast(
      {
        promise: UpdateSetPromise,
        pending: 'Updating set...',
        error: 'Failed to update set!',
        success: 'Successfully updated set!'
      },
      'promise'
    )
  }

  const {
    values,
    errors,
    setValues,
    setErrors,
    handleChange,
    handleSubmit
  } = useForm(
    UpdateSet,
    validate,
    {},
    {
      handleChange: (e) => {
        setErrors((prev) => {
          return { ...prev, [e.target.name]: null }
        })
        setValues((prev) => {
          return {
            ...prev,
            [e.target.name]:
              e.target.value === 'on' || e.target.value === 'off'
                ? e.target.checked
                : e.target.value
          }
        })
      }
    }
  )

  const handleTermChange = (e) => {
    setErrors((prev) => {
      return { ...prev, terms: null }
    })
    setNewTerm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const deleteTerm = (wrapperID) => {
    setValues((prev) => {
      return {
        ...prev,
        terms: prev.terms.filter(
          (term) => term.tempID || term._id !== wrapperID
        )
      }
    })
  }

  const dataIndex = userData?.savedSets?.findIndex((set) => set._id === setId)
  useEffect(() => {
    if (dataIndex >= 0) setValues(userData.savedSets[dataIndex])
  }, [dataIndex])

  if (!userData?.savedSets)
    return (
      <SpinnerWrapper>
        <Spinner height="3em" />
      </SpinnerWrapper>
    )

  if (dataIndex < 0)
    return (
      <>
        <Header>Not Found</Header>
        <Description>
          I tried to find this set, but it doesn't seem to exist in your
          account!
        </Description>
      </>
    )

  return (
    <>
      <Header>Update Set</Header>
      <FormContainer onSubmit={handleSubmit}>
        <Input
          placeholder="Set Name"
          name="title"
          value={values.title || ''}
          onChange={handleChange}
        />
        {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
        <Textarea
          placeholder="Description"
          name="description"
          value={values.description || ''}
          onChange={handleChange}
        />
        {errors.description && (
          <ErrorMessage>{errors.description}</ErrorMessage>
        )}
        <TermContainer>
          <TermWrapper>
            <TermContent>
              <TermTitle>Term</TermTitle>
              <TermInput
                name="term"
                value={newTerm.term || ''}
                onChange={handleTermChange}
              />
            </TermContent>
            <TermContent>
              <TermTitle>Definition</TermTitle>
              <TermTextarea
                name="def"
                value={newTerm.def || ''}
                onChange={handleTermChange}
              />
            </TermContent>
            <AddTerm
              onClick={() => {
                if (
                  !newTerm.term ||
                  !newTerm.def ||
                  newTerm.term.trim() === '' ||
                  newTerm.def.trim() === ''
                )
                  return

                setErrors((prev) => {
                  return { ...prev, term: null }
                })
                setValues((prev) => {
                  return {
                    ...prev,
                    terms: [
                      ...prev.terms,
                      {
                        tempID: uuidv4(),
                        term: newTerm.term,
                        def: newTerm.def
                      }
                    ]
                  }
                })
                setNewTerm({
                  term: '',
                  def: ''
                })
              }}
            />
          </TermWrapper>
          <Divider />
          {values.terms?.length > 0 &&
            values.terms.map((term) => {
              return (
                <TermWrapper key={term.tempID || term._id}>
                  <TermContent>
                    <TermTitle>Term</TermTitle>
                    <Term>{term.term}</Term>
                  </TermContent>
                  <TermContent>
                    <TermTitle>Definition</TermTitle>
                    <TermDef>{term.def}</TermDef>
                  </TermContent>
                  <DeleteTerm
                    onClick={() => {
                      deleteTerm(term._id)
                    }}
                  />
                </TermWrapper>
              )
            })}

          {values.terms?.length <= 0 && (
            <>
              {errors.terms ? (
                <DescMessage style={{ color: theme.error }}>
                  Don't forget to add some terms...
                </DescMessage>
              ) : (
                <DescMessage>Don't forget to add some terms...</DescMessage>
              )}
            </>
          )}
          {values.terms?.length <= 0 && <Divider />}
        </TermContainer>
        <ButtonContainer>
          <Link to="/study/saved">
            <SubmitButton type="button" secondary>
              Cancel
            </SubmitButton>
          </Link>
          <SubmitButton>Update</SubmitButton>
        </ButtonContainer>
      </FormContainer>
    </>
  )
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
`

const Description = styled.p`
  color: ${(props) => props.theme.secondaryForeground};
  text-align: center;
  width: 80%;
  margin: 0 auto;
`

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  overflow: hidden;
`

const Header = styled.p`
  color: ${(props) => props.theme.foreground};
  font-size: 3em;
  margin-bottom: 0.5em;

  width: 100%;
  text-align: center;
`

const DescMessage = styled.p`
  margin: 0;
  width: 100%;
  text-align: center;

  color: ${(props) => props.theme.secondaryMuted};
`

const Input = styled(Form.Text)`
  max-width: 400px;
`

const Textarea = styled(Form.Textarea)`
  max-width: 600px;
`

const Checkbox = styled(Form.Check)``

const FormContainer = styled.form`
  margin-top: 3em;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 1em;
`

const Divider = styled.hr`
  width: 80%;
  height: 2px;
  max-width: 1000px;
  border: none;
  background-color: ${(props) => props.theme.secondaryBackground};
`

const SubmitButton = styled(Form.Button)``

const TermContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  max-width: 500px;
  gap: 0.5em;

  @media only screen and (max-width: ${MOBILE.studyCreate}) {
    width: 80%;
  }
`

const TermWrapper = styled.div`
  background-color: ${(props) => props.theme.secondaryBackground};

  padding: 1em;
  border-radius: 15px;

  position: relative;
`

const TermContent = styled.div`
  margin-bottom: 1em;
`

const TermTitle = styled.p`
  margin: 0;
  color: ${(props) => props.theme.secondaryForeground};
`

const Term = styled.p`
  margin: 0;
  text-indent: 1em;
  color: ${(props) => props.theme.tertiaryForeground};
  overflow-wrap: break-word;
`

const TermDef = styled.p`
  margin: 0;
  text-indent: 1em;
  color: ${(props) => props.theme.tertiaryForeground};
  overflow-wrap: break-word;
`

const TermInput = styled(Input)`
  margin-top: 0.75em;
`

const TermTextarea = styled(Textarea)`
  margin-top: 0.75em;
  margin-left: 0.5em;
`

const DeleteTerm = styled(Trash2)`
  stroke: ${(props) => props.theme.error};
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.8em;

  cursor: pointer;
`

const AddTerm = styled(PlusCircle)`
  stroke: ${(props) => props.theme.accent};
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.8em;

  cursor: pointer;
`

const ErrorMessage = styled.p`
  margin: 0;
  color: ${(props) => props.theme.error};
  font-size: 14px;
`

export default Edit

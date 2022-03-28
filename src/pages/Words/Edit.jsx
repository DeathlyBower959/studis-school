import { useContext, useEffect } from 'react'
import Account from '../../contexts/AccountContext'
import ToastNotif from '../../contexts/ToastNotifContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { deleteSet, deleteWord, updateWord } from '../../api/user'
import useForm from '../../hooks/useForm'
import validate from '../../validations/CreateWord'
import enums from '../../constants/enums'
import Form from '../../components/Forms/Form'

import { v4 as uuidv4 } from 'uuid'

function EditWord() {
  const { wordId } = useParams()

  const { localAuth, userData, setUserData } = useContext(Account)
  const SendToast = useContext(ToastNotif)

  const navigate = useNavigate()

  const UpdateWord = () => {
    const UpdateSetPromise = new Promise(async (resolve, reject) => {
      const updateResult = await updateWord(localAuth, wordId, values)

      if (!updateResult?.data?.newUser) reject(updateResult.data)

      setUserData(updateResult.data.newUser)
      navigate(-1)
      resolve(updateResult.data.newUser)
    })

    SendToast(
      {
        promise: UpdateSetPromise,
        pending: 'Updating word...',
        error: 'Failed to update word!',
        success: 'Successfully updated word!'
      },
      'promise'
    )
  }

  const DeleteWord = () => {
    const DeleteWordPromise = new Promise(async (resolve, reject) => {
      const deleteResult = await deleteWord(localAuth, wordId)

      if (!deleteResult?.data?.newUser) reject(deleteResult.data)

      setUserData(deleteResult.data.newUser)
      navigate('/words')
      resolve(deleteResult.data.newUser)
    })

    SendToast(
      {
        promise: DeleteWordPromise,
        pending: 'Deleting word...',
        error: 'Failed to delete word!',
        success: 'Successfully deleted word!'
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
    UpdateWord,
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

  const dataIndex = userData?.savedWords?.findIndex(
    (word) => word._id === wordId
  )
  useEffect(() => {
    if (dataIndex >= 0) setValues(userData.savedWords[dataIndex])
  }, [dataIndex])

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
      <Header>Update Word</Header>
      <FormContainer onSubmit={handleSubmit}>
        <Input
          placeholder="Word"
          name="word"
          value={values.word || ''}
          onChange={handleChange}
        />
        {errors.word && <ErrorMessage>{errors.word}</ErrorMessage>}
        <Textarea
          placeholder="Definition"
          name="def"
          value={values.def || ''}
          onChange={handleChange}
        />
        {errors.def && <ErrorMessage>{errors.def}</ErrorMessage>}
        <TagSelect
          value={values.type || 'none'}
          name="type"
          onChange={handleChange}
          style={{ width: '50%' }}>
          <option value="none">Choose...</option>
          {Object.values(enums.WordType).map((x) => {
            return (
              <option value={x} key={uuidv4()}>
                {x.charAt(0).toUpperCase() + x.slice(1)}
              </option>
            )
          })}
        </TagSelect>
        {errors.type && <ErrorMessage>{errors.type}</ErrorMessage>}
        <Checkbox
          labelText="Public"
          name="isPublic"
          checked={values.isPublic}
          onChange={handleChange}
        />
        <ButtonContainer>
          <Link to="/words">
            <SubmitButton type="button" secondary>
              Cancel
            </SubmitButton>
          </Link>
          <SubmitButton>Update</SubmitButton>
          <SubmitButton onClick={DeleteWord} type="button" error>
            Delete
          </SubmitButton>
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
const SubmitButton = styled(Form.Button)``

const Header = styled.p`
  color: ${(props) => props.theme.foreground};
  font-size: 3em;
  margin-bottom: 0.5em;

  width: 100%;
  text-align: center;
`

const Description = styled.p`
  color: ${(props) => props.theme.secondaryForeground};
  text-align: center;
  width: 80%;
  margin: 0 auto;
`

const TagSelect = styled.select`
  padding: 0.475rem 2.25rem 0.475rem 0.55rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: ${(props) => props.theme.muted};
  background-color: ${(props) => props.theme.inputBackground};
  border-radius: 0.5rem;
  max-width: 400px;

  border-width: 0;
  outline: 0;
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

const CreateButton = styled(Form.Button)``

const ErrorMessage = styled.p`
  margin: 0;
  color: ${(props) => props.theme.error};
  font-size: 14px;
`

export default EditWord

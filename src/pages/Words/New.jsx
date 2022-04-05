import styled, { ThemeContext } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Form from '../../components/Forms/Form'
import { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import useForm from '../../hooks/useForm'
import { createWord } from '../../api/user'
import validate from '../../validations/CreateWord'
import ToastNotif from '../../contexts/ToastNotifContext'
import Account from '../../contexts/AccountContext'
import enums from '../../constants/enums'

function CreateWord() {
  const { localAuth, setUserData } = useContext(Account)

  const SendToast = useContext(ToastNotif)

  const navigate = useNavigate()

  const CreateNewWord = () => {
    const CreateWordPromise = new Promise(async (resolve, reject) => {
      const createResult = await createWord(localAuth, values)

      if (!createResult?.data?.newUser) reject(createResult.data)

      setUserData(createResult.data.newUser)
      navigate(-1)
      resolve(createResult.data.newUser)
    })

    SendToast(
      {
        promise: CreateWordPromise,
        pending: 'Creating word...',
        error: 'Failed to create word!',
        success: 'Successfully created word!'
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
    CreateNewWord,
    validate,
    {
      word: '',
      type: 'none',
      def: ''
    },
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

  return (
    <>
      <Header>Create a New Word</Header>
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
        <CreateButton>Create</CreateButton>
      </FormContainer>
    </>
  )
}

const Header = styled.p`
  color: ${(props) => props.theme.foreground};
  font-size: 3em;
  margin-bottom: 0.5em;

  width: 100%;
  text-align: center;
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

export default CreateWord

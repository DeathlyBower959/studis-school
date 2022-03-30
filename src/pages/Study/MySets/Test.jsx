import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Account from '../../../contexts/AccountContext'
import Form from '../../../components/Forms/Form'
import useForm from '../../../hooks/useForm'
import Spinner from '../../../atoms/Loaders/Spinner'

import { v4 as uuidv4 } from 'uuid'

const TestingSet = () => {
  const { setId } = useParams()

  const { userData, localAuth } = useContext(Account)

  const [testItems, setTestItems] = useState([])
  const [expNotification, setExpNotification] = useState(null)

  const dataIndex = userData?.userSets?.findIndex((set) => set._id === setId)

  const SubmitTest = () => {
    let incorrectAnswers = {}
    testItems.forEach((testItem, testIndex) => {
      if (testItem.type === 'choice') {
        const correctAnswerIndex = testItem.alternateDefs.findIndex(
          (def) => def === testItem.def
        )
        if (values[`q${testIndex + 1}`] !== `c${correctAnswerIndex + 1}`)
          incorrectAnswers[`q${testIndex + 1}`] = true
      } else {
        if (
          values[`q${testIndex + 1}`].trim().toLowerCase() !==
          testItem.term.trim().toLowerCase()
        )
          incorrectAnswers[`q${testIndex + 1}`] = true
      }
    })

    const score = Math.floor((testItems.length - Object.keys(incorrectAnswers).length) / testItems.length * 100)

    console.log(incorrectAnswers, score)
  }

  const {
    values,
    errors,
    setValues,
    setErrors,
    handleChange,
    handleSubmit
  } = useForm(
    SubmitTest,
    (v, isSubmit) => {
      let errors = {}

      testItems.forEach((testItem, testIndex) => {
        // if (testItem.type === 'choice') {
        //   if (values[`q${testIndex + 1}`] || isSubmit) {
        //     if (!values[`q${testIndex + 1}`])
        //       errors[`q${testIndex + 1}`] = 'Answer Required'
        //     else if (values[`q${testIndex + 1}`]?.toString().trim() === '')
        //       errors[`q${testIndex + 1}`] = 'Answer Required'
        //   }
        //   // const correctAnswerIndex = testItem.alternateDefs.findIndex(def => def === testItem.def)
        //   // if (values[`q${testIndex + 1}`] !== `c${correctAnswerIndex}`) errors[`q${testIndex + 1}`] = 'Incorrect'
        // } else {

        // }
        if (values[`q${testIndex + 1}`] || isSubmit) {
          if (!values[`q${testIndex + 1}`])
            errors[`q${testIndex + 1}`] = 'Answer Required'
          else if (values[`q${testIndex + 1}`]?.toString().trim() === '')
            errors[`q${testIndex + 1}`] = 'Answer Required'
        }
      })

      return errors
    },
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
              e.target.type === 'checkbox'
                ? e.target.checked
                  ? e.target.value
                  : ''
                : e.target.value
          }
        })
      }
    }
  )

  const data = userData.userSets[dataIndex]

  useEffect(() => {
    const shuffled = data.terms
      .sort(() => Math.random() - 0.5)
      .map((testItem) => {
        const responseType = Math.random() < 0.5 ? 'choice' : 'input'

        if (responseType === 'input')
          return {
            ...testItem,
            type: responseType
          }

        let alternateDefs = []

        let avaliable = [...data.terms].filter(
          (term) => term.term !== testItem.term
        )

        for (let i = 0; i < 4; i++) {
          let index = Math.floor(Math.random() * avaliable.length - 1) + 1
          alternateDefs[i] = avaliable[index]?.def
          avaliable.splice(index, 1)
        }

        for (let i = 0; i < 4; i++) {
          if (alternateDefs[i] === undefined) {
            alternateDefs[i] = testItem.def
            break
          }
        }

        return {
          ...testItem,
          type: responseType,
          alternateDefs: alternateDefs.sort(() => Math.random() - 0.5)
        }
      })

    if (dataIndex >= 0) setTestItems(shuffled)
    else setTestItems(null)
  }, [data, dataIndex])

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

  if (!testItems)
    return (
      <SpinnerWrapper>
        <Spinner height="50px" />
      </SpinnerWrapper>
    )

  return (
    <>
      <Header>{data.title}</Header>
      <TestWrapper>
        {testItems.map((testItem, testIndex) => {
          return (
            <React.Fragment key={testItem._id}>
              <Question $isTerm={testItem.type === 'choice'}>
                {testItem.type === 'input' ? testItem.def : testItem.term}
              </Question>
              {errors[`q${testIndex + 1}`] && (
                <ErrorMessage>{errors[`q${testIndex + 1}`]}</ErrorMessage>
              )}
              <OptionWrapper>
                {testItem.type === 'choice' && testItem.alternateDefs[0] && (
                  <OptionChoice
                    name={`q${testIndex + 1}`}
                    value="c1"
                    labelText={testItem.alternateDefs[0]}
                    onChange={handleChange}
                    checked={values[`q${testIndex + 1}`] === 'c1'}
                  />
                )}
                {testItem.type === 'choice' && testItem.alternateDefs[1] && (
                  <OptionChoice
                    name={`q${testIndex + 1}`}
                    value="c2"
                    labelText={testItem.alternateDefs[1]}
                    onChange={handleChange}
                    checked={values[`q${testIndex + 1}`] === 'c2'}
                  />
                )}
                {testItem.type === 'choice' && testItem.alternateDefs[2] && (
                  <OptionChoice
                    name={`q${testIndex + 1}`}
                    value="c3"
                    labelText={testItem.alternateDefs[2]}
                    onChange={handleChange}
                    checked={values[`q${testIndex + 1}`] === 'c3'}
                  />
                )}
                {testItem.type === 'choice' && testItem.alternateDefs[3] && (
                  <OptionChoice
                    name={`q${testIndex + 1}`}
                    value="c4"
                    labelText={testItem.alternateDefs[3]}
                    onChange={handleChange}
                    checked={values[`q${testIndex + 1}`] === 'c4'}
                  />
                )}

                {/* Input */}
                {testItem.type === 'input' && (
                  <OptionInput
                    name={`q${testIndex + 1}`}
                    onChange={handleChange}
                    value={values[`q${testIndex + 1}`]}
                  />
                )}
              </OptionWrapper>
              <HorizontalDivider />
            </React.Fragment>
          )
        })}
        <Form.Button onClick={handleSubmit}>Submit</Form.Button>
      </TestWrapper>
      <br/>
    </>
  )
}

const ErrorMessage = styled.p`
  color: ${(props) => props.theme.error};
  margin: -0.5em 0 1em;
`

const Header = styled.p`
  color: ${(props) => props.theme.foreground};
  font-size: 2em;
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

const TestWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 900px;
`

const Question = styled.p`
  color: ${(props) => props.theme.secondaryForeground};
  font-size: ${(props) => (props.$isTerm ? '1.5em' : '1em')};
  text-align: center;
`

const OptionWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;

  margin-bottom: 1em;
`
const OptionChoice = styled(Form.Check)``

const OptionInput = styled(Form.Text).attrs({ placeholder: 'Your Answer' })`
  margin-left: 0;
  grid-column: span 2;
  width: 100%;
`

const HorizontalDivider = styled.hr`
  border: none;
  height: 1px;
  width: 80%;
  background-color: ${(props) => props.theme.tertiaryBackground};
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

export default TestingSet

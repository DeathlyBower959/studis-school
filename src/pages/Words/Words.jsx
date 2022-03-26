import styled from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import { Edit } from 'react-feather'

import { CardContainer } from '../../components/Cards/WordCard'
import Form from '../../components/Forms/Form'
import Account from '../../contexts/AccountContext'
import { Link } from 'react-router-dom'

function Words() {
  const { userData } = useContext(Account)

  const [search, setSearch] = useState('')
  const [displayItems, setDisplayItems] = useState(userData.savedWords)

  useEffect(() => {
    // Add debounce
    setDisplayItems(
      userData.savedWords?.filter(
        (word) => word.word.toLowerCase().includes(search.trim())
        // Uncomment this line to make it so that the searchbar can
        // also search for the definiton of word
        // || word.def.toLowerCase().includes(search)

        // Uncomment this line to make it so that the searchbar can
        // also search for the type of word (verb, adjective, etc)
        // || word.type.includes(search)
      )
    )
  }, [search, userData.savedWords])

  useEffect(() => {
    setDisplayItems(userData.savedWords)
  }, [userData.savedWords])

  return (
    <>
      <Header>Dictionary</Header>
      <SearchWrapper>
        <Form.Text
          value={search || ''}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search words..."
        />
        <Link to="/words/new">
          <Form.Button>New</Form.Button>
        </Link>
      </SearchWrapper>
      <WordContainer>
        {displayItems &&
          displayItems.length > 0 &&
          displayItems.map((word) => {
            return (
              <CardContainer
                key={word._id}
                minh="5em"
                prefferedh="5em"
                maxh="50em"
                front={
                  <>
                    <StyledEditLink to={`/words/edit/${word._id}`}>
                      <StyledEdit size={18} />
                    </StyledEditLink>
                    <WordTitle>{word.word}</WordTitle>
                    <WordType>
                      {word.type.charAt(0).toUpperCase() + word.type.slice(1)}
                    </WordType>
                  </>
                }
                back={
                  <>
                    <WordDef>{word.def}</WordDef>
                  </>
                }></CardContainer>
            )
          })}
      </WordContainer>
    </>
  )
}

const StyledEditLink = styled(Link)`
  text-decoration: none;

  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5em 0.5em 0.75em 0.75em;

  cursor: pointer;
`

const StyledEdit = styled(Edit)`
  stroke: ${(props) => props.theme.secondaryMuted};
`

const Header = styled.p`
  color: ${(props) => props.theme.foreground};
  font-size: 3em;
  margin-bottom: 0.5em;

  width: 100%;
  text-align: center;
`

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.25em;
`

// Grid
const WordContainer = styled.div`
  display: flex;
  gap: 1em;
  width: 100%;
  padding: 0 3em;
  flex-wrap: wrap;

  margin-top: 1em;

  justify-content: center;
`

const WordWrapper = styled.div`
  /* text-decoration: none;
  background-color: ${(props) => props.theme.secondaryBackground};
  flex: 1 1 25%;
  min-width: 17em;
  max-width: 25%;

  padding: 1em;
  border-radius: 15px;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: transform 350ms ease-in-out;

  &:hover {
    transform: scale(1.03);
  } */
`

const WordTitle = styled.p`
  font-size: 1.75em;
  margin: 0.25em;

  width: 15ch;
  overflow-wrap: anywhere;
  word-wrap: break-all;

  text-align: center;

  color: ${(props) => props.theme.secondaryForeground};
`

const WordType = styled.p`
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0.5em;
  font-size: 0.8em;

  color: ${(props) => props.theme.secondaryMuted};
`

const WordDef = styled.p`
  color: ${(props) => props.theme.secondaryForeground};

  margin: 0.25em;

  width: 11ch;
  overflow-wrap: anywhere;
  word-wrap: break-all;

  text-align: center;
`

export default Words

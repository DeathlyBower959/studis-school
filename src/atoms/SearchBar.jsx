import { useEffect, useState } from 'react'
import { Search as SearchIcon, X as CloseIcon } from 'react-feather'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { MOBILE } from '../constants/sizes'

const SearchBar = ({ placeholder, data, keys, onClose }) => {
  const [filteredData, setFilteredData] = useState([])
  const [wordEntered, setWordEntered] = useState('')

  const [maxLength, setMaxLength] = useState(2)

  const handleFilter = (event) => {
    const searchWord = event.target.value
    setWordEntered(searchWord)

    if (!searchWord || searchWord === '') return setFilteredData([])

    let newFilter = []

    data.forEach((value) => {
      let isFound = false
      keys.forEach((key) => {
        if (value[key]?.toLowerCase()?.includes(searchWord?.toLowerCase())) {
          isFound = key
        }
      })
      if (isFound) {
        newFilter.push({
          ...value,
          keyFound: isFound
        })
      }
    })

    setFilteredData(newFilter)
  }

  useEffect(() => {
    if (filteredData.length === 0) setMaxLength(2)
  }, [filteredData, maxLength])

  const clearInput = () => {
    setFilteredData([])
    setWordEntered('')
  }

  return (
    <SearchWrapper>
      <SearchInputs>
        <SearchInput
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <SearchIconWrapper>
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon onClick={clearInput} />
          )}
        </SearchIconWrapper>
      </SearchInputs>
      {filteredData.length > 0 && (
        <DataResult>
          {filteredData.slice(0, maxLength).map((value) => {
            return (
              <DataItem
                key={uuidv4()}
                as={Link}
                to={value.path}
                onClick={() => {
                  handleFilter({ target: { value: '' } })
                  if (onClose) onClose()
                }}>
                {value.location ? (
                  <>
                    <DataTitle>{value.location}</DataTitle>
                    <DataContent>{value[value.keyFound]}</DataContent>
                  </>
                ) : (
                  <DataContent $noTitle>{value[value.keyFound]}</DataContent>
                )}
              </DataItem>
            )
          })}
          {filteredData.length > maxLength && (
            <DataItem
              onClick={() => setMaxLength((prev) => prev + 5)}
              style={{ alignItems: 'center' }}>
              <DataContent>Load more...</DataContent>
            </DataItem>
          )}
        </DataResult>
      )}
    </SearchWrapper>
  )
}

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  max-width: 300px;
  min-width: 17em;
  margin: auto 0;

  @media only screen and (max-width: ${MOBILE.navbar}) {
    max-width: 100%;
    min-width: 18em;
    width: 80vw;
    margin: 0.5em 0 1em 0.5em;
  }

  position: relative;
`

const SearchInputs = styled.div`
  display: flex;
`

const SearchInput = styled.input`
  background-color: ${(props) => props.theme.inputBackground};
  border: 0;
  border-radius: 15px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  font-size: 1em;
  padding: 0.5em 1em;
  height: 30px;
  width: 100%;

  &:focus {
    outline: none;
  }

  color: ${(props) => props.theme.muted};
  caret-color: ${(props) => props.theme.secondaryMuted};
`

const SearchIconWrapper = styled.div`
  background-color: ${(props) => props.theme.inputBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;

  svg {
    margin-right: 0.5em;
    transform: scale(0.8);
    color: ${(props) => props.theme.secondaryMuted};
  }
`

const DataResult = styled.div`
  width: 100%;
  max-height: 200px;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: ${(props) => props.theme.inputBackground};
  overflow: hidden;
  overflow-y: auto;

  border-radius: 15px;

  margin-top: 0.5em;

  position: absolute;
  top: 100%;
  @media only screen and (max-width: ${MOBILE.navbar}) {
    position: relative;
  }
`

const DataItem = styled.div`
  background-color: ${(props) => props.theme.inputBackground};
  padding: 0.5em 1em;
  display: flex;

  flex-direction: column;
  text-decoration: none;

  color: black;
  transition: filter 250ms ease-out;

  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`

const DataTitle = styled.p`
  margin: 0;
  color: ${(props) => props.theme.muted};
`

const DataContent = styled.p`
  color: ${(props) => props.theme.secondaryMuted};
  margin: 0 0 0 ${(props) => (props.$noTitle ? '0' : '0.5em')};
`

export default SearchBar

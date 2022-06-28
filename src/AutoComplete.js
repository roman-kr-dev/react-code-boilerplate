import { useCallback, useRef, useState } from 'react'
import { getDataFromServer } from './server.js'
import { debounce } from 'lodash'

const DEBOUNCE = 1000

const AutoComplete = () => {
  const [suggestions, setSuggestions] = useState([])
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef(null)

  const onClickHandle = e => {
    setInput(e.target.innerText)
    setActiveSuggestionIndex(0)
    setShowSuggestions(false)
    inputRef.current.focus()
  }

  const onChangeHandle = e => {
    setInput(e.target.value)
    debouncedSave(e.target.value)
  }

  const getSuggestions = async word => {
    if (word) {
      setIsLoading(true)
      let response = await getDataFromServer(word)
      setSuggestions(response)
      setIsLoading(false)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
    }
  }

  const debouncedSave = useCallback(
    debounce(newValue => getSuggestions(newValue), DEBOUNCE),
    [],
  )

  const SuggestionsList = () => {
    if (isLoading) {
      return null
    }
    return suggestions.length ? (
      <ul className="suggestions">
        {suggestions.map((suggestion, index) => {
          let className

          if (index === activeSuggestionIndex) {
            className = 'suggestion-active'
          }

          return (
            <li className={className} key={suggestion} onClick={onClickHandle}>
              {suggestion}
            </li>
          )
        })}
      </ul>
    ) : (
      <div className="no-suggestions">
        <em>No suggestions</em>
      </div>
    )
  }

  return (
    <>
      <div className="input-wrapper">
        <input
          ref={inputRef}
          type="text"
          onChange={onChangeHandle}
          value={input}
          placeholder="search"
        />
        {isLoading ? <div className="loader lds-dual-ring"></div> : null}
      </div>

      {showSuggestions && input && <SuggestionsList />}
    </>
  )
}

export default AutoComplete

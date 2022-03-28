import Axios from 'axios'
import settings from '../constants/devSettings'
import { isProvided } from '../utils/api'

export const signup = async (name, email, password) => {
  const missingValues = isProvided({ name, email, password }, [
    'name',
    'email',
    'password'
  ])
  if (missingValues.length > 0) return { isMissing: true, missingValues }

  try {
    const res = await Axios.post(settings.ROUTES.signup, {
      name,
      email,
      password
    })

    console.log(res)

    return res
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js

      return error.request
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
      return error
    }
  }
}

export const login = async (email, password) => {
  const missingValues = isProvided({ email, password }, ['email', 'password'])
  if (missingValues.length > 0) return { isMissing: true, missingValues }

  try {
    const res = await Axios.get(settings.ROUTES.login, {
      params: {
        email,
        password
      }
    })

    return res
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js

      return error.request
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
      return error
    }
  }
}

export const getUser = async (token) => {
  const missingValues = isProvided({ token }, ['token'])
  if (missingValues.length > 0) return { isMissing: true, missingValues }

  try {
    const res = await Axios.get(settings.ROUTES.get, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js

      return error.request
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
      return error
    }
  }
}

export const updateUser = async (token, newUser = {}) => {
  const missingValues = isProvided({ token }, ['token'])
  if (missingValues.length > 0) return { isMissing: true, missingValues }

  try {
    const res = await Axios.put(settings.ROUTES.update, newUser, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js

      return error.request
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
      return error
    }
  }
}

export const addCompetitor = async (token, userId) => {
  const missingValues = isProvided({ token, userId }, ['token', 'userId'])
  if (missingValues.length > 0) return { isMissing: true, missingValues }

  try {
    const res = await Axios.put(settings.ROUTES.update, {
      competitor: userId
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js

      return error.request
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
      return error
    }
  }
}
export const deleteCompetitor = async (token, userId) => {
  const missingValues = isProvided({ token, userId }, ['token', 'userId'])
  if (missingValues.length > 0) return { isMissing: true, missingValues }

  try {
    const res = await Axios.put(settings.ROUTES.update, {
      competitor: userId
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js

      return error.request
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
      return error
    }
  }
}

export const createSet = async (token, set) => {
  const missingValues = isProvided({ token, set }, ['token', 'set'])
  if (missingValues.length > 0) return { isMissing: true, missingValues }

  try {
    const res = await Axios.put(settings.ROUTES.update, {
      userSets: set
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js

      return error.request
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
      return error
    }
  }
}

export const updateSet = async (token, setId, newSet) => {
  const missingValues = isProvided({ token, setId, newSet }, ['token', 'setId', 'newSet'])
  if (missingValues.length > 0) return { isMissing: true, missingValues }

  try {
    const res = await Axios.put(settings.ROUTES.update, {
      userSets: {
        setId,
        ...newSet
      }
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js

      return error.request
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
      return error
    }
  }
}

export const deleteSet = async (token, setId) => {
  const missingValues = isProvided({ token, setId }, ['token', 'setId'])
  if (missingValues.length > 0) return { isMissing: true, missingValues }

  try {
    const res = await Axios.put(settings.ROUTES.update, {
      userSets: {
        setId
      }
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js

      return error.request
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
      return error
    }
  }
}

export const createWord = async (token, word) => {
  const missingValues = isProvided({ token, word }, ['token', 'word'])
  if (missingValues.length > 0) return { isMissing: true, missingValues }

  try {
    const res = await Axios.put(settings.ROUTES.update, {
      savedWords: word
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js

      return error.request
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
      return error
    }
  }
}

export const updateWord = async (token, wordId, newWord) => {
  const missingValues = isProvided({ token, wordId, newWord }, ['token', 'wordId', 'newWord'])
  if (missingValues.length > 0) return { isMissing: true, missingValues }

  try {
    const res = await Axios.put(settings.ROUTES.update, {
      savedWords: {
        wordId,
        ...newWord
      }
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js

      return error.request
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
      return error
    }
  }
}

export const deleteWord = async (token, wordId) => {
  const missingValues = isProvided({ token, wordId }, ['token', 'wordId'])
  if (missingValues.length > 0) return { isMissing: true, missingValues }

  try {
    const res = await Axios.put(settings.ROUTES.update, {
      savedWords: {
        wordId
      }
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js

      return error.request
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
      return error
    }
  }
}

export const deleteUser = async (token) => {
  const missingValues = isProvided({ token }, ['token'])
  if (missingValues.length > 0) return { isMissing: true, missingValues }

  try {
    const res = await Axios.delete(settings.ROUTES.delete, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js

      return error.request
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
      return error
    }
  }
}

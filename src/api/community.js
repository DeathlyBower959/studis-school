import Axios from 'axios'
import settings from '../constants/devSettings'
import { isProvided } from '../utils/api'

export const getCommunity = async (currentUserId= null,userId = null) => {
  try {
    const res = await Axios.get(settings.ROUTES.community, {
      params: {
        currentUserId,
        userId
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

export const getLeaderboard = async () => {
  try {
    const res = await Axios.get(settings.ROUTES.leaderboard)

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

export const remixSet = async (token, userId, setId) => {
  const missingValues = isProvided({ token, userId, setId }, [
    'token',
    'userId',
    'setId'
  ])
  if (missingValues.length > 0) return { isMissing: true, missingValues }

  try {
    const res = await Axios.put(
      settings.ROUTES.update,
      {
        savedSets: {
          userId,
          setId
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

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

export const getCompetitors = async (userIds) => {
  const missingValues = isProvided({ userIds }, ['userIds'])
  if (missingValues.length > 0) return { isMissing: true, missingValues }

  try {
    const res = await Axios.post(settings.ROUTES.competitors, {
      ids: userIds
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

export const updateRemixedSet = async (token, setId, newSet) => {
  const missingValues = isProvided({ token, setId, newSet }, [
    'token',
    'setId',
    'newSet'
  ])
  if (missingValues.length > 0) return { isMissing: true, missingValues }

  try {
    const res = await Axios.put(
      settings.ROUTES.update,
      {
        savedSets: {
          setId,
          ...newSet
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

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

export const deleteRemixedSet = async (token, setId) => {
  const missingValues = isProvided({ token, setId }, ['token', 'setId'])
  if (missingValues.length > 0) return { isMissing: true, missingValues }

  try {
    const res = await Axios.put(
      settings.ROUTES.update,
      {
        savedSets: {
          setId
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

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

export const upvoteSet = async (token, userId, setId) => {
  const missingValues = isProvided({ token, userId, setId }, [
    'token',
    'userId',
    'setId'
  ])
  if (missingValues.length > 0) return { isMissing: true, missingValues }

  try {
    const res = await Axios.put(
      settings.ROUTES.update,
      {
        userSets: {
          upvote: true,
          userId,
          setId
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

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

export const downvoteSet = async (token, userId, setId) => {
  const missingValues = isProvided({ token, userId, setId }, [
    'token',
    'userId',
    'setId'
  ])
  if (missingValues.length > 0) return { isMissing: true, missingValues }

  try {
    const res = await Axios.put(
      settings.ROUTES.update,
      {
        userSets: {
          downvote: true,
          userId,
          setId
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

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

export const upvoteWord = async (token, userId, wordId) => {
  const missingValues = isProvided({ token, userId, wordId }, [
    'token',
    'userId',
    'wordId'
  ])
  if (missingValues.length > 0) return { isMissing: true, missingValues }

  try {
    const res = await Axios.put(
      settings.ROUTES.update,
      {
        savedWords: {
          upvote: true,
          userId,
          wordId
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

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

export const downvoteWord = async (token, userId, wordId) => {
  const missingValues = isProvided({ token, userId, wordId }, [
    'token',
    'userId',
    'wordId'
  ])
  if (missingValues.length > 0) return { isMissing: true, missingValues }

  try {
    const res = await Axios.put(
      settings.ROUTES.update,
      {
        savedWords: {
          downvote: true,
          userId,
          wordId
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

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

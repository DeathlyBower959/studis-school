import './styles.css'
import 'react-toastify/dist/ReactToastify.css'

import { Routes as ReactRoutes, Route, useNavigate } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { toast, ToastContainer } from 'react-toastify'
import { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'

// Components
import Navbar from './components/Navbar'
import Routes from './atoms/Routes/Routes'

// Pages
import Landing from './pages/Landing'
import PageNotFound from './pages/PageNotFound'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'

// Planner (Not sure if we have time)
// import Planner from "./pages/Planner";

// Community
import Community from './pages/Community/Community'
import CommunityLeaders from './pages/Community/Leaders'
import CommunityUserProfile from './pages/Community/UserProfile'
import CommunityUserSet from './pages/Community/UserSet'
import CommunityUserWord from './pages/Community/UserWord'

// Study
import Study from './pages/Study/Study'
import StudyNew from './pages/Study/New'
import StudyView from './pages/Study/View'
// My Sets
import StudyMySets from './pages/Study/MySets/MySets'
import StudyMySetsEdit from './pages/Study/MySets/Edit'
import StudyMySetsFlash from './pages/Study/MySets/Flash'
import StudyMySetsLearn from './pages/Study/MySets/Learn'
import StudyMySetsTest from './pages/Study/MySets/Test'
import StudyMySetsView from './pages/Study/MySets/View'
// SavedSets
import StudySavedSets from './pages/Study/SavedSets/SavedSets'
import StudySavedSetsEdit from './pages/Study/SavedSets/Edit'
import StudySavedSetsFlash from './pages/Study/SavedSets/Flash'
import StudySavedSetsetsLearn from './pages/Study/SavedSets/Learn'
import StudySavedSetsTest from './pages/Study/SavedSets/Test'
import StudySavedSetsView from './pages/Study/SavedSets/View'
// Words
import Words from './pages/Words/Words'
import WordsNew from './pages/Words/New'
import WordsView from './pages/Words/View'
import WordsEdit from './pages/Words/Edit'

// Contexts
import ToastNotifContext from './contexts/ToastNotifContext'
import AccountContext from './contexts/AccountContext'

// Hooks
import useLocalStorage from './hooks/useLocalStorage'

// Constants
import defaultThemes from './constants/defaultThemes.json'

// Utils
import { sleep } from './utils/sleep'

// Api
import { getUser, login } from './api/user'

const App = () => {
  // If successfull login, it is an object of all the user data (must manually update)
  const [userData, setUserData] = useState('none')

  // Used for automatic login on page refresh etc
  const [localAuth, setLocalAuth] = useLocalStorage('authToken', null)

  // Allows navigating the page programatically without user input
  // navigate("/PATH", { replace: true });
  const navigate = useNavigate()

  useEffect(() => {
    AuthLogin()
  }, [])

  const [DEBUG_ThemeIndex, DEBUG_setThemeIndex] = useState(0)

  // Choosing Default Themes etc
  const theme =
    userData?.settings?.themes[
      userData?.settings?.themes.findIndex(
        (t) => t.themeID === userData?.settings?.selectedTheme
      )
    ] ||
    userData?.settings?.themes.find(
      (theme) => theme.themeID === 'default_themes.dark'
    ) ||
    defaultThemes.themes[DEBUG_ThemeIndex]

  const DEBUG_SwitchTheme = (index = null) => {
    console.log('THIS IS ONLY DEBUG FOR TESTING THEMES')
    if (index) DEBUG_setThemeIndex(index)
    else
      DEBUG_setThemeIndex((prev) => {
        if (defaultThemes.themes.length - 1 == prev) return 0
        return prev + 1
      })

    setTimeout(() => {
      DEBUG_SwitchTheme()
    }, 5000)
  }

  const SendToast = useCallback(
    async (message, type, currentTheme = theme, icon = null) => {
      if (!message) return console.error('Failed to send toast, no message!')

      const defaultToastStyle = {
        icon,
        style: {
          backgroundColor: currentTheme.secondaryBackground,
          color: currentTheme.foreground
        },
        progressStyle: {
          background: `linear-gradient(58deg,${currentTheme.accent} 20%,${currentTheme.secondaryAccent} 100%)`
        }
      }

      switch (type) {
        case 'success':
          toast.success(message, {
            ...defaultToastStyle
          })
          break
        case 'info':
          toast.info(message, {
            ...defaultToastStyle
          })
          break
        case 'warn':
          toast.warn(message, {
            ...defaultToastStyle
          })
          break
        case 'error':
          toast.error(message, {
            ...defaultToastStyle
          })
          break
        case 'promise':
          if (
            !(
              Object.prototype.toString.call(message.promise) ==
              '[object Promise]'
            )
          )
            return console.error(
              'Failed to send notification, the message was not a promise!'
            )

          const response = await toast.promise(message.promise, {
            pending: {
              render() {
                return message.pending || 'Working on it...'
              },
              ...defaultToastStyle
            },
            success: {
              render() {
                return message.success || 'All done!'
              },
              ...defaultToastStyle
            },
            error: {
              render() {
                return message.error || 'Whoops, this action failed!'
              },
              ...defaultToastStyle
            }
          })

          return response
        default:
          toast(message, {
            ...defaultToastStyle
          })
          break
      }
    },
    [theme]
  )

  // Function to log the user in.
  // If email and password are supplied, attempts to log in user
  // Otherwise logs in user with the saved token
  const AuthLogin = useCallback(
    async (email = null, password = null) => {
      const LoginPromise = new Promise(async (resolve, reject) => {
        // Wait 100ms for the notification to popup
        await sleep(100)

        // DEBUG_SwitchTheme()

        // No email or password was specified, but we have a token we can attempt to log in with
        if (!email && !password && localAuth) {
          // Tries to get the users data using their token
          const retrievedUser = await getUser(localAuth)

          // Request for user data failed
          if (retrievedUser.isMissing || retrievedUser?.status !== 200) {
            // Sets userData to null, so know that we failed to get userdata
            if (userData === 'none') setUserData(null)
            // If we are not missing token, then remove token
            if (retrievedUser?.status !== 200) AuthLogout()
            return reject('User not found!')
          }
          // Update userData with the retrieved data
          setUserData(retrievedUser.data)
          resolve('User Found!')
        }

        // email and password are specified, so attempting to log in with credentials
        if (email && password) {
          // Attemping login to retreive a token
          const loginData = await login(email, password)

          // Request to login failed
          if (loginData.isMissing || loginData?.status !== 200) {
            // Sets userData to null, so know that we failed to get userdata
            if (userData === 'none') setUserData(null)
            return reject('User not found!')
          }

          const retrievedUser = await getUser(loginData.data.token)

          // Request for user data failed
          if (retrievedUser.isMissing || retrievedUser?.status !== 200) {
            // Sets userData to null, so know that we failed to get userdata
            if (userData === 'none') setUserData(null)
            // If we are not missing token, then remove token
            if (retrievedUser?.status !== 200) AuthLogout()
            return reject('User not found!')
          }

          // Sets token for autologin
          setLocalAuth(loginData.data.token)

          // Sets userData, so we can access later
          setUserData(retrievedUser.data)
          resolve('User Found!')
        }
      })

      // Attempts to login only if we specifiy an email OR we have a token
      if (localAuth || (email && password)) {
        SendToast(
          {
            promise: LoginPromise,
            pending: 'Logging you in...',
            error: 'Failed to login!',
            success: 'Successfully logged in!'
          },
          'promise'
        )
      } else {
        setUserData(null)
        setLocalAuth(null)
      }
    },
    [userData, localAuth, SendToast]
  )

  const AuthLogout = useCallback(() => {
    setUserData(null)
    setLocalAuth(null)
    navigate('/login', { replace: true })
  }, [])

  // 0 = Not Logged In
  // 1 = Logged In
  // 2 = Logging In
  const isLoggedIn = useCallback(() => {
    if (!userData) return 0
    if (userData === 'none') return 2

    return 1
  }, [userData])

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
      <ToastNotifContext.Provider value={SendToast}>
        <AccountContext.Provider
          value={{
            localAuth,
            setLocalAuth,
            AuthLogin,
            AuthLogout,
            userData,
            setUserData,
            isLoggedIn
          }}>
          <Navbar />
          <ReactRoutes>
            <Route path="*" element={<PageNotFound />} />

            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />

            {/* MUST BE LOGGED OUT */}
            <Route element={<Routes.NoAccount />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            {/* MUST BE LOGGED IN */}
            <Route element={<Routes.RequireAuth />}>
              {/* Study */}
              <Route path="/study" element={<Study />} />

              <Route path="/study/new" element={<StudyNew />} />
              <Route path="/study/view" element={<StudyView />} />

              <Route path="/study/saved" element={<StudySavedSets />} />
              <Route path="/study/sets" element={<StudyMySets />} />

              <Route
                path="/study/saved/edit/:setId"
                element={<StudySavedSetsEdit />}
              />
              <Route
                path="/study/sets/edit/:setId"
                element={<StudyMySetsEdit />}
              />

              <Route
                path="/study/saved/view/:setId"
                element={<StudySavedSetsView />}
              />
              <Route
                path="/study/sets/view/:setId"
                element={<StudyMySetsView />}
              />

              <Route
                path="/study/saved/flash/:setId"
                element={<StudySavedSetsFlash />}
              />
              <Route
                path="/study/sets/flash/:setId"
                element={<StudyMySetsFlash />}
              />

              <Route
                path="/study/saved/test/:setId"
                element={<StudySavedSetsTest />}
              />
              <Route
                path="/study/sets/test/:setId"
                element={<StudyMySetsTest />}
              />

              <Route
                path="/study/saved/learn/:setId"
                element={<StudySavedSetsetsLearn />}
              />
              <Route
                path="/study/sets/learn/:setId"
                element={<StudyMySetsLearn />}
              />

              {/* Dictionary (Saved Words) */}
              <Route path="/words" element={<Words />} />
              <Route path="/words/new" element={<WordsNew />} />
              <Route path="/words/view/:wordId" element={<WordsView />} />
              <Route path="/words/edit/:wordId" element={<WordsEdit />} />

              {/* Community */}
              <Route path="/community" element={<Community />} />
              <Route path="/community/leaders" element={<CommunityLeaders />} />
              <Route
                path="/community/:userId"
                element={<CommunityUserProfile />}
              />
              <Route
                path="/community/:userId/sets/:setId"
                element={<CommunityUserSet />}
              />
              <Route
                path="/community/:userId/words/:wordId"
                element={<CommunityUserWord />}
              />
            </Route>
          </ReactRoutes>
          <WebsiteBackground />
        </AccountContext.Provider>
      </ToastNotifContext.Provider>
    </ThemeProvider>
  )
}

const WebsiteBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  z-index: -999999;

  background-color: ${(props) => props.theme.background};
`

export default App

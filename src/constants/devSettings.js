const devURL = 'http://localhost:5000'
const prodURL = 'https://studis-server-deathlybower959.vercel.app'

// Uses development server (Only for ben, as he has access to the server)
const devServer = false

// Turns the app into developer mode, so it logs more verbose messages
const DEV_MODE = false

const apiURL = devServer ? devURL : prodURL

export default {
  API_URL: apiURL,
  DEV_MODE,
  ROUTES: {
    login: apiURL + '/user/login',
    signup: apiURL + '/user/signup',
    delete: apiURL + '/user/delete',
    update: apiURL + '/user/update',
    get: apiURL + '/user/get',
    community: apiURL + '/community',
    leaderboard: apiURL + '/community/leaderboard',
    competitors: apiURL + '/community/competitors'
  }
}

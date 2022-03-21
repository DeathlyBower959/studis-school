import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <App style={{ height: '100%' }} />
    </BrowserRouter>
  </StrictMode>,
  rootElement
)
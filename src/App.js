import './styles.css'

import { Routes, Route } from 'react-router-dom'

// Pages
import PageNotFound from './pages/PageNotFound'
import Landing from './pages/Landing'

const App = () => {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound/>} />

      <Route path="/" element={<Landing/>} />

      {/* Planner */}
      <Route path="/planner" element={<Landing/>} />

      {/* Study */}
      <Route path="/study" element={<Landing/>} />
    </Routes>
  )
}

export default App
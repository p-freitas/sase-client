import { Routes, Route, useLocation  } from 'react-router-dom'
import Home from './pages/Home/index'
import Display from './pages/DisplayTerminal/index'
import Password from './pages/PasswordTerminal/index'
import Service from './pages/ServiceTerminal/index'
import OldPasswords from './pages/OldPasswords/index'
import GlobalStyles from './styles/global'
import Sidebar from './components/Sidebar'

function App() {
  const location = useLocation()
  return (
    <div className="App" id="outer-container">
    {location.pathname !== '/password' && <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />}
      <GlobalStyles />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/password' element={<Password />} />
        <Route path='/service' element={<Service />} />
        <Route path='/display' element={<Display />} />
        <Route path='/oldPasswords' element={<OldPasswords />} />
      </Routes>
    </div>
  )
}

export default App

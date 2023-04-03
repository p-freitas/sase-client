import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/index'
import Display from './pages/DisplayTerminal/index'
import Password from './pages/PasswordTerminal/index'
import Service from './pages/ServiceTerminal/index'
import Print from './pages/Print/index'
import GlobalStyles from './styles/global'

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/password' element={<Password />} />
        <Route path='/service' element={<Service />} />
        <Route path='/display' element={<Display />} />
        <Route path='/print' element={<Print />} />
      </Routes>
    </>
  )
}

export default App

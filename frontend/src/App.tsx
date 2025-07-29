
import './App.css'
import { Route, Routes} from 'react-router-dom'
import Login from './features/login/login'
import Register from './features/register/register'
import HomePage from './features/home/homepage'

function App() {
  
//functionality
  return (
    <Routes>
      <Route path= '/' element={<Login />}/>
      <Route path= '/Register' element={<Register />}/>
      <Route path = '/home' element = {<HomePage />}/>

    </Routes>
  )
    
}

export default App;

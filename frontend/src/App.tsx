
import './App.css'
import { Route, Routes} from 'react-router-dom'
import Login from './features/login/login'
import Register from './features/register/register'
import HomePage from './features/home/homepage'
import ProfileSetup from './features/profilesetup/ProfileSetUp';
import Dashboard from './features/dashboard/Dashboard';
import LoginGuard from './shared/guards/loginGuard'
import Profile from './features/profile/Profile';
import AuthGuard from './shared/guards/authGuard';
import RoleGuard from './shared/guards/roleGuard';

function App() {
  
//functionality
  return (
    <Routes>
      <Route path= '/' element={
      <LoginGuard>
        <Login />
      </LoginGuard>
      }/>
      <Route path= '/Register' element={<Register />}/>
      <Route path='/profile-setup' element={
        <AuthGuard>
          <ProfileSetup />
        </AuthGuard>
      } />
      <Route path='/home' element={
        <AuthGuard>
          <HomePage />
        </AuthGuard>
      } />
      <Route path='/dashboard' element={
        <AuthGuard>
          <Dashboard />
        </AuthGuard>
      } />
      <Route path='/profile' element={
        <AuthGuard>
          <Profile />
        </AuthGuard>
      } />

    </Routes>
  )
    
}

export default App;

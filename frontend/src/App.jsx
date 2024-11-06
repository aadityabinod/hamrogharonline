import { BrowserRouter, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'


export default function App() {
  return (

    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/about' element={<About/>} />
      <Route path='/register' element={<Register/>}/>
      <Route path='/signin' element={<SignIn/>}/> 
      <Route path='/profile' element={<Profile/>} />
      

    </Routes>
    </BrowserRouter>
    
  )
}
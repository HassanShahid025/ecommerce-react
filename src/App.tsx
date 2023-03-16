//3:55:48
import './App.css'
import { Routes, Route } from 'react-router-dom'
//Components
import { Header,Footer } from './components//export'

//Pages
import {Home, Contact, Login, Register, Reset} from './pages/export'


function App() {

  return (
    <>
    <Header/>
      <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/contact' element={<Contact/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>
         <Route path='/reset' element={<Reset/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App

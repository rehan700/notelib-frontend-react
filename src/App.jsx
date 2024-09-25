import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Alert from "./components/Alert"
import { useState, useEffect } from "react"
import axios from "axios"
function App() {
  const [alert, setAlert] = useState('')
  
  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 5000);
  }
  
  

  return (
    <>

      <Router>
        <Navbar name={name} />
        <Alert alert={alert} />
        <div id="emailHelp" className="form-text text-center">We'll never share your notes with anyone else.</div>
        <div className="container">
          <Routes>
            <Route path="/" element={localStorage.getItem('auth-token')?<Home />:<Login/>} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login showAlert={showAlert} name={name} />} />
            <Route path="/signup" element={<SignUp showAlert={showAlert} name={name} />} />
          </Routes>
        </div>
      </Router>

    </>
  )

}
export default App

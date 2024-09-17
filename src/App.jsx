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
import { useState } from "react"
function App() {
  const [alert,setAlert]=useState('')
  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 5000);
  };
  return (
    <>
      
      <Router>
      <Navbar />
      <Alert alert={alert}/>
      <div id="emailHelp" className="form-text text-center">We'll never share your notes with anyone else.</div>
      <div className="container">
      <Routes>
        <Route path="/" element={<Home showAlert={showAlert}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login showAlert={showAlert}/>} />
        <Route path="/signup" element={<SignUp showAlert={showAlert}/>} />
      </Routes>
      </div>
      </Router>
      
    </>
  )

}
export default App

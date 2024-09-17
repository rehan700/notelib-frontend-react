import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PasswordInput from './PasswordInput'
import axios from 'axios'
import '../styles/SignUp.css'
import NoteContext from '../context/notes/NoteContext'
export default function SignUp(props) {
  let navigate = useNavigate()
  const notes=useContext(NoteContext)
  const confirmPasswordRef = useRef()
  const [alert,setAlert]=useState('')
  const [credentials, setCredential] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const handleOnChange = (e) => {
    setCredential({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const signUpUser = (name, email, password) => {
    axios.post(`/api/auth/createuser`, { name, email, password }, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        const { err, errors,message,jwtToken } = response.data; // Destructure data from response
        if (err === 3) {
          localStorage.setItem('auth-token',jwtToken)
          notes.getUserDetails()
          props.showAlert(`Welcome to Notes Planet, ${notes.username}`)
          navigate('/')
          setCredential({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
          })
        } else if (err === 1) {
          setAlert(errors.map(error => error.msg).join(', ')); // Join error messages
        } else if (err === 2) {
          setAlert(message);
          setCredential({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
          })
        }
      })
      .catch((err) => {
        console.error(err);
        setAlert('An error occurred. Please try again.');
      });
  }
  

  const handleOnSubmit = (event) => {
    event.preventDefault()
    if (credentials.password === credentials.confirmPassword) {
      signUpUser(credentials.name, credentials.email, credentials.password)
      confirmPasswordRef.current.innerHTML=''
    }
    else {
      confirmPasswordRef.current.innerHTML='Passwords do not match'
    }

  }
  return (
    <div className='d-flex justify-content-center min-vh-100' style={{ marginTop: '1.5rem' }}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <h1 className="text-center mb-3">Sign up</h1>
            <form className="p-4 border rounded" onSubmit={handleOnSubmit}>
            {alert && <div className="alert alert-danger alert-shake" role="alert">{alert}</div>}
              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">Name</label>
                <input type="text" name='name' value={credentials.name} onChange={handleOnChange} className="form-control input-style" id="exampleInputName" aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name='email' value={credentials.email} onChange={handleOnChange} className="form-control input-style" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <PasswordInput password={credentials.password} handleOnChange={handleOnChange} inputName='password'/>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Confirm Password
                </label>
                <PasswordInput password={credentials.confirmPassword} handleOnChange={handleOnChange} inputName='confirmPassword' />
                <div id="emailHelp" className="form-text" ref={confirmPasswordRef} style={{color:'red'}}></div>
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
              </div>
              <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

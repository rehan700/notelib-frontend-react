import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import PasswordInput from './PasswordInput'
import axios from 'axios';
import NoteContext from '../context/notes/NoteContext';
export default function Login(props) {
    const notes=useContext(NoteContext)
    let navigate = useNavigate()
    const [alert, setAlert] = useState('')
    const [credentials, setCredential] = useState({
        email: '',
        password: ''
    })
    const handleOnChange = (e) => {
        setCredential({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const loginUser = (email, password) => {
        axios.post(`/api/auth/login`, { email, password }, {
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then((response) => {
                if (response.data.success) {
                    localStorage.setItem('auth-token', response.data.jwtToken)
                    navigate('/')
                    notes.userDetails(response.data.jwtToken)
                    props.showAlert(`Welcome back ${notes.name}`)
                    setCredential({
                        email: '',
                        password: ''
                    })
                }
                else {
                    setAlert(response.data.message)
                }
            })
            .catch((err) => console.error(err))
    }

    const handleOnSubmit = (event) => {
        event.preventDefault()
        loginUser(credentials.email, credentials.password)
    }
    return (
        <div className='d-flex justify-content-center min-vh-100' style={{ marginTop: '1.5rem' }}>

            <div className='container'>

                <div className='row justify-content-center'>

                    <div className='col-md-6'>
                        <h1 className='text-center mb-3' style={{ marginTop: '5px' }}>Login </h1>
                        <form className="p-4 border rounded" onSubmit={handleOnSubmit}>

                            {alert && <div className="alert alert-danger alert-shake" role="alert">{alert}</div>}
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" name='email' value={credentials.email} onChange={handleOnChange} className="form-control input-style" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Password
                                </label>
                                <PasswordInput password={credentials.password} handleOnChange={handleOnChange} inputName='password' />
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

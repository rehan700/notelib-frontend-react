import React, { Component, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'
import { FaSearch, FaUser } from 'react-icons/fa';
import NoteContext from '../context/notes/NoteContext';

export default function Navbar() {
  let location = useLocation();
  const navigate = useNavigate()
  React.useEffect(() => {
    console.log(location)
  }, [location])
  const notes = useContext(NoteContext)
  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/">

          NOTES APP

        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className='nav-item'>
              <Link className={location.pathname === '/' ? 'nav-link active' : 'nav-link'} to='/'>Home</Link>
            </li>
            <li className='nav-item'>
              <Link className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'} to='/about'>About</Link>
            </li>

          </ul>
          <ul className="nav justify-content-center" style={{ marginRight: '20rem' }}>
            <form className="d-flex text-center" role="search">
              <input disabled={!localStorage.getItem('auth-token')} className="form-control me-2" value={notes.searchQuery} onChange={notes.handleSearch} type="search" placeholder="Search your note..." aria-label="Search" style={{ width: '18rem' }} />
            </form>
          </ul>

          {!localStorage.getItem('auth-token') ? <div style={{ display: 'flex' }}>
            <Link className='nav-link mx-1' to='/login'> <button type="button" className="btn btn-info">Login</button></Link>
            <Link className='nav-link mx-1' to='/signup'> <button type="button" className="btn btn-info">Sign-up</button></Link>
          </div> :<div style={{display:'flex'}} ><h5 style={{color:'white',marginTop:'6px'}}>{notes.username}</h5><div className="dropdown">
            <FaUser type='button'
            className='mx-3'
             style={{ color: 'red', fontSize: '1.65rem' }}
              data-bs-toggle="dropdown" aria-expanded="false" />
            <ul className="dropdown-menu dropdown-menu-end">
              <li onClick={() => {
                localStorage.removeItem('auth-token')
                navigate('/login')
              }}><a className="dropdown-item" href="#">Logout</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
          </div>
          }




        </div>
      </div>
    </nav>

  )
}

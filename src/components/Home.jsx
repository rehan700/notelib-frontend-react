import React, { useContext, useEffect, useState } from 'react'
import NoteItem from './NoteItem'
import NoteContext from '../context/notes/NoteContext'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const mynotes = useContext(NoteContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      mynotes.fetchAllNotes()
    }
    else {
      navigate('/login')
    }
  }, [])
   const obj = {
    title: "",
    description: "",
    tag: ""
  }
  const [val, setVal] = useState(obj)
  const handleOnChangeTitle = (event) => {
    console.log("on change!")
    setVal(prevState => ({
      ...prevState,
      title: event.target.value
    }))
  }
  const handleOnChangeDescription = (event) => {
    console.log("on change!")
    setVal(prevState => ({
      ...prevState,
      description: event.target.value
    }))
  }
  const handleOnChangeTag = (event) => {
    console.log("on change!")
    setVal((prevState) => ({
      ...prevState,
      tag: event.target.value
    }))
  }
  const handleAdd = (event) => {
    event.preventDefault()
    mynotes.addNote(val.tag, val.title, val.description)
    setVal({
      title: "",
      description: "",
      tag: ""
    })
  }
  return (
    <div className='container'>
      <h2 className='text-center'>Notes</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
          <input type="text"
            className="form-control form-style"
            id="noteTitle"
            placeholder='Give a title to your note...'
            aria-describedby="emailHelp"
            value={val.title}
            onChange={handleOnChangeTitle} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
          <textarea type="text"
            rows={10}
            className="form-control form-style"
            id="noteDescription"
            placeholder='Write description of your note...'
            value={val.description}
            onChange={handleOnChangeDescription}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
          <input
            type="text"
            className="form-control form-style"
            id="noteTag"
            placeholder='Give a tag to your note...'
            value={val.tag}
            onChange={handleOnChangeTag} />
          <div id="emailHelp" className="form-text">example : personal, official, work,...</div>

        </div>
        <button type="submit" disabled={val.title.length === 0} className="btn btn-primary" onClick={handleAdd}>Add note</button>
      </form>
      <h3 style={{ paddingTop: '20px' }}>Your Notes</h3>
      <div className="container" style={{
        border: '3px solid black',
        borderRadius: '6px',
      }}>
        
        <div className="row" style={{ padding: '0px', marginRight: '5px' }}>
          {mynotes.notes.length === 0 && <h6 className='text-center'>No notes to display</h6>}
          {mynotes.notes.map((note, index) => {
            return (
              <div className="col-md-3" key={index}>
                <NoteItem
                  title={note.title}
                  description={note.description}
                  tag={note.tag}
                  deleteId={note._id}
                  index={index}
                  flag={mynotes.isPresent(note)}
                />
              </div>
            )
          })}

        </div>
        
      </div>
    </div>
  )
}

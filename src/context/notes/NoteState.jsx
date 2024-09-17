import React, { useState } from 'react'
import NoteContext from './NoteContext'
import axios from 'axios'
export default function NoteState(props) {
  const [username, setName] = useState('')
  const getUserDetails = () => {
    axios.post('/api/auth/getuser', {}, {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
        'Content-Type': 'application/json'
      }
    })
      .then((res) =>
        setName(res.data.name)
      )
      .catch((err) => console.error(err));
  }
  const fetchAllNotes = () => {
    axios.get('/api/notes/fetchnotes', {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        setNotes(res.data)
      }
      )
      .catch((err) => console.error(err));
  }
  const [notes, setNotes] = useState([])

  const deleteNote = (id) => {
    axios.delete(`/api/notes/deletenote/${id}`, {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
        'Content-Type': 'application/json'
      }
    })
      .then(
        () => fetchAllNotes()
      )
      .catch((err) => console.error(err))

  }
  const addNote = (tag, title, description) => {
    axios.post(`/api/notes/addnote`, { title, description, tag }, {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
        'Content-Type': 'application/json'
      },

    })
      .then(
        () => fetchAllNotes()
      )
      .catch((err) => console.error(err))

  }
  const updateNote = (title, description, tag, id) => {
    axios.put(`/api/notes/updatenote/${id}`, { title, description, tag }, {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
        'Content-Type': 'application/json'
      },

    })
      .then(
        () => fetchAllNotes()
      )
      .catch((err) => console.error(err))
  }
  const [searchQuery, setSearchQuery] = useState('')
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }
  const isPresent = (note) => {
    if (!searchQuery) return false;  // If searchQuery is empty, return false (no highlight)

    return (
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <NoteContext.Provider value={{
      notes, setNotes, addNote, deleteNote, updateNote, fetchAllNotes,
      handleSearch, searchQuery, isPresent, username, getUserDetails
    }}>
      {props.children}
    </NoteContext.Provider>
  )
}

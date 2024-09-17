import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import NoteState from './context/notes/NoteState.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NoteState>
    <App />
    </NoteState>
    
  </StrictMode>,
)

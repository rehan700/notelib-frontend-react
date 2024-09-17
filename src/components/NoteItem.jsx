import React, { useContext, useRef, useState } from 'react';
import { FaEdit, FaTrash, FaExpandAlt } from 'react-icons/fa';
import NoteContext from '../context/notes/NoteContext';
import '../styles/NoteItem.css'
import ExpandModal from './ExpandModal';
export default function NoteItem(props) {
  const { title, description, tag, deleteId, index, flag } = props;
  const forNotes = useContext(NoteContext);
  const modalRef = useRef()
  const eref = useRef()
  const [val, setVal] = useState({
    title: '',
    description: '',
    tag: '',
  });
  const deleteRef = useRef()
  // Function to load the current note's values when the modal opens
  const loadNoteValues = () => {
    const currentNote = forNotes.notes[index];
    setVal({
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
    });
  };

  const handleOnChangeTitle = (event) => {
    setVal((prevState) => ({
      ...prevState,
      title: event.target.value,
    }));
  };

  const handleOnChangeDescription = (event) => {
    setVal((prevState) => ({
      ...prevState,
      description: event.target.value,
    }));
  };

  const handleOnChangeTag = (event) => {
    setVal((prevState) => ({
      ...prevState,
      tag: event.target.value,
    }));
  };
  const handleUpdate = (event) => {
    event.preventDefault()
    forNotes.updateNote(val.title, val.description, val.tag, deleteId)
    setVal({
      title: "",
      description: "",
      tag: ""
    })
    modalRef.current.click()
  }

  return (
    <div className="my-3">
      <div className="card" style={{width: '15rem', backgroundColor: flag?'green': '#f4f56e' }}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{ left: '84%' }}>
          {tag}
        </span>
        <div className="card-body">
          <h5 className="card-title">
            <strong>{title}</strong>
          </h5>
          <p className="card-text">{description.split(' ').slice(0, 10).join(' ')}...</p>

          <div className="d-flex">
            <div>
              <FaEdit
                className="pointer"
                style={{ marginRight: '10px' }}
                type="button"
                data-bs-toggle="modal"
                data-bs-target={`#editNoteModal-${index}`} // Unique modal ID for each note
                onClick={loadNoteValues}
                data-toggle="tooltip"
                data-placement="top"
                title="Edit"
              />

              <FaTrash
                style={{ marginRight: '10px' }}
                className="pointer"
                type="button"
                data-toggle="tooltip"
                data-placement="top"
                title="Delete"
                data-bs-toggle="modal"
                data-bs-target={`#deleteModal-${index}`}
              />
            </div>

            {/* Expand icon shifted to the right */}
            <div className="ms-auto">
              <FaExpandAlt 
              className="pointer"
              data-toggle="tooltip"
              data-placement="top"
              title="See full note"
              onClick={()=>eref.current.click()} />
            </div>
          </div>
          <ExpandModal expandRef={eref}
          title={forNotes.notes[index].title}
          description={forNotes.notes[index].description}
          index={index}
          
          />
          <div className="modal" tabIndex="-1" id={`deleteModal-${index}`}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete your note ?</p>
                </div>
                <div className="modal-footer">
                  <button ref={deleteRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={() => {
                    forNotes.deleteNote(deleteId)
                    deleteRef.current.click()
                  }}>Delete</button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id={`editNoteModal-${index}`}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby={`staticBackdropLabel-${index}`}
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id={`staticBackdropLabel-${index}`}>
                    Edit your note
                  </h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor={`noteTitle-${index}`} className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`noteTitle-${index}`}
                        value={val.title}
                        onChange={handleOnChangeTitle}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor={`noteDescription-${index}`} className="form-label">
                        Description
                      </label>
                      <textarea
                        type="text"
                        rows={10}
                        className="form-control"
                        id={`noteDescription-${index}`}
                        value={val.description}
                        onChange={handleOnChangeDescription}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor={`noteTag-${index}`} className="form-label">
                        Tag
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`noteTag-${index}`}
                        value={val.tag}
                        onChange={handleOnChangeTag}
                      />
                      <div id="emailHelp" className="form-text">
                        Example: personal, official, work,...
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" ref={modalRef} className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

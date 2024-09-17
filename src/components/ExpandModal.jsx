import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

export default function ExpandModal(props) {
    const {expandRef,title,description,tag,index} = props
    const notes = useContext(NoteContext)
    return (
        <div>

            <button type="button" className="visually-hidden" data-bs-toggle="modal" data-bs-target={`#expandModal-${index}`} ref={expandRef} aria-hidden='true'>
                Launch demo modal
            </button>

            <div className="modal fade" id={`expandModal-${index}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            
                            <p>{description}</p>
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

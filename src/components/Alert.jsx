import React from 'react'

export default function Alert(props) {
    
    
    return (
        props.alert&&<div>
            <div className={`alert alert-success alert-dismissible fade show text-center`} role="alert">
               <strong>{props.alert}</strong>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
    )
}

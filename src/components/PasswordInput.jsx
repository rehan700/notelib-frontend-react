import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa"
export default function PasswordInput(props) {
  const [pass, setPass] = useState(true)
  let { password,inputName } = props
  return (
    <div>
      <div className="input-group mb-3" style={{ alignItems: 'center' }}>
        <input type={!pass ? 'text' : 'password'} name={inputName} value={password} 
        onChange={props.handleOnChange} className="form-control" placeholder="" aria-label="Recipient's username" aria-describedby="basic-addon2" />
        <button className='btn btn-outline-secondary' type="button" id={`button-addon-${inputName}`} onClick={() => setPass(pass === true ? false : true)}>{pass ? <FaEyeSlash /> : <FaEye />}
        </button>


      </div>
    </div>
  )
}

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

export default function About() {
  const [data, setData] = useState([])
  const [email,setEmail]=useState('')
  useEffect(() => {
    const callData=()=>{
      axios.get('http://localhost:3000/api/test')
      .then(response => {
        setData(response.data.articles)
      }).catch(err => {
        console.log(err)
      })
    }
 callData()


  },[])
  const getUserDetails = () => {
    axios.post('/api/auth/getuser', {},{
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
        'Content-Type': 'application/json'
      }
    })
      .then((res) =>
        setEmail(res.data.email)
      )
      .catch((err) => console.error(err));
  }
  const handleUser=(i,id)=>{
    const val=document.getElementById(`checkInput-${i}`)
    if (val.checked) {
      getUserDetails()
      axios.post('http://localhost:3000/api/test/updatefile',{email,flag:true,id})
      .catch(err => {
        console.log(err)
      })
    } else {
      console.log("Checkbox is not checked")
      setEmail('')
      axios.post('http://localhost:3000/api/test/updatefile',{email,flag:false,id})
      .catch(err => {
        console.log(err)
      })
    }
  }
  return (
    <div className='container'>
      {localStorage.getItem('auth-token')?<table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Check</th>
            <th scope="col">Name</th>
           
          </tr>
        </thead>
        <tbody>

          
          { data.map((e, index) => {
            return (
              <tr key={index}>
                <td><div className="form-check">
                  <input className="form-check-input"
                   type="checkbox"
                   value="" 
                   id={`checkInput-${index}`} 
                   disabled={e.check.user===email && e.check.selected}
                   onClick={()=>handleUser(index,e.id)} />
                </div></td>
                <td>{e.name}</td>
              </tr>

            )


          })}

        </tbody>
      </table>:<p>please login or signup first</p>}
    </div>
  )
}

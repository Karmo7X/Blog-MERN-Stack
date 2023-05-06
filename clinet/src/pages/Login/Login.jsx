import React, { useContext, useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../component/context/authContext'
const Login = () => {
  const [inputs , setInputs]= useState({
    username:"",
   
    password:"",

  })

  const handleChange = (e) =>
  {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const [err,setError]=useState(null)
  const navigate =useNavigate()
  const {login}=useContext(AuthContext)
  
  const handleSubmit = async(e)=>
    {
      e.preventDefault()
      try{
        await login(inputs)
       navigate("/")
      }
      catch(err)
      {
        setError(err.response.data);
      }
    }
  return (
      <div className="container">
        <div className="login d-flex flex-column  align-items-center justify-content-center ">
           <h1 className='fw-bold'>Login</h1>
           <form action="" className='d-flex flex-column  '>
            <input type="text"  placeholder='User Name' className='mt-4' name='username'  onChange={handleChange} />
            <input type="password" placeholder='Password'className='mt-4' name='password' onChange={handleChange}/>
            <button className='btn  mt-4' onClick={handleSubmit}>Login</button>
            {err && <p>{err}</p>}
            <span>Don't you have an account? <Link to="/register">Register</Link></span>

           </form>
        </div>
      </div>
    
  )
}

export default Login

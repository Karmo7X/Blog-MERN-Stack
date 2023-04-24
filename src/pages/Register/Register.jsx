import React, { useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./register.css"
import axios from 'axios'
const Register = () => {
  const [inputs , setInputs]= useState({
    username:"",
    email:"",
    password:"",

  })

  const handleChange = (e) =>
  {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const [err,setError]=useState(null)
  const navigate =useNavigate()
  const handleSubmit = async(e)=>
    {
      e.preventDefault()
      try{
        await axios.post("http://localhost:5000/api/auth/register",inputs);
         navigate("/login")
      }
      catch(err)
      {
        setError(err.response.data);
      }
    }
  return (
      <div className="container">
        <div className="register d-flex flex-column  align-items-center justify-content-center ">
           <h1 className='fw-bold'>Register</h1>
           <form action="" className='d-flex flex-column  '>
            <input type="text"  placeholder='User Name' className='mt-4' required name='username'  onChange={handleChange}/>
            <input type="email" placeholder='Email' className='mt-4' required name='email' onChange={handleChange}/>
            <input type="password" placeholder='Password'className='mt-4' required name='password' onChange={handleChange}/>
            <button className='btn  mt-4' onClick={handleSubmit}>Register</button>
            {err && <p>{err}</p>}
            <span>Don't you have an account? <Link to="/login">Login</Link></span>

            
           </form>
        </div>
      </div>
   
  )
}

export default Register

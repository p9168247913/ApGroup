import React, { useState } from 'react'
import "./login.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const initialState = {
    email : "",
    password : ""
}

const Login = () => {
    const [user, setUser] = useState(initialState)
    const navigate = useNavigate()
    const handelInputChange = (e) =>{
        const {name, value} = e.target;
        setUser({...user, [name] : value})
    }

    const handelInputSubmit = (e) =>{
        e.preventDefault();
        if(user.email === "admin@admin.com" && user.password === "password"){
            alert("Login Sucessfully!")
            navigate("/dashboard")
        }else{
            alert("Please Enter Correct Email and password")
        }
        
    }
  return (
    <div className='login-container'>
        <form onSubmit={handelInputSubmit}>
            <input type="text" placeholder='Enter Email' name='email' value={user.email} onChange={handelInputChange}/>
            <input type="password" placeholder='Enter Password' name='password' value={user.password} onChange={handelInputChange}/>
            <input type="submit" />
        </form>
    </div>
  )
}

export default Login
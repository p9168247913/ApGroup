import React, { useState } from 'react';
import "./addEmployee.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialState = {
  firstName : "",
  lastName : "",
  email : "",
  phone : "",
  company : ""
}

const AddEmployee = () => {
  const [userInfo, setUserInfo] = useState(initialState);
  const navigate = useNavigate()
  const handelAddEmployee = (e) =>{
    const {name, value} = e.target;
    setUserInfo({...userInfo, [name] : value})
  }

  const handelAddEmployeeFormSubmit = (e) =>{
    e.preventDefault();
    axios.post("http://localhost:5000/employee/add", userInfo).then(res=>{
      alert("Employee Added Sucessfully!")
      navigate("/dashboard")
    }).catch(err=>{
      console.log(err);
    })
    setUserInfo(initialState)
  }
  return (
    <div className='Add_Employee__container'>
      <form onSubmit={handelAddEmployeeFormSubmit}>
        <input type="text" required placeholder='Enter First Name' name='firstName' value={userInfo.firstName} onChange={handelAddEmployee}/>
        <input type="text" required placeholder='Enter Last Name' name='lastName'value={userInfo.lastName} onChange={handelAddEmployee}/>
        <input type="text" required placeholder='Enter Email' name='email' value={userInfo.email} onChange={handelAddEmployee}/>
        <select name="company" required value={userInfo.company} onChange={handelAddEmployee}>
          <option value="">Select Company</option>
          <option value="Microsoft">Microsoft</option>
          <option value="Google">Google</option>
          <option value="Apple">Apple</option>
        </select>
        <input type="text" required placeholder='Enter Mobile Number' name='phone' value={userInfo.phone} onChange={handelAddEmployee}/>
        <input type="submit" value="Add Employee" />
      </form>
    </div>
  )
}

export default AddEmployee
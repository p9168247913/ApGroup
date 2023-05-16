import React, { useEffect, useState } from 'react';
import "./editEmployee.css"
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditEmployee = () => {
  const { id } = useParams();
  const [singleEmployee, setSingleEmployee] = useState({})
  const navigate = useNavigate()

  const handelUpdateEmployee = (e) =>{
    const {name, value} = e.target;
    setSingleEmployee({...singleEmployee, [name] : value})
  }

  const handelUpdateEmployeeFormSubmit = (e) =>{
    e.preventDefault()
    axios.patch(`http://localhost:5000/employee/update/${id}`, singleEmployee).then(res=>{
      alert("Data Update Sucessfully!")
      navigate("/dashboard")
    }).catch(err=>{
      console.log(err);
    })
  }

  useEffect(() => {
    axios.get(`http://localhost:5000/employee/${id}`).then(res => {
      setSingleEmployee(res.data);
    })
  }, [id])
  return (
    <div className='Add_Employee__container'>
      <form onSubmit={handelUpdateEmployeeFormSubmit}>
        <input type="text" placeholder='Enter First Name' name='firstName' value={singleEmployee.firstName} onChange={handelUpdateEmployee} />
        <input type="text" placeholder='Enter Last Name' name='lastName' value={singleEmployee.lastName} onChange={handelUpdateEmployee} />
        <input type="text" placeholder='Enter Email' name='email' value={singleEmployee.email} onChange={handelUpdateEmployee} />
        <select name="company" required value={singleEmployee.company} onChange={handelUpdateEmployee}>
          <option value="">Select Company</option>
          <option value="Microsoft">Microsoft</option>
          <option value="Google">Google</option>
          <option value="Apple">Apple</option>
        </select>
        <input type="text" required placeholder='Enter Mobile Number' name='phone' value={singleEmployee.phone} onChange={handelUpdateEmployee}/>
        <input type="submit" value="Update Employee" />
      </form>
    </div>
  )
}

export default EditEmployee
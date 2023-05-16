import React, { useState } from 'react'
import "./addCompany.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const initialState = {
  companyName : "",
  logoUrl : "",
  companyEmail : "",
  websiteLink : "",
}

const AddCompany = () => {
  const [companyInfo, setCompanyInfo] = useState(initialState);
  const navigate = useNavigate()

  const handelAddCompany = (e) =>{
    const {name, value} = e.target;
    setCompanyInfo({...companyInfo, [name] : value})
  }

  const handelAddCompanyFormSubmit = (e) =>{
    e.preventDefault();
    axios.post("http://localhost:5000/company/add", companyInfo).then(res=>{
      alert("Company Added Sucessfully!")
      navigate("/companydashboard")
    }).catch(err=>{
      console.log(err);
    })
    setCompanyInfo(initialState)
  }
  return (
    <div className='Add_Company__container'>
      <form onSubmit={handelAddCompanyFormSubmit}>
        <input type="text" required placeholder='Enter Company Logo Url' name='logoUrl'value={companyInfo.lastName} onChange={handelAddCompany}/>
        <input type="text" required placeholder='Enter Company Name' name='companyName' value={companyInfo.companyName} onChange={handelAddCompany}/>
        <input type="text" required placeholder='Enter Company Email' name='companyEmail' value={companyInfo.email} onChange={handelAddCompany}/>
        <input type="text" required placeholder='Enter Website Link' name='websiteLink' value={companyInfo.phone} onChange={handelAddCompany}/>
        <input type="submit" value="Add Company" />
      </form>
    </div>
  )
}

export default AddCompany
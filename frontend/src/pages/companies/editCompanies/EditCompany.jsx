import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditCompany = () => {
  const { id } = useParams();
  const [singleCompany, setSingleCompany] = useState({})
  const navigate = useNavigate()

  const handelUpdateCompany = (e) =>{
    const {name, value} = e.target;
    setSingleCompany({...singleCompany, [name] : value})
  }

  const handelUpdateCompanyFormSubmit = (e) =>{
    e.preventDefault()
    axios.patch(`http://localhost:5000/company/update${id}`, singleCompany).then(res=>{
      alert("Company Update Sucessfully!")
      navigate("/companydashboard")
    }).catch(err=>{
      console.log(err);
    })
  }

  useEffect(() => {
    axios.get(`http://localhost:3030/companies/${id}`).then(res => {
      setSingleCompany(res.data);
    })
  }, [id])

  return (
    <div className='Add_Company__container'>
      <form onSubmit={handelUpdateCompanyFormSubmit}>
        <input type="text" required placeholder='Enter Company Logo Url' name='logoUrl'value={singleCompany.logoUrl} onChange={handelUpdateCompany}/>
        <input type="text" required placeholder='Enter Company Name' name='companyName' value={singleCompany.companyName} onChange={handelUpdateCompany}/>
        <input type="text" required placeholder='Enter Company Email' name='companyEmail' value={singleCompany.companyEmail} onChange={handelUpdateCompany}/>
        <input type="text" required placeholder='Enter Website Link' name='websiteLink' value={singleCompany.websiteLink} onChange={handelUpdateCompany}/>
        <input type="submit" value="Update Company" />
      </form>
    </div>
  )
}

export default EditCompany
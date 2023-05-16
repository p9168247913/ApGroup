import React, { useCallback, useEffect, useState } from 'react'
import "./companyDashboard.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CompanyDashboard = () => {
  const [companyData, setCompanyData] = useState([])
  const navigate = useNavigate();

  /* Delete Employee When user click delete button */
  const handelDeleteEployee = (id) => {
    axios.delete(`http://localhost:5000/company/delete/${id}`).then(res => {
      getDataFromAPI()
    }).catch(err => {
      console.log(err);
    })
  }

  //Geeting Data when user came here (this page) first Time
  const getDataFromAPI = useCallback(() => {
    axios.get("http://localhost:5000/company").then(res => {
      setCompanyData(res.data)
    }).catch(err => {
      console.log(err);
    })
  },[])

  useEffect(()=>{
    getDataFromAPI()
  },[getDataFromAPI])

  return (
    <div className='dashboard__container'>
      <div className='title'>
        <h2>Company Management Software</h2>
        <button onClick={()=>navigate("/dashboard")}>Employee Dashboard</button>
      </div>
      <div>
        <button className='addEmployee__btn' onClick={() => navigate("/addcompany")}>Add Company</button>
        <button onClick={() => navigate("/")}>Logout</button>
      </div>

      {
        companyData && <>

          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Company Logo</th>
                <th>Company Name</th>
                <th>Email</th>
                <th>Website</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companyData.map((company, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td><img width="100px" height="100px" src={company.logoUrl} alt={`${company.companyName}__logo`} /></td>
                  <td>{company.companyName}</td>
                  <td>{company.companyEmail}</td>
                  <td className='websiteLink'>
                    <Link to={company.websiteLink} target='_blank'>{company.websiteLink}</Link>
                  </td>
                  <td className='modify__btn__dash'>
                    <Link to={`/editcompany/${company._id}`}>Edit</Link>
                    <button onClick={() => handelDeleteEployee(company._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      }

    </div>
  )
}

export default CompanyDashboard
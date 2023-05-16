import React, { useCallback, useEffect, useState } from 'react';
import "./employeesDashboard.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeesDashboard = () => {
  const [emaployeeData, setEmployeeData] = useState([])
  const navigate = useNavigate();

  //Calculating Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = emaployeeData?.slice(startIndex, endIndex);


  /* Previous and Next button Cliking */
  const handelPrevClicking = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handelNextClicking = () => {
    if (currentPage < emaployeeData.length / itemsPerPage) {
      setCurrentPage(currentPage + 1)
    }
  }


  /* Delete Employee When user click delete button */
  const handelDeleteEployee = (id) => {
    axios.delete(`http://localhost:5000/employee/delete/${id}`).then(res => {
      getDataFromAPI()
    }).catch(err => {
      console.log(err);
    })
  }

 

  //Geeting Data when user came here (this page) first Time
  const getDataFromAPI = useCallback(() => {
    axios.get("http://localhost:5000/employee").then(res => {
      setEmployeeData(res.data)
    }).catch(err => {
      console.log(err);
    })
  },[])



 

  useEffect(() => {
    getDataFromAPI()
  }, [getDataFromAPI])





  return (
    <div className='dashboard__container'>
      <div className='title'>
        <h2>Employee Management Software</h2>
        <button onClick={()=>navigate("/companydashboard")}>Company Dashboard</button>
      </div>
      <div>
        <button className='addEmployee__btn' onClick={() => navigate("/addemployee")}>Add Employee</button>
        <button onClick={() => navigate("/")}>Logout</button>
      </div>

      {
        currentData && <>

          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Mobile Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((employee, index) => (
                <tr key={index}>
                  <td>{startIndex + index + 1}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.company}</td>
                  <td>{employee.phone}</td>
                  <td className='modify__btn'>
                    <Link to={`/editemployee/${employee._id}`}>Edit</Link>
                    <button onClick={() => handelDeleteEployee(employee._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      }

      <div className='btn__prev_And_next'>
        <button onClick={handelPrevClicking} disabled={currentPage === 1}>Prev</button>
        <p>{currentPage}</p>
        <button onClick={handelNextClicking} disabled={currentPage === Math.ceil(emaployeeData.length / itemsPerPage)}>Next</button>
      </div>
    </div>
  )
}

export default EmployeesDashboard





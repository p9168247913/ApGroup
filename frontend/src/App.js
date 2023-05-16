import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import EmployeesDashboard from './pages/employees/employeesDashboard/EmployeesDashboard';
import AddEmployee from './pages/employees/addemployee/AddEmployee';
import EditEmployee from './pages/employees/editemployee/EditEmployee';
import AddCompany from './pages/companies/addCompanies/AddCompany';
import EditCompany from './pages/companies/editCompanies/EditCompany';
import CompanyDashboard from './pages/companies/companiesDashboard/CompanyDashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/dashboard' element={<EmployeesDashboard />}/>
        <Route path='/addemployee' element={<AddEmployee />}/>
        <Route path='/editemployee/:id' element={<EditEmployee />}/>
        <Route path='/companydashboard' element={<CompanyDashboard />}/>
        <Route path='/addcompany' element={<AddCompany />}/>
        <Route path='/editcompany/:id' element={<EditCompany />}/>
      </Routes>
    </div>
  );
}

export default App;

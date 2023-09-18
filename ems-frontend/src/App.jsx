import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponents from './components/ListEmployeeComponents'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent';
import ListDepartmentComponent from './components/ListDepartmentComponent'
import DepartmentComponent from './components/DepartmentComponent'
import Background from './components/Background'; // Adjust the path accordingly



function App() {

  // This is where your import your components that you components that you create
  // To use BrowseRouter, Routes, and Route you have to install the react-router-dom dependency. What it does is allow the components to be mpped to  url esstentially the component is called when you go to the end point
  return (
    <>

      <BrowserRouter>

        <HeaderComponent />

        <Routes>
          <Route path='/' element={<ListEmployeeComponents />} />
          {/* http://localhost:3000 is what it's mapped to */}
          <Route path='/employees' element={<ListEmployeeComponents />} />
          {/* http://localhost:3000/employees is the url it's mapped to */}
          <Route path='/add-employee' element={<EmployeeComponent />} />
          {/* http://localhost:3000/add-employee is the url it's mapped to */}
          {/* 
          in ListEmployeeComponents.jsx addNewEmployee function is ran when the addemployee button is clicked. the addnewemplyee function navigates to the endpoint /add-employee which then runs the EmployeeCopnent. The end point /add-employee is mapped to the EmployeeCompnent class */}


          <Route path='/edit-employee/:id' element={<EmployeeComponent />} />
          {/* http://localhost:3000/edit-employee/id is the url it's mapped to */}
          <Route path='/departments' element={<ListDepartmentComponent />} />
          {/* http://localhost:3000/departments */}
          <Route path='/add-department' element={<DepartmentComponent />} />
          {/* http://localhost:3000/add-department */}
          <Route path='/edit-department/:id' element={<DepartmentComponent />} />
          {/* http://localhost:3000/edit-department */}
        </Routes>
        <FooterComponent />
        <Background />
      </BrowserRouter>
    </>
  )



}

export default App

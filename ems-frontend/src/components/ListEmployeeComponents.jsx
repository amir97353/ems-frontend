import React, { useState } from 'react'
// The above allows us to use useState hook
import { useEffect } from 'react'
// Use effect is what used to use the use state to get the get request
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import ZeldaSound from './ZeldaSound.mp3'

// useNavigate is a feature of the react-router-dom library, which is commonly used for managing routing and navigation in React applications.

const ListEmployeeComponents = () => {

    const [employees, setEmployees] = useState([])
    // This line initializes a state variable named employees and a function named setEmployees to update that state variable. useState([]) sets the initial value of employees to an empty array.
    const navigator = useNavigate()
    //Navigator is put in this variable so it can be used inside the function addnewEmployee
    useEffect(() => {

        // Use effect is what used to use the use state to get the get request
        getAllEmployees()

    }, [])

    //Get all employees was made to be a seperare function so it can be used in the useEffect above and the removeEmployee function. To list all the employees
    function getAllEmployees() {
        listEmployees().then((response) => {
            //List all employees  is the function in employee Service that makes the get request to the base url

            setEmployees(response.data)

            //This function comes from the the useState and sets the employee variable to the data from the listAll employees function
        }).catch(error => {
            console.error(error)


            //This function sets the varibale employees to the data from the  get request in employeeser

        })
    }



    //The above stores the response from listEmployees inside the employees varible using the setEmployees function whihch comes form the usestate.
    function addNewEmployee() {
        navigator('/add-employee')
    }
    //Above the function addNewEmployee is ran when the button add employee is clicked. Then inside the apps.jsx file the  then end point /add-employee is mapped to the EmployeeCompnent class
    // in ListEmployeeComponents.jsx addNewEmployee function is ran when the addemployee button is clicked. the addnewemplyee function navigates to the endpoint /add-employee which then runs the EmployeeCopnent. The end point /add-employee is mapped to the EmployeeCompnent class 


    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)
        // console.log(id)
        // Whenever the update button is clicked it runs the updateEmployee which navigates to the edit/employee endpoint
        // it also grabs the id
    }

    function removeEmployee(id) {
        console.log(id);
        deleteEmployee(id).then((response) => {
            getAllEmployees()
            //Get all employees is being used here to renew the list of employees after the delete was made. Getallemployees function runs listAllEmployees from EmployeeService that makes a get request to the url. GetAllemployees stores that data in the employee variable using the usestate function setEmployees. So after the delete is made getEmployees is ran in order to set the updated data excluding the deleted person in to the employee variable which is made viewable in the card using the map method on line 84
        }).catch(error => {
            console.error(error)
        })
        // When the delte button is clicked it runs the removeEmplyee function. The removeEmployee function runs the deleteEmployee function from EmployeeService that makes a delete request to the base url.
    }

    function play() {
        new Audio(ZeldaSound).play()
        //This is the function you make for the audio to play
    }


    return (
        // For the table to register everything needs to be inside the table tags
        <div className='container'>
            {/* Boostrap makes this a container by giving tit the clasname container */}
            <h2 className='text-center'>List of Employees</h2>
            <button
                className="btn glow-on-hover"
                style={{ color: 'white' }}
                onClick={() => {
                    play(); // Call the play function when the button is clicked
                    addNewEmployee(); // Call your addNewEmployee function
                }}
            >
                Add Employee
            </button>


            <table className='table table-striped table-bordered'>
                {/* Since boostarp is installed the class name table makes it a table striped with a border */}
                <thead>
                    <tr>
                        {/* These are the row titles */}
                        <th>Employee id</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email Id</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        //Since the response from listemployees is stored in the employees variable you can use it in the table below.
                        // This is the body data that comes from the array object that is declared above
                        employees.map(employee =>
                            <tr key={employee.id}>
                                {/* React uses the keys to efficiently update and re-render the list when changes occur */}
                                {/* Without keys, React might have difficulty distinguishing between different items in the list. */}
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button
                                        className="btn glow-on-hover"
                                        style={{ color: 'white' }}
                                        onClick={() => {
                                            play(); // Call the play function when the button is clicked
                                            updateEmployee(employee.id); // Call the updateEmployee function with the employee's ID
                                        }}
                                    >
                                        Update
                                    </button>

                                    {/* When the button is clicked it grabs the employee id */}
                                    <button
                                        className="btn glow-on-hover"
                                        onClick={() => {
                                            play(); // Call the play function when the button is clicked
                                            removeEmployee(employee.id); // Call the removeEmployee function with the employee's ID
                                        }}
                                        style={{ marginLeft: '10px', color: 'white' }}
                                    >
                                        Delete
                                    </button>

                                    {/* // When the delte button is clicked it runs the removeEmplyee function. The removeEmployee function runs the deleteEmployee function from EmployeeService that makes a delete request to the base url. */}
                                </td>

                            </tr>)
                        // when the add employee is clicked it takes you to the /add-employee endpoint. When you click the update button it sends you to the /edit-employee/${id} endpoint. However both endpoints run the EmployeeComponent. Edit employee gets the id and addemployee does not
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponents
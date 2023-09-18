
import React, { useState, useEffect } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom';
import { getAllDepartments } from '../services/DepartmentService';
import ZeldaSound from './ZeldaSound.mp3'


const EmployeeComponent = () => {

    // When using first state the first arguement is the variable where the data is stored. The second srguement is the function that would be used to make the changes to the first arguement variable

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [departmentId, setDepartmentId] = useState('')
    const [departments, setDepartments] = useState([])

    useEffect(() => {
        //Stores the departments data  from getAllDepartments in departments variable
        getAllDepartments().then((response) => {
            setDepartments(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])

    const { id } = useParams();

    // console.log(id)
    //User Params stores id from the url inisde the id that's inside the brackets
    // when the add employee is clicked it takes you to the /add-employee endpoint. When you click the update button it sends you to the /edit-employee/${id} endpoint. However both endpoints run the EmployeeComponent. Edit employee gets the id and addemployee does not. UseParams gets the id from ListEmployeeComponents by clicking the submit buton on that page and running the function updateEmployee


    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: ''
    })

    const navigator = useNavigate();

    useEffect(() => {

        if (id) {

            //When you click the update button it grabs the id using the updateEmployee function in ListEmployeeComponents then the fields in the update form are populated with the user based on that id. We're using the getEmployee function in employeeService to get the users info. and we're using the useState up top for setting the changes to firstName, lastName, and email. The value is set to whatver the state is in the card body so that's why the list is populated based on the user.
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setDepartmentId(response.data.departmentId)
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])

    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if (validateForm()) {
            //validateForm function is ran first to make sure the fields arent't empty. if validateForm is true then the employee is saved to the database

            const employee = { firstName, lastName, email, departmentId }

            //This line stores the updated fields in the employee variable so it can be used in employeebservice to make a post request to store it in the dtatabase
            // console.log(employee);
            console.log(employee)



            // In listComponents clicking the add employee button or the update button runs the updateEmployee and the addEmployee functions.These functions navigate you to the end point  '/add - employee' and '/edit - employee / ${ id }' Both of these endpoints run the EmployeeComponent.However if the updateEmployee function is ran by clicking on the update button then the id is grabbed because it is an argument in the updateEmployee function. Below this is saying that if the id is present which means the update button was clicked then run the function updateEmployee function from EmployeeService.If it is not present run the createEmployee function from EmployeeService that takes an employee object as an argument.

            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createEmployee(employee).then((response) => {
                    // The above line is using the function createEmployee from EmployeeeService to make a post request to the database using the employee varibale declared above
                    // console.log(response.data)
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }


    //In summary  when the user types something into the card fields the function in the onChange event is triggered. These functions that are listed above hanldeFirstName, hanldeLastName,hanldeEmail. The functions set the value of the firstame, lastName, email to whatever is input in the text. The updated values are then stored in the employee variable in the savedEmployee function. The employee value is then used as an argurment in the createEmplyee function and the createemplyee function makes a postrequest to the database which adds the enew employee. All of this occurs when the button below on line 93 is clicked

    function validateForm() {
        let valid = true;
        // This variable is used within the function to keep track of whether the form is valid or not by changing its value based on the validation checks.

        const errorsCopy = { ...errors }
        //errors comes from the use state above
        // { ...errors } is a JavaScript expression that is used to create a shallow copy of an object. This is often used when you want to duplicate an object and make changes to the copy without modifying the original object

        if (firstName.trim()) {
            //Checks if firstname is empty. if it is is set error.firstname to anempty String so nothing appears for the error message
            errorsCopy.firstName = '';
        } else {
            //if FirstName is empty then set error.copFirstName to the erro message 'First name is required'
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        if (departmentId) {
            errorsCopy.department = ''
        } else {
            errorsCopy.department = 'Select Department'
            valid = false
        }

        setErrors(errorsCopy);
        // setErrors comes from the usestate on line 12. setErrors updates the errors fields firstName,lastName,email based on the if/else statments since errorsCopy is = to a copy of error

        return valid;
        // So, all of these conditions must be true for the form to be considered valid, and for valid to return true. If any one of them is false, the form will be considered invalid, and valid will be set to false.

    }
    // The page title changes depeneding on whether the id id present
    function pageTitle() {

        // Check the value of id
        if (id) {

            // The id is coming from the useParams hook. 
            // when the add employee is clicked it takes you to the /add-employee endpoint. When you click the update button it sends you to the /edit-employee/${id} endpoint. However both endpoints run the EmployeeComponent. Edit employee gets the id and addemployee does not. UseParams gets the id from ListEmployeeComponents by clicking the submit buton on that page and running the function updateEmployee. If would have an id if the update button was clicked and it would not if the add Employee button was clicked
            return <h2 className='text-center'>Update Employee</h2>
        } else {
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

    function play() {
        new Audio(ZeldaSound).play()
        //This is the function you make for the audio to play
    }

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        pageTitle()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee First Name'
                                    name='firstName'
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}

                                    // ? 'is-invalid' : '': This is a conditional (ternary) operator. It checks whether errors.firstName is truthy (non-empty because an error message is stored inside it based on the if statement). If errors.firstName is truthy (meaning there's an error for the first name), it adds the 'is-invalid' class to the className. If errors.firstName is falsy (empty), it adds an empty string, effectively not adding any additional class.

                                    // The onChange event handler expects a function as its value
                                    onChange={(e) => setFirstName(e.target.value)}

                                // onChange is an event in React that is triggered when the value of an input element (like a text input field) changes.
                                // onChange event for a text input is triggered whenever the user types or deletes a character in the input field. In other words, every keystroke or backspace action will trigger the event.
                                >
                                </input>
                                {errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div>}

                                {/* If errors.firstName is not empty (meanning it contains an error message based on the if statement), render a <div> element with the class 'invalid-feedback', and inside this <div>, display the error message stored in errors.firstName. */}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Last Name'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                >
                                </input>
                                {errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Email:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Email'
                                    name='email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </input>
                                {errors.email && <div className='invalid-feedback'> {errors.email} </div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Select Department:</label>
                                <select
                                    className={`form-control ${errors.department ? 'is-invalid' : ''}`}
                                    value={departmentId}
                                    onChange={(e) => setDepartmentId(e.target.value)}
                                >
                                    <option value="Select Department">Select Department</option>
                                    {
                                        departments.map(department =>
                                            <option key={department.id} value={department.id} > {department.departmentName}</option>
                                        )
                                    }
                                </select>
                                {errors.department && <div className='invalid-feedback'> {errors.department} </div>}
                            </div>
                            <button className='btn btn-success' onClick={saveOrUpdateEmployee} >Submit</button>
                        </form>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default EmployeeComponent

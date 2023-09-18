import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { deleteDepartment, getAllDepartments } from '../services/DepartmentService'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ZeldaSound from './ZeldaSound.mp3'

const ListDepartmentComponent = () => {


    const [departments, setDepartments] = useState([])
    const navigator = useNavigate()


    useEffect(() => {
        listOfDepartments()

    }, [])

    function listOfDepartments() {
        getAllDepartments().then((response) => {
            console.log(response.data);
            setDepartments(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function updateDepartment(id) {
        navigator(`/edit-department/${id}`)
    }

    // function removeDepartment(id) {
    //     //This function is being ran below and it runs the deleteDepartment from departmentService makes the delete
    //     deleteDepartment(id).then((response) => {
    //         console.log(response.data);
    //         listofDepartments()
    //         //list of departments is ran here to re-populate the list after the delete
    //     }).catch(error => {
    //         console.error(error)
    //     })
    // }



    function removeDepartment(id) {
        deleteDepartment(id).then((response) => {
            //This function is being ran below and it runs the deleteDepartment from departmentService makes the delete
            console.log(response.data);
            //list of departments is ran here to re-populate the list after the delete
            listOfDepartments();
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewDepartment() {
        navigator('/add-department')
    }
    function play() {
        new Audio(ZeldaSound).play()
        //This is the function you make for the audio to play
    }



    return (
        <div className='container'>
            <h2 className='text-center'>List of Departments</h2>
            <button
                className="btn glow-on-hover"
                style={{ color: 'white' }}
                onClick={() => {
                    play(); // Call the play function when the button is clicked
                    addNewDepartment(); // Call your addNewEmployee function
                }}
            >
                Add Department
            </button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Department Id</th>
                        <th>Department Name </th>
                        <th>Department Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        departments.map(department =>
                            <tr key={department.id}>
                                <td>{department.id}</td>
                                <td>{department.departmentName}</td>
                                <td>{department.departmentDescription}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            play(); // Call the play function when the button is clicked
                                            updateDepartment(department.id); // Call the updateDepartment function with the department's ID
                                        }}
                                        className="btn glow-on-hover"
                                        style={{ color: 'white' }}
                                    >
                                        Update
                                    </button>

                                    <button
                                        onClick={() => {
                                            play(); // Call the play function when the button is clicked
                                            removeDepartment(department.id); // Call the removeDepartment function with the department's ID
                                        }}
                                        className="btn glow-on-hover"
                                        style={{ marginLeft: '10px', color: 'white' }}
                                    >
                                        Delete
                                    </button>

                                </td>
                            </tr>
                        )
                    }
                </tbody>

            </table>
        </div>
    )
}

export default ListDepartmentComponent
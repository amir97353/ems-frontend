import React from 'react'
import { useState } from 'react'
import { createDepartment, getDepartmentById, updateDepartment } from '../services/DepartmentService'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import ZeldaSound from './ZeldaSound.mp3'


const DepartmentComponent = () => {

    const [departmentName, setDepartmentName] = useState('')
    const [departmentDescription, setDescriptionName] = useState('')
    const navigator = useNavigate()
    const { id } = useParams()


    useEffect(() => {
        getDepartmentById(id).then((response) => {
            setDepartmentName(response.data.departmentName)
            setDescriptionName(response.data.departmentDescription)
        }).catch(error => {
            console.log(error);
        })
    }, [id])



    function saveOrUpdateDepartment(e) {
        e.preventDefault();

        const department = { departmentName, departmentDescription }

        // console.log(department);

        if (id) {
            updateDepartment(id, department).then((response) => {
                console.log(response.data);
                navigator('/departments')
            }).catch(error => {
                console.error(error)
            })

        } else {
            createDepartment(department).then((response) => {
                console.log(response.data);
                navigator('/departments')

            }).catch(error => {
                console.error(error);
            })

        }

    }
    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Department</h2>
        } else {
            return <h2 className='text-center'>Add Department</h2>
        }
    }

    function play() {
        new Audio(ZeldaSound).play()
        //This is the function you make for the audio to play
    }

    return (
        <div className='container'><br /><br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        pageTitle()
                    }

                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Department Name:</label>
                                <input
                                    type="text"
                                    name='departmentName'
                                    placeholder='Enter Department Name'
                                    value={departmentName}
                                    onChange={(e) => setDepartmentName(e.target.value)}
                                    //This set department comes from the useState above. On change sets the value based on whatever is typed in and then sets that value to departmentname which is also in the use state.
                                    className='form-control'
                                >
                                </input>
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Department Description:</label>
                                <input
                                    type="text"
                                    name='departmentDescription'
                                    placeholder='Enter Department Name'
                                    value={departmentDescription}
                                    onChange={(e) => setDescriptionName(e.target.value)}
                                    //This set department comes from the useState above. On change sets the value based on whatever is typed in and then sets that value to departmentname which is also in the use state.
                                    className='form-control'
                                >
                                </input>
                            </div>
                            <button
                                className="btn btn-success mb-2"
                                onClick={(e) => {
                                    play(); // Call the play function when the button is clicked
                                    saveOrUpdateDepartment(e); // Call the saveOrUpdateDepartment function
                                }}
                            >
                                Submit
                            </button>

                        </form>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default DepartmentComponent
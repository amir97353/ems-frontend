import axios from "axios"

const REST_API_BASE_URL = 'http://localhost:8080/api/employees'
// Here, a constant named REST_API_BASE_URL is declared and set to the base URL of the RESTful API you want to interact with. This API is expected to provide employee data.
//This is the endpoint for the controller in Java in my employee controller on line 14 @RequestMapping("/api/employees"). @RequestMapping makes api/employees the base uel for that controller.

export const listEmployees = () => axios.get(REST_API_BASE_URL)
    // This code exports a function named listEmployees. This function is meant to fetch a list of employees from the API.
     
export const createEmployee = (employee) => axios.post(REST_API_BASE_URL,employee)
//This function is used to make a post request to the base url that comes from the Java backend. Employee comes from the stored values from Employee conponents on line 30 where the user input update values are stored.

export const getEmployee = (employeeId) => axios.get(REST_API_BASE_URL + '/' + employeeId)
// This constructs the URL for the GET request by combining a base URL (REST_API_BASE_URL) with the employeeId


//The function returns a promise so whe you import it you have to use .then to view the results

// this code exports a function listEmployees that, when called, makes an HTTP GET request to the specified API endpoint (http://localhost:8080/api/employees) using Axios. It's designed to retrieve a list of employees from the API, and the caller of this function can handle the response as needed. Typically, you would use this function in a React or JavaScript application to fetch employee data from a server.

export const updateEmployee =(employeeId,employee) => axios.put(REST_API_BASE_URL + '/' + employeeId,employee)

// So, when you call updateEmployee(employeeId, employee), you need to provide the employeeId (the unique identifier of the employee you want to update) and the employee object (containing the updated information) as arguments to the function. The function then constructs the URL and sends a PUT request to the specified REST API endpoint to update the employee's information.

// employeeId: This parameter is expected to be the unique identifier of the employee whose information you want to update.
// employee: This parameter is expected to be an object containing the updated information for the employee.

export const deleteEmployee = (employeeId) => axios.delete(REST_API_BASE_URL + '/' + employeeId)
//Delete request based on the employee id using axios
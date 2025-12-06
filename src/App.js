import React, { useState, useEffect } from 'react';
import './App.css';
import { Employees } from './Employees';

function App() {
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    setEmployeeList(Employees);
  }, []);

  const handleEdit = (id) => {
    alert(`Edit employee with ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }
    const updatedList = employeeList.filter(employee => employee.id !== id);
    setEmployeeList(updatedList);
  };

  return (
    <div className="App">
      <div className="container mt-4">
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <h2>Employee List</h2>
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Position</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employeeList.map((employee, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2" onClick={ (e) => handleEdit(employee.id) }>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={ (e) => handleDelete(employee.id) }>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;

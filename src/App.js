import React, { useState, useEffect } from 'react';
import './App.css';
import { Employees } from './Employees';

function App() {
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    setEmployeeList(Employees);
  }, []);

  const handleAdd = () => {
    const name = prompt("Enter employee name:");
    const position = prompt("Enter employee position:");
    if (!name || !position) return;

    const newEmployee = {
      id: Date.now(), // unique ID
      name,
      position
    };

    setEmployeeList([...employeeList, newEmployee]);
  };

  const handleEdit = (id) => {
    const employeeToEdit = employeeList.find(emp => emp.id === id);
    if (!employeeToEdit) return;

    const newName = prompt("Enter new name:", employeeToEdit.name);
    const newPosition = prompt("Enter new position:", employeeToEdit.position);

    if (!newName || !newPosition) return;

    const updatedList = employeeList.map(emp =>
      emp.id === id ? { ...emp, name: newName, position: newPosition } : emp
    );

    setEmployeeList(updatedList);
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
          <div className="card-header d-flex justify-content-between align-items-center">
            <h2>Employee List</h2>
            <button className="btn btn-success" onClick={handleAdd}>Add Employee</button>
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

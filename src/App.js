import React, { useState, useEffect } from 'react';
import './App.css';
import { Employees } from './Employees';

function App() {
  const [employeeList, setEmployeeList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // "add" or "edit"
  const [currentEmployee, setCurrentEmployee] = useState({ id: null, name: "", position: "" });

  useEffect(() => {
    setEmployeeList(Employees);
  }, []);

  const openAddModal = () => {
    setModalType("add");
    setCurrentEmployee({ id: null, name: "", position: "" });
    setShowModal(true);
  };

  const openEditModal = (employee) => {
    setModalType("edit");
    setCurrentEmployee(employee);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!currentEmployee.name || !currentEmployee.position) return;

    if (modalType === "add") {
      const newEmployee = {
        id: Date.now(),
        name: currentEmployee.name,
        position: currentEmployee.position
      };
      setEmployeeList([...employeeList, newEmployee]);
    } else {
      const updatedList = employeeList.map(emp =>
        emp.id === currentEmployee.id ? currentEmployee : emp
      );
      setEmployeeList(updatedList);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    setEmployeeList(employeeList.filter(emp => emp.id !== id));
  };

  return (
    <div className="App">
      <div className="container mt-4">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h2>Employee List</h2>
            <button className="btn btn-success" onClick={openAddModal}>Add Employee</button>
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
                <tr key={employee.id}>
                  <td>{index + 1}</td>
                  <td>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => openEditModal(employee)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(employee.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalType === "add" ? "Add Employee" : "Edit Employee"}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentEmployee.name}
                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Position</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentEmployee.position}
                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, position: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

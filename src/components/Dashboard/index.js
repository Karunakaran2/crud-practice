import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Header from "./Header";
import Table from "./Table";
import EmployeeForm from "./Add";  // Use EmployeeForm (combined Add & Edit form)
import { employeesData } from '../../data';

const Dashboard = ({ setIsAuthenticated }) => {
    const [employees, setEmployees] = useState(employeesData);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('employees_data'));
        if (data && data.length > 0) {
            setEmployees(data);
        }
    }, []);

    const handleEdit = (id) => {
        const employee = employees.find((emp) => emp.id === id);
        if (employee) {
            setSelectedEmployee(employee);
            setIsEditing(true);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedEmployees = employees.filter((emp) => emp.id !== id);
                localStorage.setItem('employees_data', JSON.stringify(updatedEmployees));
                setEmployees(updatedEmployees);

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Employee has been deleted.',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };

    return (
        <div className="container">
            {!isAdding && !isEditing && (
                <>
                    <Header
                        setIsAdding={setIsAdding}
                        setIsAuthenticated={setIsAuthenticated}
                    />
                    <Table
                        employees={employees}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </>
            )}

            {(isAdding || isEditing) && (
                <EmployeeForm
                    employees={employees}
                    setEmployees={setEmployees}
                    setIsAdding={setIsAdding}
                    setIsEditing={setIsEditing}
                    selectedEmployee={isEditing ? selectedEmployee : null}
                />
            )}
        </div>
    );
};

export default Dashboard;

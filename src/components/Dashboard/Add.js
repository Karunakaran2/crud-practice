import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const EmployeeForm = ({
    employees,
    setEmployees,
    setIsEditing,
    setIsAdding,
    selectedEmployee = null
}) => {
    const isEdit = !!selectedEmployee;  // Check if it's edit mode

    // Form states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('');
    const [date, setDate] = useState('');

    // Pre-fill the form in edit mode
    useEffect(() => {
        if (isEdit) {
            setFirstName(selectedEmployee.firstName);
            setLastName(selectedEmployee.lastName);
            setEmail(selectedEmployee.email);
            setSalary(selectedEmployee.salary);
            setDate(selectedEmployee.date);
        }
    }, [isEdit, selectedEmployee]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !salary || !date) {
            return Swal.fire({
                icon: "error",
                title: "Error!",
                text: "All fields are required.",
                showConfirmButton: true,
            });
        }

        if (isEdit) {
            // Edit existing employee
            const updatedEmployee = {
                id: selectedEmployee.id,
                firstName,
                lastName,
                email,
                salary,
                date,
            };

            const updatedEmployees = employees.map((emp) =>
                emp.id === selectedEmployee.id ? updatedEmployee : emp
            );

            localStorage.setItem("employees_data", JSON.stringify(updatedEmployees));
            setEmployees(updatedEmployees);
            setIsEditing(false);

            Swal.fire({
                icon: "success",
                title: "Updated!",
                text: `${firstName} ${lastName}'s data has been updated.`,
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            // Add new employee
            const id = employees.length ? employees[employees.length - 1].id + 1 : 1;
            const newEmployee = {
                id,
                firstName,
                lastName,
                email,
                salary,
                date,
            };

            const newEmployees = [...employees, newEmployee];

            localStorage.setItem("employees_data", JSON.stringify(newEmployees));
            setEmployees(newEmployees);
            setIsAdding(false);

            Swal.fire({
                icon: "success",
                title: "Added!",
                text: `${firstName} ${lastName}'s data has been added.`,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div className="small-container">
            <form onSubmit={handleSubmit}>
                <h1>{isEdit ? "Edit" : "Add"} Employee</h1>

                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="salary">Salary</label>
                <input
                    type="number"
                    id="salary"
                    name="salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                />

                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <div style={{ marginTop: "30px" }}>
                    <input type="submit" value={isEdit ? "Update" : "Add"} />
                    <input
                        type="button"
                        value="Cancel"
                        className="muted-button"
                        style={{ marginLeft: "10px" }}
                        onClick={() => {
                            isEdit ? setIsEditing(false) : setIsAdding(false);
                        }}
                    />
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;

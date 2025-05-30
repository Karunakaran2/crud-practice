import React from "react";

const Table = ({ employees, handleEdit, handleDelete }) => {
    employees.forEach((employee, i) => {
        employee.id = i + 1;
    });

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: false
    });

    return (
        <div className="contain-table">
      <table className="striped-table table table-bordered table-hover table-responsive">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Salary</th>
                        <th>Date</th>
                        <th colSpan={2} className="text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (employees.map((employee, i) => (
                    <tr key={employee.id}>
                        <td>{i + 1}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>{formatter.format(employee.salary)}</td>
                        <td>{employee.date} </td>
                        <td className="text-right">
                            <button
                                onClick={() => handleEdit(employee.id)}
                                className="btn btn-primary button me-1 muted-button"
                            >
                                Edit
                            </button>
                        </td>
                        <td className="text-left">
                            <button
                                onClick={() => handleDelete(employee.id)}
                                className="btn btn-outline-danger button muted-button"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                    ))

                    ) : (
                        <tr>
              <td colSpan={7}>No Employees</td>
            </tr>
                    )} 
                </tbody>
            </table>
        </div>
    );
};

export default Table;
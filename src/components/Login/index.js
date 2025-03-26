import React, { useState } from "react";
import Swal from "sweetalert2";

const Login = ({ setIsAuthenticated }) => {

  const adminEmail = 'admin@gmail.com';
  const adminPass = 'passwd';

  const [email, setEmail] = useState('admin@gmail.com');
  const [pass, setPass] = useState('passwd');

  const handleLogin = e => {
    e.preventDefault();

    if (adminEmail === email && adminPass === pass) {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();

        },
        willClose: () => {
          localStorage.setItem('is_authenticated', true);
          setIsAuthenticated(true);
          Swal.fire({
            icon: 'success',
            title: 'Successfully Logged In',
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    }
    else {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Incorrect Email or Password',
            showConfirmButton: true,
          });
        },
      });
    }
  };

  return (
    <div className="container mt-5">
      <form
        onSubmit={handleLogin}
        className="shadow p-4 rounded bg-light"
        style={{ maxWidth: '400px', margin: '0 auto' }}
      >
        <h1 className="text-center mb-4">Admin Login</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-control"
            placeholder="admin@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter your password"
            value={pass}
            onChange={e => setPass(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;
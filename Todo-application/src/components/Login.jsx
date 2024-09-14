// Login.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = (values) => {
    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user exists and password matches
    const user = existingUsers.find(user => user.email === values.email);
    
    if (user && user.password === values.password) {
      login(values.email, values.password);
      setSuccessMessage('Login successful! Redirecting to Todo list...');
      setTimeout(() => {
        navigate('/todos');
      }, 2000);
    } else {
      alert('Invalid email or password');
    }
  };
  

  return (
    <div className="container mt-5">
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="mt-3">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>

            <button type="submit" className="btn btn-primary">Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;

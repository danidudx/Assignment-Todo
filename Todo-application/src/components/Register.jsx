// Register.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password must be 6 characters or more').required('Required'),
    name: Yup.string().required('Required'),
  });

  const handleSubmit = (values) => {
    login(values.email, values.password);
    setSuccessMessage('Signup successful! Redirecting to Todo list...');
    setTimeout(() => {
      navigate('/todos');
    }, 2000);
  };

  return (
    <div className="container mt-5">
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <Formik
        initialValues={{ email: '', password: '', name: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="mt-3">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <Field name="name" type="text" className="form-control" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

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

            <button type="submit" className="btn btn-primary">Sign Up</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;

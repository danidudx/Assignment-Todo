# Todo List Application

This is a simple Todo List application built with React and Tailwind CSS for managing daily tasks. 
The application includes user registration and login functionality, allowing users to maintain their task list and view it after logging in. The application stores users' data locally using `localStorage`.

## Features

- **User Registration**: Allows new users to sign up by providing an email, name, and password.
- **User Login**: Users can log in with their email and password.
- **Todo List Management**: Users can add, view, and manage their todo tasks.
- **Persistent User Session**: Uses local storage to persist user login across page reloads.
- **Form Validation**: Utilizes Formik and Yup for form validation.
- **Responsive Design**: Styled with Tailwind CSS to ensure responsiveness across devices.

## Tech Stack

- **React**: JavaScript library for building user interfaces.
- **Formik**: Form library to handle forms in React.
- **Yup**: Validation schema for form inputs.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: For navigating between different pages.
- **LocalStorage**: For storing user data and tasks.

## Application Routes

    /login - User login page
    /register - User registration page
    /todos - Main todo list page

## Authentication

The app uses a simple authentication method with localStorage. When a user registers or logs in, their credentials are stored in localStorage. The AuthContext manages the authentication state across the application.
Form Validation

Formik is used for handling form submissions, and Yup is integrated for form validation. Each form has specific validation rules (e.g., valid email format, required fields, minimum password length).

## Instructions

- cd todo-application
- npm install
- npm run dev


# MERN Auth Project

A full-stack user authentication system built with the MERN stack (MongoDB, Express, React, Node.js). Includes secure registration, login, email verification, and password reset — with transactional emails sent via the Brevo API.

**Live App:** [mern-auth-jade-xi.vercel.app](https://mern-auth-jade-xi.vercel.app)

## Features

- User registration and login with JWT-based authentication
- Secure password hashing (bcrypt)
- Email verification on signup
- Forgot password / reset password flow
- Transactional email delivery via Brevo HTTP API
- Deployed frontend and backend on Vercel

## Tech Stack

**Frontend**
- React
- Deployed on Vercel

**Backend**
- Node.js + Express
- MongoDB (Mongoose)
- JWT authentication, bcrypt password hashing
- Brevo API for email delivery (verification, password reset)

## Project Structure

MERN-AUTH-Project/
├── backend/ # Express API, auth logic, email service, MongoDB models
├── frontend/ # React client — login, register, forgot/reset password pages
└── .gitignore


## Getting Started

### Prerequisites
- Node.js installed
- MongoDB instance (local or Atlas)
- Brevo account and API key (for email sending)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BREVO_API_KEY=your_brevo_api_key


```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## License

ISC

# Bank Management System

A full-stack banking application built with React, Node.js, and Express that allows users to manage transactions and view account history.

## Features

- User profiles management
- Transaction history tracking
- Secure banking operations
- Responsive design with modern UI
- RESTful API backend

## Tech Stack

- Frontend: React, Redux
- Backend: Node.js, Express
- Database Configuration: MongoDB
- Styling: CSS

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add your environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Project Structure

- `server/` - Backend Node.js/Express server
  - `config/` - Database configuration
  - `models/` - MongoDB models
  - `routes/` - API routes
- `src/` - Frontend React application
  - `actions/` - Redux actions
  - `components/` - React components
  - `reducers/` - Redux reducers

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is licensed under the MIT License.

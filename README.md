# Expense Tracker API Server

This is a RESTful API server for tracking expenses and managing budgets. Built with Express, MongoDB (Mongoose), and JWT authentication.

## Features

- User registration and login (JWT-based)
- Rate limiting for login attempts
- Expense CRUD operations (create, read, update, delete)
- Budget management (monthly/yearly)
- User profile endpoint
- Input validation and sanitization
- Secure HTTP headers (Helmet)
- CORS support

## Tech Stack

- Node.js
- Express
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- express-validator
- rate-limiter-flexible
- Helmet
- CORS

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance

### Installation

1. Clone the repository:

   ```sh
   git clone <your-repo-url>
   cd expense-tracker/server
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/expense-tracker
   JWT_SECRET=your_jwt_secret
   ```

### Running the Server

```sh
npm run dev
```

The server will start on the port specified in `.env`.

## API Endpoints

### Auth

- `POST /api/auth/login` — Login with username and password
- `POST /api/auth/register` — Register a new user

### User

- `GET /api/users/profile` — Get user profile

### Expenses

- `POST /api/expenses` — Add expense
- `GET /api/expenses` — Get all expenses
- `GET /api/expenses/latest` — Get latest expenses
- `GET /api/expenses/:id` — Get expense by ID
- `PATCH /api/expenses/:id` — Update expense
- `DELETE /api/expenses/:id` — Delete expense

### Budgets

- `GET /api/budgets` — Get budget
- `PATCH /api/budgets` — Update budget

## Testing & Linting

- Lint: `npm run lint`
- (Add tests with Jest as needed)

## License

ISC

---

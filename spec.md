# Expense tracker API specs

## Authentication

- Tech: JWT

## Server Initialization and Setup

- Tech: Express, dotenv, cors,

## Testing

- Tech: Jest

## Linter

- Tech:

## Database

- Tech: Mongoose

### Connection

### Schemas

#### User

```js
{
    email: {type: string},
    password: {type: string},
    expenses: [{type: expense}],
    budget: {type: budget}

}
```

#### Expense

```js
{
    category: {type: category},
    description: {type: string},
    amount: {type: number},
    date: {type: date}, // maybe number

}
```

#### Budget

```js
{
    yearly: {type: number},
    monthly: {type: number},

}
```

## Endpoints

### Auth

- Login
- Register
- Profile/me

### My expenses

- Add my expense
- Delete my expense
- Update my expense
- Get my expenses(filter by category, date range, amount range)
- Get my expense by id
- Get lateset expenses
- Add budget
- Update budget

### My analytics

### Admin

- Get all users(filter by date range)
- Get users by Id
- Delete user
- Get all expenses(filter options)
- Get expense by id
-

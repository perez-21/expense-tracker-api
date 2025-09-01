const createExpenseValidationSchema = {
  category: {
    errorMessage: 'Invalid Category',
    notEmpty: true,
    isString: {options: true},
    trim: true,
    escape: true,
    isIn: {
      options: [["Groceries", "Leisure", "Utilities", "Clothing", "Health", "Electronics", "Internet", "Rent", "Vehicle", "Family", "Savings", "Transportation", "Home", "Other"]],
    }
  },
  description: {
    optional: true,
    isString: {options: true},
    trim: true,
    escape: true,
    isLength: {
      options: {
        max: 150,
      },
      errorMessage: 'Description must be no more than 150 characters',

    }
  }, 
  amount: {
    errorMessage: 'Invalid amount',
    notEmpty: {
      errorMessage: 'Amount is required',
    },
    isFloat: {
      options: {min: 0},
      errorMessage: 'Amount must be a positive number'
    },
    toFloat: true,
  },
  date: {
    errorMessage: 'Invalid date',
    notEmpty: {
      errorMessage: 'Date is required',
    },
    isISO8601: {
      errorMessage: 'Invalid date format',
    },
    toDate: true,
  }
}

const updateExpenseValidationSchema = {
  category: {
    errorMessage: 'Invalid Category',
    isString: {options: true},
    trim: true,
    optional: true,
    escape: true,
    isIn: {
      options: [["Groceries", "Leisure", "Utilities", "Clothing", "Health", "Electronics", "Internet", "Rent", "Vehicle", "Family", "Savings", "Transportation", "Home", "Other"]]
    }
  },
  description: {
    optional: true,
    isString: {options: true},
    trim: true,
    escape: true,
    isLength: 
    {
      options: {
        max: 150,
      },
      errorMessage: 'Description must be no more than 150 characters',

    }
  }, 
  amount: {
    errorMessage: 'Invalid amount',
    optional: true,
    isFloat: {
      options: {min: 0},
      errorMessage: 'Amount must be a positive number',
    },
    toFloat: true,
  },
  date: {
    errorMessage: 'Invalid date',
    optional: true,
    isISO8601: {
      errorMessage: 'Invalid date format',
    },
    toDate: true,
  }
}

module.exports = {createExpenseValidationSchema, updateExpenseValidationSchema};
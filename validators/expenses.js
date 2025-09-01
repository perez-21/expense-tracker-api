const expenseConstants = require('../constants/expense');

const createExpenseValidationSchema = {
  category: {
    errorMessage: 'Invalid Category',
    notEmpty: true,
    isString: {options: true},
    trim: true,
    escape: true,
    isIn: {
      options: [expenseConstants.CATEGORIES],
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
      options: [expenseConstants.CATEGORIES]
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

const getExpensesQueryValidationSchema = {
  limit: {
    notEmpty: {
      errorMessage: 'Limit is required'
    },
    isInt: {
      options: {
        min: 5,
        max: 30,
      },
      errorMessage: 'Limit must be integer from 5 - 30',

    },
    toInt: true,
  },
  offset: {
    optional: true,
    isInt: {
      options: {
        min: 5,
      },
      errorMessage: 'Offset must be integer greater than 5',

    },
    toInt: true,
  },
  category: {
    errorMessage: 'Invalid Category',
    isString: {options: true},
    trim: true,
    optional: true,
    escape: true,
    isIn: {
      options: [expenseConstants.CATEGORIES]
    }
  },
  sort: {
    errorMessage: `Sort can only be ${expenseConstants.SORT_OPTIONS.join(' or ')}`,
    isString: {options: true},
    trim: true,
    optional: true,
    escape: true,
    isIn: {
      options: [expenseConstants.SORT_OPTIONS]
    }
  },
  order: {
    errorMessage: `Order can only be ${expenseConstants.SORT_ORDER.join(' or ')}`,
    isString: {options: true},
    trim: true,
    optional: true,
    escape: true,
    isIn: {
      options: [expenseConstants.SORT_ORDER]
    }
  }
}

module.exports = {createExpenseValidationSchema, updateExpenseValidationSchema, getExpensesQueryValidationSchema};
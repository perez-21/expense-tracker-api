const updateBudgetValidationSchema = {
  yearly: {
    optional: true,
    isFloat: {
      options: {min: 0},
      errorMessage: 'Budget must be a positive number',
    },
    toFloat: true,
    
  },
  monthly: {
    optional: true,
    isFloat: {
      options: {min: 0},
      errorMessage: 'Budget must be a positive number',
    },
    toFloat: true,
  }
}

module.exports = { updateBudgetValidationSchema }
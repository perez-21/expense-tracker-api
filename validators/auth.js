const loginValidationSchema = {
  username: {
    errorMessage: 'Invalid username',
    isString: {options: true},
    trim: true,
    notEmpty: {
      errorMessage: 'Username is required'
    },
    isAlphanumeric: {
      errorMessage: 'Username must only contain numbers and letters'
    },
    toLowerCase: true,
    isLength: {
      options: {
        min: 3,
        max: 30
      },
      errorMessage: 'Username must be at least 3 charaters and 30 characters at most'
    },
    escape: true,
  },
  password: {
    errorMessage: 'Invalid password',
    notEmpty: {
      errorMessage: 'Password is required',
    },
    isLength: 
    {
      options: {
        min: 8, 
        max: 32
      },
      errorMessage: 'Password should be at least 8 charactars'
    }
  }
}

const registerValidationSchema = {
  username: {
    errorMessage: 'Invalid username',
    isString: {options: true},
    trim: true,
    notEmpty: {
      errorMessage: 'Username is required'
    },
    isAlphanumeric: {
      errorMessage: 'Username must only contain numbers and letters'
    },
    toLowerCase: true,
    isLength: {
      options: {
        min: 3,
        max: 30
      },
      errorMessage: 'Username must be at least 3 charaters and 30 characters at most'
    },
    escape: true,
  },
  password: {
    errorMessage: 'Invalid password',
    notEmpty: {
      errorMessage: 'Password is required',
    },
    isLength: 
    {
      options: {
        min: 8, 
        max: 32
      },
      errorMessage: 'Password should be at least 8 charactars'
    }
  }
}

module.exports = {loginValidationSchema, registerValidationSchema}
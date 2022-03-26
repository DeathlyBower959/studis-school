export default {
  StatusCodes: Object.freeze({
    // Requests
    REQERR: {
      name: 'REQERR',
      http: 403
    },
    MISVAL: {
      name: 'MISVAL',
      http: 400
    },

    // JWT Token
    INVTOK: {
      name: 'INVTOK',
      http: 403,
      msg:
        'Invalid Token! Remember to pass your token as an Authorization header with Bearer <token>'
    },
    MALTOK: {
      name: 'MALTOK',
      http: 400,
      msg: 'Malformed token!'
    },

    // Community
    COMSUC: {
      name: 'COMSUC',
      http: 200
    },
    LEDSUC: {
      name: 'LEDSUC',
      http: 200
    },
    COMPSUC: {
      name: 'COMPSUC',
      http: 200
    },

    // User
    USERNO: {
      name: 'USERNO',
      http: 404,
      msg: 'User not found!'
    },
    USERVERIF: {
      name: 'USERVERIF',
      http: 200,
      msg: 'Account successfully verified!'
    },
    USERFOUND: {
      name: 'USERFOUND',
      http: 200
    },
    INCPAS: {
      name: 'INCPAS',
      http: 400,
      msg: 'Incorrect password!'
    },
    USERDEL: {
      name: 'USERDEL',
      http: 200,
      msg: 'User successfully deleted!'
    },
    USEREXIST: {
      name: 'USEREXIST',
      http: 409,
      msg: 'User with the provided email already exists!'
    },
    USERCREATE: {
      name: 'USERCREATE',
      http: 201
    }
  }),
  WordType: Object.freeze({
    ADJ: 'adjective',
    NOUN: 'noun',
    VERB: 'verb',
    ADVERB: 'adverb'
  })
}

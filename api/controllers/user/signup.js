module.exports = {

  friendlyName: 'Signup',

  description: 'Ghis function creates a new user and add same to the database',

  inputs: {
    emailAddress:{
      type: "string",
      required: true,
      minLength: 5,
    },
    userName:{
      type: "string",
      required: true,
    },
    fullName:{
      type: "string",
      required: true,
      minLength: 5
    },
    password:{
      type: "string",
      required: true,
      // minLength: 5,
      maxLength: 200
    }
  },

  exits: {
    success:{
      description: "Account successfully created"
    },
    emailAlreadyExists:{
      description: "The email address is already in use"
    },
    invalidPasswordLength:{
      description: "The password is not long enough"
    },
    badRequest:{
      description: "Something went wrong"
    },
    incompleteFileds:{
      description: "User did not completely fill out the registration form"
    }
  },

  fn: async function (inputs, exits) {
    try {
      //Convert inputed email to lowercase
      const newEmailAddress = inputs.emailAddress.toLowerCase();

      //Check if the password is valid
      if(inputs.password.length < 5){
        return exits.invalidPasswordLength({message: "The password provided is too short"})
      }

      //Now create this user from the User model
      const newUser = await User.create({
        id: sails.helpers.getUuid(),
        userName: inputs.userName,
        emailAddress: newEmailAddress,
        fullName: inputs.fullName,
        password: inputs.password
      }).fetch()

      //Now generate a token for this new user
      const token = await sails.helpers.generateNewJwtToken(newEmailAddress || user.userName);

      //If the code gets here, it means everything is fine
      this.req.me = newUser;

      //Now return success message
      return exits.success({
        message: `A new account for ${newUser.emailAddress} was successfully created`,
        data: newUser,
        token
      })
    } catch (error) {
      sails.log(error)
      //Check if if a user has already used this email address
      if(error.code == "E_UNIQUE"){
        return exits.emailAlreadyExists({
          message: "Oops! This email is already taken by a jobfair user"
        })
      }
    }
  }
};

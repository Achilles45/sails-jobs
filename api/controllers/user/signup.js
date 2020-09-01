module.exports = {

  friendlyName: 'Signup',

  description: 'Signup user.',

  inputs: {
    firstName:{
      type: "string",
      required: true,
      minLength:5,
      example: "Achilles"
    },
    lastName:{
      type: "string",
      required: true,
      minLength:5,
      example: "Usuoyibo"
    },
    emailAddress:{
      type: "string",
      required: true,
      minLength:5,
      isEmail: true,
      unique: true,
      example: "achillesusuoyibo7@gmail.com"
    },
    phoneNumber:{
      type: "number",
      required: true,
      example: 09048394833
    },
    accountType:{
      type: "string",
      required: true,
      example: "Talent || Employer"
    },
    password:{
      type: "string",
      required: true
    }
  },

  exits: {
    badRequest:{
      description: "A bad request was made"
    },
    emailAlreadyInUse:{
      description: "Email address is already in use"
    },
    invalid:{
      description: "Invalid request"
    }
  },


  fn: async function (inputs, exits) {
    try {
      //Convert email address to lower case just to be defensive
      const newEmailAddress = inputs.emailAddress.toLowerCase();

      //Now try to create a new user
      const newUser = await User.create({
        id: sails.helpers.getUuid(),
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        emailAddress: newEmailAddress,
        phoneNumber: inputs.phoneNumber,
        accountType: inputs.accountType,
        password: inputs.password
      }).fetch();

      //Generate a new jwt token
      const token = await sails.helpers.generateNewJwtToken(newEmailAddress);

      this.req.me = newUser;
      //Return your exits
      return exits.success({
        message: "You have successfully signed up to our application",
        data: newUser,
        token
      })
    } catch (error) {
      sails.log.error(error)
      if(error.code === "E_UNIQUE"){
        return exits.emailAlreadyInUse({
          message: "Oops! It seems like either this email or phone number is already associated with another account"
        })
      }
      return exits.invalid({
        message: `${error.message}, creating a new account`
      })
    }
  }


};

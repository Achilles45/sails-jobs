module.exports = {

  friendlyName: 'Signin',

  description: 'Signin user.',

  inputs: {
    emailAddress:{
      type: "string",
      required: true
    },
    password:{
      type: "string",
      required: true
    }
  },
  exits: {
    success:{
      description: "Successfully logged in"
    },
    badCombo:{
      description: "Credentails do not match"
    },
    notRegistered:{
      description: "Not registered on this platform"
    }
  },
  fn: async function (inputs, exits) {
    try {
      //Allow a user to login with username & passowrd or emailAddress & password
      //First check if a user with the email address provided exists
      const user = await User.findOne({emailAddress: inputs.emailAddress})

      //Check now if the user exists
      if(!user){
        return exits.notRegistered({
          error: "Oops! This is not a registered user",
        })
      }

      //Now check if the passwords match since the user was found in our database
      await sails.helpers.passwords.checkPassword(inputs.password, user.password)
      // eslint-disable-next-line no-unused-vars
      .intercept("incorrect", (_error)=>{
        return exits.badCombo({
          error: "Oops! Your credentials did not match"
        })
      })

      //Generate a new token
      const token = await sails.helpers.generateNewJwtToken(user.emailAddress);

      //Set the user
      this.req.me = user;

      //Return the signed in user
      return exits.success({
        message: "You have been successfully logged",
        data: user,
        token
      })

    } catch (error) {
      sails.log.error(error);
    }

  }
};

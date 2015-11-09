  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

//Add for dynamic wizard
  Meteor.startup(function () {
      // code to run on server at startup
      AutoForm.setDefaultTemplate("semanticUI");
  });
if (Meteor.isClient) {
	// This code only runs on the client

	Template.babyProfile.helpers({
	  userId: function() {
	    return Meteor.userId();
	  },
	  username: function() {
	    return Meteor.user().username;
	  },
	  firstName: function() {
	    return Meteor.user().profile.firstName;
	  },
	  lastName: function() {
	    return Meteor.user().profile.lastName;
	  },
    streetAddress: function() {
      return Meteor.user().profile.streetAddress;
    }
	});


	Template.babyProfile.events({

  });
}



/**********************************/


Schemas.contactInformation = new SimpleSchema({
  firstname:{
    type: String,
    label: 'First name'
  },
  lastname: {
    type: String,
    label: 'Last name'
  }
});

Schemas.addressInformation = new SimpleSchema({
  address:{
    type: String,
    label: 'Street Address'
  }
});

Babies.attachSchema([
  Schemas.contactInformation,
  Schemas.addressInformation
]);



Template.babyProfile.helpers({
  steps: function() {
    return [
    {
      id: 'contact-information',
      title: 'Contact information',
      schema: Schemas.contactInformation
    },
    {
      id: 'address-information',
      title: 'Address information',
      schema: Schemas.addressInformation
    }
    ];
  }
});






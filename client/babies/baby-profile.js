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

Schemas.babyInformation = new SimpleSchema({
  babyName:{
    type: String,
    label: 'First name'//,
  },
  dob: {
    type: Date,
    label: 'Date of birth'
  },
  gender: {
    type: String,
    label: 'Sex of baby'
  },
  allergies: {
    type: String,
    label: 'Baby allergies'
  },
  activeState: {
    type: Boolean,
    label: 'Active baby',
    optional:true,
    autoValue:function(){
        return true;
    }
  },
  createdAt: {
    type: Date,
    label: 'Created date',
    optional:true,
    autoValue:function(){
        return new Date();
    }
  },
  owner: {
    type: String,
    label: 'Baby creator',
    optional:true,
    autoValue:function(){
        return Meteor.userId();
    }
  },
  username: {
    type: String,
    label: 'Baby creator name',
    optional:true,
    autoValue:function(){
        return Meteor.userId().username;
    }
  }
});

Schemas.contactInformation = new SimpleSchema({
  firstname:{
    type: String,
    label: 'First name',
    optional: true
//    autoform: {
//      afFieldInput: {
//        type: "contenteditable"
//      }
//    }
  },
  lastname: {
    type: String,
    label: 'Last name',
    optional: true
  }
});

Schemas.addressInformation = new SimpleSchema({
  address:{
    type: String,
    label: 'Street Address',
    optional: true
  },
  city:{
    type: String,
    label: 'City',
    optional: true
  },
  state:{
    type: String,
    label: 'State',
    optional: true
  },
  zip:{
    type: String,
    label: 'Zip Code',
    optional: true
  }
});

Schemas.imageInformation = new SimpleSchema({
  image:{
    type: Object,
    label: 'Baby Image',
    blackbox: true,
    optional: true
  }
});

Babies.attachSchema([
  Schemas.babyInformation,
  Schemas.contactInformation,
  Schemas.addressInformation,
  Schemas.imageInformation,
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






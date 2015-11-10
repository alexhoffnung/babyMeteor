Orders = new Meteor.Collection('orders', {connection: null});

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
  },
  city: {
    type: String,
    label: 'City'
  },
  state: {
    type: String,
    label: 'State'
  }
});

Schemas.paymentInformation = new SimpleSchema({
  paymentMethod: {
    type: String,
    label: 'Payment method',
    allowedValues: ['credit-card', 'bank-transfer'],
    autoform: {
      options: [{
        label: 'Credit card',
        value: 'credit-card'
      }, {
        label: 'Bank transfer',
        value: 'bank-transfer'
      }]
    }
  },
  acceptTerms: {
    type: Boolean,
    label: 'I accept the terms and conditions.',
    autoform: {
      label: false
    },
    autoValue: function() {
      if (this.isSet && this.value !== true) {
        this.unset();
      }
    }
  }
});

Orders.attachSchema([
  Schemas.contactInformation,
  Schemas.addressInformation,
  Schemas.paymentInformation
]);
/*
Template.steps_semanticUI.events({
    "onSubmit .wizard-submit-button": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get values from form elements
      var firstNameText = event.target.firstNameText.value;
      var lastNameText = event.target.lastNameText.value;
      console.log(firstNameText);
      // Update current user firstname field
      Meteor.users.update(
        {_id:Meteor.userId()},
        { $set: {
          'profile.firstName':firstNameText
          } 
        }
      );
 
      // Clear form
      event.target.firstNameText.value = "";
      event.target.lastNameText.value = "";
    }
  });
*/
if(Meteor.isClient) {
Template.basic.helpers({
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
    }, 
    {
      id: 'payment-information',
      title: 'Payment & confirm',
      schema: Schemas.paymentInformation,
      onSubmit: function(data, wizard) {
        var self = this;
        Orders.insert(_.extend(wizard.mergedData(), data), function(err, id) {
          if (err) {
            self.done();
          } else {
            Router.go('viewOrder', {
              _id: id
            });
            sAlert.success('Your message', configOverwrite);
          }
        });
console.log(Orders.find());
        var userProfileObject = Orders.findOne();

        // Update current user firstname field
        Meteor.users.update(
          {_id:Meteor.userId()},
          { $set: {
            'profile.firstName':userProfileObject.firstname,
            'profile.lastName':userProfileObject.lastname,
            'profile.streetAddress':userProfileObject.address,
            'profile.city':userProfileObject.city,
            'profile.state':userProfileObject.state,
            'profile.paymentMethod':userProfileObject.paymentMethod,
            'profile.terms':userProfileObject.acceptTerms
            } 
          }
        );

        // Clear forms
 
        // Clear form collection
        Orders = new Meteor.Collection("orders");
      }
    }
    ];
  }
});
}

Wizard.useRouter('iron:router');

//This route is likely buggy...'next' button becomes disabled after 'back' click

Router.route('/basic/:step?', {
  name: 'basic',
  onBeforeAction: function() {
    console.log(this.params.step);
    if (!this.params.step) {
      this.redirect('basic', {
        step: 'contact-information'
      });
    } else if (!this.params.step) {
      this.redirect('basic', {
        step: 'address-information'
      });
    }
    else
    {
      this.next();
    }
  }
});

Router.route('/orders/:_id', {
  name: 'viewOrder',
  template: 'viewOrder',
  data: function() {
    return Orders.findOne(this.params._id);
  }
});

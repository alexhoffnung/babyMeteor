if(Meteor.isClient) {
  Schemas.dynamicProfileStep1 = new SimpleSchema({
    fields: {
      type: String,
      label: 'Number of dynamic fields?',
      allowedValues: ["1", "2", "3", "4", "5"]
    }
  });

  Schemas.dynamicProfileField = new SimpleSchema({
    name: {
      type: String,
      label: 'Name'
    }
  });

  Schemas.dynamicProfileStep2 = new SimpleSchema({
    fields: {
      type: [Schemas.dynamicProfileField]
    }
  });

  Template.dynamicProfileFields.helpers({
    steps: function() {
      return [{
        id: 'dynamic-profile-step1',
        title: 'Step 1',
        schema: Schemas.dynamicProfileStep1
      }, {
        id: 'dynamic-profile-step2',
        title: 'Step 2',
        schema: Schemas.dynamicProfileStep2,
        template: 'dynamicProfileStep2',
        onSubmit: function(data, wizard) {
          var self = this;
        }
      }];
    }
  });

  Template.dynamicProfileStep2.events({
    'click .wizard-back-button': function(e, template) {
      e.preventDefault();
      this.wizard.previous();
    }
  });

  Template.dynamicProfileStep2.helpers({
    dynamicProfileFields: function() {
      var data = this.wizard.mergedData();
      var amount = data && data.fields;
      var fields = [];
      for (var i = 0; i < amount; i++ ) {
        fields.push({
          index: i,
          name: 'fields.' + i + '.name'
        });
      }
      return fields;
    }
  });

  Router.route('/dynamicProfile', {
  name: 'dynamicProfile',
  template: 'dynamicProfileFields'
  });

  //Moved .useRouter and .startup from top of 
  // file to here to get dynamic fields working

}
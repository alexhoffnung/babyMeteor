if (Meteor.isClient) {

  Template.basicWizard.helpers({
    steps: function() {
      return [{
        id: 'information',
        title: 'Information',
        template: 'information',
        formId: 'information-form',
      },{
        id: 'confirm',
        title: 'Confirm',
        template: 'confirm',
        formId: 'confirm-form',
        onSubmit: function(data, wizard) {
          // submit logic
        }
      }]
    }
  });
}
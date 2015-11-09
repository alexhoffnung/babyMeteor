if(Meteor.isClient){
	Schemas = {};

	Template.registerHelper('Schemas', function() {
  		return Schemas;
	});
}
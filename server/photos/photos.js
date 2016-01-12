Meteor.publish("images", function () {
  return Images.find({ owner: this.userId });
}); 

Images.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; },
  download:function(){ return true; }
});
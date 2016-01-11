Meteor.subscribe("images");

Template.photos.events({
   'change #myFileInput': function(event, template) {
      FS.Utility.eachFile(event, function(file) {
        var activeBaby = Babies.findOne({
          $and: [
            {owner:Meteor.userId()},
            {activeState:true}
          ]
        });
        newFile = new FS.File(file);
        newFile.metadata = {
          babyId:activeBaby._id
        }
        console.log("start")
        Meteor.call("addPhoto", newFile);
     });
   }});

Template.photos.helpers({
  images: function () {
    var activeBaby = Babies.findOne({
          $and: [
            {owner:Meteor.userId()},
            {activeState:true}
          ]
        });
    return Images.findOne({ "metadata.babyId":activeBaby._id });
  }
});
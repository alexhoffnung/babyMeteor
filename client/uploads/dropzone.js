Template.dropzone.events({
  'dropped #dropzone': function(e) {
    var user = Meteor.user();

    FS.Utility.eachFile(e, function(file) {
      var newFile = new FS.File(file);
      newFile.username = user.emails[0].address;
      newFile.userId = user._id;
      console.log(user._id)
      newFile.userSlug = Slug.slugify(user.emails[0].address); //changed from username to email address
      console.log(user.emails[0].address)
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
      Meteor.call("addImage", newFile);
    });
  }
});
  Meteor.methods({
    addImage: function (newFile) {
      // Make sure the user is logged in before inserting a task
console.log("inside")
      Images.insert(newFile, function (error, fileObj) {
        if (error) {
          toastr.error("Upload failed... please try again.");
        } else {
          toastr.success('Upload succeeded!');
        }
      });
    }
  });



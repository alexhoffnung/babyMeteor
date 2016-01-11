 Meteor.methods({
  addPhoto: function (newFile) {
    console.log("here")
    Images.insert(newFile, function (err, fileObj) {
      if (err){
        alert("Error Ocurred");
         // handle error
      } else {
         // handle success depending what you need to do
        var imagesURL = {
          "photo.image": "/cfs/files/images/" + fileObj._id
        };
      }
    });
  }
});
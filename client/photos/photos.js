Template.photos.events({
   'change #myFileInput': function(event, template) {
      FS.Utility.eachFile(event, function(file) {
        let activeBaby = Session.get("activeBaby");
        newFile = new FS.File(file);
        newFile.metadata = {
          baby:activeBaby
        }
        Images.insert(newFile, function (err, fileObj) {
          if (err){
            alert("Error Ocurred");
             // handle error
          } else {
             // handle success depending what you need to do
            var imagesURL = {
              "photo.image": "/cfs/files/babyimages/" + fileObj._id
            };
          }
        });
     });
   }});

Template.photos.helpers({
  babyImages: function () {
    let activeHome = Session.get("activeBaby");
    console.log(babyImages.find({ "metadata.baby":activeBaby }));
    return babyImages.find({ "metadata.baby":activeBaby }); // Where Images is an FS.Collection instance
  }
});
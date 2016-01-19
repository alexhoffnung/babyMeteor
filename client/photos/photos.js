Meteor.subscribe("images");

Template.photos.events({
   'change #myFileInput': function(event, template) {
  	  var activeBaby = Babies.findOne({ $and:[{owner:Meteor.userId()},{activeState:true}]});
      FS.Utility.eachFile(event, function(file) {
      	var fileObj = new FS.File(file);
        fileObj.metadata = { babyId: activeBaby._id };
        Images.insert(fileObj, function (err, fileObj) {
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
     });
   }});

Template.photos.helpers({
  images: function () {
  	var activeBaby = Babies.findOne({ 
      $and:[
        {owner:Meteor.userId()},
        {activeState:true}
      ]
    });
    return Images.find({'metadata.babyId':activeBaby._id}); // Where Images is an FS.Collection instance
  }
});
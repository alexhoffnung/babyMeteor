if (Meteor.isServer) {
  var imageStore = new FS.Store.S3("images", {
    /* REQUIRED */
    accessKeyId: "AKIAJ3DEC3SX5A2A6QLQ",
    secretAccessKey: "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", 
    bucket: "babymeteor"
  });

  Images = new FS.Collection("Images", {
    stores: [imageStore],
    filter: {
      allow: {
        contentTypes: ['image/*']
      }
    }
  });
}

// On the client just create a generic FS Store as don't have
// access (or want access) to S3 settings on client
if (Meteor.isClient) {
  var imageStore = new FS.Store.S3("images");
  Images = new FS.Collection("Images", {
    stores: [imageStore],
    filter: {
      allow: {
        contentTypes: ['image/*']
      },
      onInvalid: function(message) {
        toastr.error(message);
      }
    }
  });
}

// Allow rules
Images.allow({
  insert: function(userId) { return userId != null; },
  update: function(userId, image) { return userId === image.userId; },
  remove: function(userId, image) { return userId === image.userId; },
  download: function() { return true; }
});
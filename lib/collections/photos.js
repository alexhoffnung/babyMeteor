var babyImageStore = new FS.Store.GridFS("babyimages");
babyImages = new FS.Collection("babyimages", {
 stores: [babyImageStore]
});
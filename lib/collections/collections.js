Tasks = new Mongo.Collection("tasks");

Meals = new Mongo.Collection("meals");

Diapers = new Mongo.Collection("diapers");

Sleeps = new Mongo.Collection("sleeps");

Babies = new Mongo.Collection("babies");

Caretakers = new Mongo.Collection("caretakers");

CalendarEvent = new Mongo.Collection("calendarEvent");

Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});
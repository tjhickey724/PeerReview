Meteor.startup(function(){
  console.log("starting up the client!");

  Meteor.absoluteUrl.defaultOptions.rootUrl = 'http://localhost:3000/';
});

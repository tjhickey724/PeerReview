Meteor.startup(function(){
  console.log("starting up the client!");

  Meteor.absoluteUrl.defaultOptions.rootUrl = 'http://leiner.cs-i.brandeis.edu:3000/';
});

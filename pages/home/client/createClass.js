Template.createClass.events({
  "click #createClass"(event,instance){

    var studentPin = ""+Math.round(1000000*(1+9*Math.random()));
    var teacherPin = ""+Math.round(1000000*(1+9*Math.random()));
    var newclass =
      {name:instance.$("#classname").val(),
       createdAt:new Date(),
       createdBy:Meteor.userId(),
       studentPin:studentPin,
       teacherPin:teacherPin
      };
    console.dir(newclass);

    ClassInfo.insert(newclass);
    Router.go('home');

  }
})

Template.createQuestion.events({
  "click .js-submit-question": function(event){
    event.preventDefault();
    console.log("clicked on button!");
    console.dir($(".js-question-description").val());
    var title = $(".js-title").val();
    var question = $(".js-question-description").val();
    var class_id = Session.get('class_id');

    var dbentry =
      {title:title,
       question:question,
       class_id:class_id,
       createdAt:(new Date()),
       createdBy:Meteor.userId()}
    console.dir(dbentry);
    Questions.insert(dbentry);
    Router.go('/viewClass/'+class_id);
  }
})

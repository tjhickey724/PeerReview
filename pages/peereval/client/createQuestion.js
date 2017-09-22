Template.createQuestion.events({
  "click .js-submit-question": function(event,instance){
    event.preventDefault();
    console.log("clicked on button!");
    console.dir(instance.$(".js-question-description").val());
    var title = instance.$(".js-title").val();
    var question = instance.$(".js-question-description").val();
    var points = instance.$(".js-points").val();
    var rubric = instance.$(".js-rubric").val();


    var dbentry =
      {title:title,
       question:question,
       points:points,
       rubric:rubric,
       class_id:this.class._id,
       createdAt:(new Date()),
       createdBy:Meteor.userId()}
    console.dir(dbentry);
    Questions.insert(dbentry);
    Router.go('/viewClass/'+this.class._id);
  }
})

Template.createQuestion.events({
  "click .js-submit-question": function(event){
    event.preventDefault();
    console.log("clicked on button!");
    console.dir($(".js-question-description").val());
    const title = $(".js-title").val();
    const question = $(".js-question-description").val();
    const dbentry = {title:title, question:question, createdAt:(new Date()), createdBy:Meteor.userId()}
    console.dir(dbentry);
    Questions.insert(dbentry);
    Router.go('/showQuestions');
  }
})

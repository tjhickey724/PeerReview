Template.showQuestions.helpers({
  questions: function(){return Questions.find();}
})

Template.question_item.helpers({
  answer: function(){
    return Answers.findOne(
      {question:this.q._id,
       createdBy:Meteor.userId()})}
})

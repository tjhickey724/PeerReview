Template.showQuestions.helpers({
  questions: function(id){
    return Questions.find({class_id:id});}
})

Template.question_item.helpers({
  answer: function(){
    return Answers.findOne(
      {question:this.q._id,
       createdBy:Meteor.userId()})}
})

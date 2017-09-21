Template.showQuestions.helpers({
  questions: function(){
    var class_id = Session.get('class_id');
    return Questions.find({class_id:class_id});}
})

Template.question_item.helpers({
  answer: function(){
    return Answers.findOne(
      {question:this.q._id,
       createdBy:Meteor.userId()})}
})

Template.showQuestions.helpers({
  questions: function(class_id){
      return Questions.find({class_id:class_id},{sort:{createdAt:-1}})
  }
})

Template.question_item.helpers({
  owns_question: function(q) {
    return q.createdBy==Meteor.userId()
  },
  answer: function(){
    return Answers.findOne(
      {question:this.q._id,
       createdBy:Meteor.userId()})},

  reviews: function(){
    var ans =
    Answers.findOne(
      {question:this.q._id,
       createdBy:Meteor.userId()}) ;
    if (ans) {
      points = Reviews.find({answer_id:ans._id},{fields:{rating:1}}).fetch();
      points=_.sortBy(_.pluck(points,'rating'),function(x){return - parseInt(x)});

      revs={answer:ans,num:ans.myReviews.length,ratings:points}
      return revs;
    } else {
      return {answer:false,num:0,ratings:[]};
    }
  },

  scores: function(){

  }

})

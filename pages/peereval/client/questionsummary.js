Template.questionsummary.helpers({
  answers:function(qid){
    var as = Answers.find({question:qid},{sort:{answer:1}});
    return as;
  },

  reviews:function(aid){
    var rs = Reviews.find({answer_id:aid},{sort:{rating:1}});
    return rs;
  },

  hasAnswered:function(qid){
    // return true when the user has answered this question.
    var answer = Answers.find({question:qid,createdBy:Meteor.userId()});
    return answer;
  }

})

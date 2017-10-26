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
    var answer = Answers.findOne({question:qid,createdBy:Meteor.userId()});
    console.dir(['hasAnswered',answer])
    return answer;
  }

})

Template.questionsummary_review.helpers({
  isTA(reviewer){
    var s = StudentInfo.findOne({student_id:reviewer});
    var t = StudentInfo.findOne({student_id:Meteor.userId()})

    return (s && t && (s.role=="teacher") && (t.role=="teacher"))

  }
})

Template.questionsummary.helpers({
  answers:function(qid){
    var as = Answers.find({question:qid},{sort:{answer:1}, reactive:false});
    return as;
  },

  reviews:function(aid){
    var rs = Reviews.find({answer_id:aid},{sort:{rating:1}, reactive:false});
    return rs;
  }

})

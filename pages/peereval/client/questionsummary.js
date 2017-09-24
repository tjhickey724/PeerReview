Template.questionsummary.helpers({
  answers:function(qid){
    var as = Answers.find({question:qid});
    console.dir(as.fetch())
    return as;
  },

  reviews:function(aid){
    var rs = Reviews.find({answer_id:aid});
    console.dir(rs.fetch())
    return rs;
  }

})

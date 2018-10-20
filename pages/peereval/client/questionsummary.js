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
    var s = StudentInfo.findOne({student_id:Meteor.userId()});

    return answer || s.role=="teacher";
  },

  copiers:function(aid){
    var answer = Answers.findOne(aid);
    var answers = Answers.find({answer:answer.answer,createdBy:{$ne:answer.createdBy}}).fetch();
    /*if (answers.length>0) {
      console.log("Possible cheating:");
      console.dir(Profiles.findOne({id:answer.createdBy}).email)
      console.dir(answers)
    }
    */
    return answers
  },

  authorName: function(aid){
    var answer = Answers.findOne(aid);
    var profile = Profiles.findOne({id:answer.createdBy})
    return profile.email+" -- "+profile.name
  },

  author:function(uid){
    //console.log("uid="+uid);
    var author = Profiles.findOne({id:uid})
    return author.email + " -- "+author.name
  },


})

Template.questionsummary_review.helpers({
  isTA(reviewer){
    var s = StudentInfo.findOne({student_id:reviewer});
    var t = StudentInfo.findOne({student_id:Meteor.userId()})

    return (s && t && (s.role=="teacher") && (t.role=="teacher"))

  },




})

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

  isTA(){
    var t = StudentInfo.findOne({student_id:Meteor.userId()})
    return (t && t.role=="teacher")
  },


})

Template.onequestionsummary.helpers({
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
    var author = Profiles.findOne({id:uid})
    return author.email + " -- "+author.name
  },

  amTA(){
    reviewer = Meteor.userId()
    var p = Profiles.findOne({id:reviewer})

    if (reviewerEmails.includes(p.email)) return true
    return false
  },


})



var reviewerEmails = [
  "katherinezyb@brandeis.edu",
  "yaeleiger@brandeis.edu",
  "jerrypeng666@brandeis.edu",
  "wburstein@brandeis.edu",
  "luisandinojr1@brandeis.edu",
  "rlederer@brandeis.edu",
  "venusyixinsun@brandeis.edu",
  "mdodell@brandeis.edu",
  "irvingperez@brandeis.edu",
  "aramk@brandeis.edu",
  "lxt@brandeis.edu",
  "zqhuang@brandeis.edu",
  "chungek@brandeis.edu",
  "zepenghu@brandeis.edu",
  "jialinzh@brandeis.edu",
  "xiqu@brandeis.edu",
  "csjbs2018@gmail.com",
  "tjhickey@brandeis.edu"
]

var teacherEmails = [
  "tjhickey@brandeis.edu",
  "wburstein@brandeis.edu",
  "xiqu@brandeis.edu"
]

Template.questionsummary_review.helpers({
  reviewerEmail(reviewer){
    var s = Profiles.findOne({id:reviewer})
    return s.email
  },

  isTA(reviewer){
    if (!reviewer){
      reviewer = Meteor.userId()
    }
    var s = StudentInfo.findOne({student_id:reviewer});
    //console.log("isTA "+reviewer+" ");console.dir(s)
    //var t = StudentInfo.findOne({student_id:Meteor.userId()})
    var p = Profiles.findOne({id:reviewer})
    if (reviewerEmails.includes(p.email)) return true


    //return (s && t && (s.role=="teacher") && (t.role=="teacher"))
    return (s && s.role=="teacher")
  },

  isTeacher(){
    //ar s = StudentInfo.findOne({student_id:reviewer});
    //var t = StudentInfo.findOne({student_id:Meteor.userId()})
    var p = Profiles.findOne({id:Meteor.userId()})

    return (teacherEmails.includes(p.email))
  },




})

Template.questionsummary_review.events({
  "click .js-update"(event,instance){
    //console.log("clicked on update!")
    var pts = instance.$(".js-pts").val()
    var comment = instance.$(".js-comment").val()
    //console.log(JSON.stringify([pts,comment,this.review._id]))
    var review = Reviews.findOne(this.review._id);
    review.rating = parseInt(pts)
    review.review = "INSTRUCTOR OVERRIDE: "+comment
    //console.dir(review)
    Reviews.update(review._id,review)
  },

  "click .js-newReview"(event,instance){
    //console.log("clicked on update!")
    var pts = instance.$(".js-pts").val()
    var comment = instance.$(".js-comment").val()
    //console.log(JSON.stringify([pts,comment,this.review._id]))
    var review = Reviews.findOne(this.review._id);
    var newrating = parseInt(pts)


    var newReview = Object.assign({},review)
    newReview.review =comment
    newReview.rating=newrating
    newReview.createdBy = Meteor.userId()
    newReview.createdAt = new Date()
    delete newReview._id

    //console.dir(review)
    Reviews.insert(newReview)
    //Reviews.update(review._id,review)
  },
})

Template.seeReviews.helpers({
  reviewlist:function(){
    return this.reviews},

  answer: function(){
    if (!this.reviews[0])
      return undefined;
    var a = Answers.findOne({question:this.reviews[0].question_id,createdBy:Meteor.userId()});
    var q = Questions.findOne({_id:a.question});
    var z = {a:a, q:q};
    return z;
  }
})

var reviewerEmails = [
  "csjbs2018@gmail.com",
  "tjhickey@brandeis.edu",
  "chickey@berklee.edu",
  "xiqu@brandeis.edu",
  "guirongliu@brandeis.edu",
  "irvingperez@brandeis.edu",
  "andrews9008@brandeis.edu",
  "jnovas@brandeis.edu",
  "floria0126@brandeis.edu",
  "eshacala@brandeis.edu"
]

var reviewerEmailsFall18 = [
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


Template.reviewsOfMyAnswer.helpers({
  isTA:function(r) {
    var sinfo = StudentInfo.findOne({student_id:r.createdBy})
    //console.dir(sinfo)
    //console.log(sinfo.role)
    return sinfo.role == "teacher"

  },

  TAclass: function(r){
    //console.log("in otherStudentReview")
    var sinfo = StudentInfo.findOne({student_id:r.createdBy})
    var theClass = ClassInfo.findOne(r.class_id);

    var p = Profiles.findOne({id:r.createdBy})
    //console.dir(r)
    if (reviewerEmails.includes(p.email)) return true

    if ((sinfo.role == "teacher")){ // && (theClass.createdBy==Meteor.userId())){
      return 'bg-primary'
    } else {
      return ""
    }
  },

})

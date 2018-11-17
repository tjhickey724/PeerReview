Template.showStudents.helpers({
  students:function(theClass){
    return StudentInfo.find({class_id:theClass._id});
  },
  questions:function(theClass){
    return Questions.find({class_id:theClass._id})
  },
})

Template.showStudent.helpers({
  profile:function(){
    //console.log("in showStudent.profile")
    var profile = Profiles.findOne({id:this.student.student_id});
    return profile},

  answers:function(){
    //console.log("in showStudent.answers")
    return Answers.find({createdBy:this.student.student_id})
  },

  answerTime:function(question){
    //console.log("in showStudent.answerTime")
    var a= Answers.findOne({question:question._id,createdBy:this.student.student_id})
    if (a)
      return "submitted at " + a.createdAt;
    else {
      return "not submitted"
    }
  },

  questions:function(class_id){
    //console.log("in showStudent.questions")
    return Questions.find({class_id:class_id},{sort:{createdAt:-1}})
  },

  numReviews:function(question){
    //console.log("in showStudent.numReviews")

    var z = {createdBy:this.student.student_id,question:question._id}
    var a = Answers.findOne(z)
    if (a && a.myReviews) {
      var rs = Reviews.find({question_id:question._id,createdBy:this.student.student_id});
      if (true || rs.count() != a.myReviews.length){
        //console.log('bug in numReviews');
        //console.dir(a);
        var myReviews =
          _.pluck(
             _.map(rs.fetch(),
                  function(r){

                    var ans1= Answers.findOne(r.answer_id)
                    if (!ans1) {
                      //console.dir(['nrBug',ans1, r.answer_id,r,question])
                      return {}
                    } else {
                      return ans1
                    }

                  }),
             'createdBy');
        //console.dir(myReviews);
        if (JSON.stringify(myReviews) != JSON.stringify(a.myReviews)) {
          //console.log("************")
          //console.dir([myReviews,a.myReviews])
        }
          return rs.count()
      } else {
          return a.myReviews.length;
        }
    } else {
      return 0;
    }
  },

  reviews:function(question_id){
    //console.log("in showStudent.reviews")
    var a = Answers.findOne({createdBy:this.student.student_id,question:question_id})
    if (a) {
      var r = Reviews.find({answer_id:a._id})
      return r
    } else {
      return []
    }
  },

  avgReview:function(question_id, question_pts){

    var a = Answers.findOne({createdBy:this.student.student_id,question:question_id})
    if (!a) return  0.0;
    var rs;

    rs = Reviews.find({answer_id:a._id}).fetch()
    if (rs.length==0){
      return 0.0;
    }

    var sum=0.0;
    rs.forEach(function(r){sum = sum + r.rating})
    var avg = (sum/rs.length*100.0/question_pts).toFixed(1);

    return avg;
  },



})


Template.studentWork.helpers({
  profile:function(){
    //console.log("In studentWork.profile this.student=");
    //console.dir(this.student);
    var profile = Profiles.findOne({id:this.student.student_id});
    return profile},

  answers:function(){
    //console.log("In studentWork.answers this.student=");
    //console.dir(this.student);
    return Answers.find({createdBy:this.student.student_id})
  },



  answer:function(question_id){
    //console.log("In studentWork.answer this.student=");
    //console.dir(this.student);
    //console.log("this = ")
    //console.dir(this)
    var a = Answers.findOne({createdBy:this.student.student_id,question:question_id})

    if (a)
      return a.answer
    else {
      return "not submitted"
      }
  },

  reviews:function(question_id){
    //console.log("In studentWork.reviews this.student=");
    //console.dir(this.student);
    //console.dir(this)

    var a = Answers.findOne({createdBy:this.student.student_id,question:question_id})
    if (a) {
      var r = Reviews.find({answer_id:a._id})
      return r
    } else {
      return []
    }
  },

  questions:function(class_id){
    //console.log("In studentWork.questions class_id=");
    //console.dir(class_id);
    var qs = Questions.find({class_id:class_id},{sort:{createdAt:-1}})
    return qs
  },


  reviewsByStudent:function(student){
    //console.log("In studentWork.reviewsByStudent student=");
    //console.dir(student);
    // I need to add the class_id to each review!!
    var rs = Reviews.find({createdBy:student.student_id});
    return rs;
  },

  numReviews:function(question){
    //console.log("In studentWork.numReviews question=");
    //console.dir(question);
    var z = {createdBy:this.student.student_id,question:question._id}
    var a = Answers.findOne(z)
    if (a && a.myReviews) {
      return a.myReviews.length;
    } else {
      return 0;
    }
  }

})

Template.studentReview.helpers({
  isInClass:function(){
    //console.log("in studentReview")

    var z =  this.class._id==this.review.class_id;
    return z;
  },
  testing:function(review){
    //console.log("in studentReview")
    return "this is a test"
  },
  reviewInfo:function(){
    //console.log("in studentReview")
    var q = Questions.findOne({_id:this.review.question_id})
    var a = Answers.findOne({_id:this.review.answer_id})
    return {question:q,answer:a}
  },



  TAclass: function(r){
    //console.log("in studentReview")
    var sinfo = StudentInfo.findOne({student_id:r.createdBy})
    if (sinfo.role == "teacher"){
      return 'bg-danger'
    } else {
      return ""
    }
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


Template.otherStudentReview.helpers({
  TAclass: function(r){
    //console.log("in otherStudentReview")
    var sinfo = StudentInfo.findOne({student_id:r.createdBy})
    var theClass = ClassInfo.findOne(r.class_id);

    var p = Profiles.findOne({id:r.createdBy})
    console.dir(r)
    //if (reviewerEmails.includes(p.email)) return true

    if ((sinfo.role == "teacher")){ // && (theClass.createdBy==Meteor.userId())){
      return 'bg-primary'
    } else {
      return ""
    }
  },
  reviewer: function(r){
    //console.log("in otherStudentReview")
    var sinfo = StudentInfo.findOne({student_id:r.createdBy})
    return sinfo.role
  },

})

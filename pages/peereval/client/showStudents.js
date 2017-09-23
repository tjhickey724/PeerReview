Template.showStudents.helpers({
  students:function(theClass){
    return StudentInfo.find({class_id:theClass._id});
  },
  questions:function(theClass){
    return Questions.find({class_id:theClass._id})
  }
})

Template.showStudent.helpers({
  profile:function(){
    var profile = Profiles.findOne({id:this.student.student_id});
    return profile},

  answers:function(){
    return Answers.find({createdBy:this.student.student_id})
  },

  answerTime:function(question){
    console.log("in answerTime");
    console.dir(['at',question])
    var a= Answers.findOne({question:question._id,createdBy:this.student.student_id})
    console.dir(a);
    if (a)
      return a.createdAt;
    else {
      return "not submitted"
    }
  },

  questions:function(class_id){
    return Questions.find({class_id:class_id})
  },

  numReviews:function(question){
    var z = {createdBy:this.student.student_id,question:question._id}
    var a = Answers.findOne(z)
    if (a && a.myReviews) {
      return a.myReviews.length;
    } else {
      return 0;
    }
  }

})


Template.studentWork.helpers({
  profile:function(){
    var profile = Profiles.findOne({id:this.student.student_id});
    return profile},

  answers:function(){
    return Answers.find({createdBy:this.student.student_id})
  },

  answer:function(question_id){
    var a = Answers.findOne({createdBy:this.student.student_id,question:question_id})
    return a.answer
  },

  reviews:function(question_id){
    var a = Answers.findOne({createdBy:this.student.student_id,question:question_id})
    var r = Reviews.find({answer_id:a._id})
    return r
  },

  questions:function(class_id){
    var qs = Questions.find({class_id:class_id})
    console.log(class_id)
    console.dir(qs.fetch())
    return qs
  },

  reviewsByStudent:function(student){
    var rs = Reviews.find({createdBy:student.student_id});
    return rs;
  },

  numReviews:function(question){
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
  testing:function(review){
    console.dir(review);
    return "this is a test"
  },
  reviewInfo:function(){
    console.log("in reviewInfo");
    var q = Questions.findOne({_id:this.review.question_id})
    var a = Answers.findOne({_id:this.review.answer_id})
    console.dir(['ri',q,a]);
    return {question:q,answer:a}
  },
})

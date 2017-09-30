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
    var profile = Profiles.findOne({id:this.student.student_id});
    return profile},

  answers:function(){
    return Answers.find({createdBy:this.student.student_id})
  },

  answerTime:function(question){

    var a= Answers.findOne({question:question._id,createdBy:this.student.student_id})
    if (a)
      return "submitted at " + a.createdAt;
    else {
      return "not submitted"
    }
  },

  questions:function(class_id){
    return Questions.find({class_id:class_id},{sort:{createdAt:-1}})
  },

  numReviews:function(question){

    var z = {createdBy:this.student.student_id,question:question._id}
    var a = Answers.findOne(z)
    if (a && a.myReviews) {
      return a.myReviews.length;
    } else {
      return 0;
    }
  },

  reviews:function(question_id){
    var a = Answers.findOne({createdBy:this.student.student_id,question:question_id})
    if (a) {
      var r = Reviews.find({answer_id:a._id})
      return r
    } else {
      return []
    }
  },

  avgReview:function(question_id){
    var a = Answers.findOne({createdBy:this.student.student_id,question:question_id})
    if (!a) return  0.0;
    var rs;

    rs = Reviews.find({answer_id:a._id}).fetch()
    if (rs.length==0){
      return 0.0;
    }
    var sum=0.0;
    rs.forEach(function(r){sum = sum + r.rating})
    var avg = (sum/rs.length*100).toFixed(2);
    return avg;
  },



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

    if (a)
      return a.answer
    else {
      return "not submitted"
      }
  },

  reviews:function(question_id){
    var a = Answers.findOne({createdBy:this.student.student_id,question:question_id})
    if (a) {
      var r = Reviews.find({answer_id:a._id})
      return r
    } else {
      return []
    }
  },

  questions:function(class_id){
    var qs = Questions.find({class_id:class_id},{sort:{createdAt:-1}})
    return qs
  },


  reviewsByStudent:function(student){
    // I need to add the class_id to each review!!
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
  isInClass:function(){

    var z =  this.class._id==this.review.class_id;
    return z;
  },
  testing:function(review){
    return "this is a test"
  },
  reviewInfo:function(){

    var q = Questions.findOne({_id:this.review.question_id})
    var a = Answers.findOne({_id:this.review.answer_id})
    return {question:q,answer:a}
  },
})

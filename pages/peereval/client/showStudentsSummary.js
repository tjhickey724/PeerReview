Template.showStudentsSummary.helpers({
  students:function(theClass){
    return StudentInfo.find({class_id:theClass._id});
  },
  questions:function(theClass){
    return Questions.find({class_id:theClass._id})
  },
  numQuestions:function(theClass){
    return Questions.find({class_id:theClass._id}).count()
  }
})

Template.showStudentSummary.helpers({
  profile:function(){
    var profile = Profiles.findOne({id:this.student.student_id});
    return profile},

  numAnswers:function(){
    return Answers.find({createdBy:this.student.student_id}).count()
  },



  answerTime:function(question){

    var a= Answers.findOne({question:question._id,createdBy:this.student.student_id})
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
  },

  numReviewsTotal:function(question){
    var numRs = Reviews.find({createdBy:this.student.student_id}).count()
    var numAs = Answers.find({createdBy:this.student.student_id}).count()
    return (numRs/numAs).toFixed(2)
  },


  allReviews:function(question){

    var z = {createdBy:this.student.student_id,question:question._id}
    var a = Answers.findOne(z)


    if (a) {
      var rs = Reviews.find({answer_id:a._id}).fetch();
      console.dir(rs);
      if (rs.length==0) return 0.0;
      var sum=0.0;
      rs.forEach(function(r){sum = sum+r.rating})
      return sum/question.points/rs.length;
    } else {
      return 0;
    }
  },


  avgReviews:function(){

    var z = {createdBy:this.student.student_id}
    var as = Answers.find(z).fetch()
    var numQs = Questions.find({class_id:this.student.class_id}).count()
    var total=0.0
    var numReviewed=0
    console.log('avgReviews');
    console.log('qs len = '+numQs)
    as.forEach(function(a){
        var rs = Reviews.find({answer_id:a._id}).fetch();
        if (rs.length>0){
          numReviewed = numReviewed+1
          var question = Questions.findOne(a.question)
          var sum=0.0;
          console.dir(a);
          rs.forEach(function(r){sum = sum+r.rating})
          console.log(JSON.stringify(_.pluck(rs,'rating')))
          console.log("sum="+sum);
          var z =  sum/question.points/rs.length;
          total = total + z
          console.log('total='+total);
        }
    })
    var avgR = -1
    if (numReviewed>0)
      avgR =  Math.round(total/numReviewed*100)
    else {
      avgR = "no reviews yet"
    }
    console.log('average Review = '+avgR)
    return avgR



  },



})

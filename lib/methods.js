Meteor.methods({
  add_classids(){
    qs = Questions.find().fetch();
    qs.forEach(function(q){
      as = Answers.find({question:q._id}).fetch();
      rs = Reviews.find({question_id:q._id}).fetch();
      as.forEach(function(a){
        Answers.update(a._id,{$set:{class_id:q.class_id}})
      })
      rs.forEach(function(r){
        Reviews.update(r._id,{$set:{class_id:q.class_id}})
      })
    })
  },


  update_summary(class_id){

    // this updates the summary info for each student in a class
    // get all students in the class
    var z = {class_id:class_id}
    var students = StudentInfo.find(z).fetch();
    // get all questions from the class
    var qs = Questions.find({class_id:class_id}).fetch()
    students.forEach(function(s){

      // all answers by student s in this class
      var as = Answers.find({createdBy:s.student_id,class_id:class_id}).fetch()
      // all reviews by student s in this class
      var rs = Reviews.find({createdBy:s.student_id,class_id:class_id}).fetch()
      // for each answer, find the average review value

      var numReviewed=0;
      var total=0.0
      var reviews=[];
      as.forEach(function(a){
          var rs = Reviews.find({answer_id:a._id}).fetch();
          if (rs.length>0){
            numReviewed = numReviewed+1
            var question = Questions.findOne(a.question)
            var sum=0.0;
            rs.forEach(function(r){sum = sum+r.rating})
            var z =  sum/question.points/rs.length;
            reviews.push(z);
            total = total + z
          }
      })
      var avgR = -1
      if (numReviewed>0)
        avgR =  Math.round(total/numReviewed*100)
      else {
        avgR = "no reviews yet"
      }
      console.dir(['updating summary',s,as,rs,reviews])
      s.numAnswers = as.length;
      s.numReviewedAnswers = numReviewed;
      s.avgReview = avgR;
      s.numReviews = rs.length;
      StudentInfo.update(s._id,s);

    })
  },


})
